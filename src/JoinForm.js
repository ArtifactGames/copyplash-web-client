import React from 'react';
import Env from './Env';

export class JoinForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { nick: '', password: '' };

        this.handleChangeNick = this.handleChangeNick.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.doLogin = this.doLogin.bind(this);
    }

    handleChangeNick(event) {
        this.setState({ nick: event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    async doLogin() {
        try {
            const options = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ password: this.state.password })
            }

            const response = await fetch(`http://${Env.serverAddress}:${Env.serverPort}/lobby-enter`, options)
            const body = await response.json();
            return body.id
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            const lobby = await this.doLogin();
            if (lobby) {
                this.props.connect(lobby);
                // TODO if connection succeeded we need to send a SET NICK websocket event
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Nick:
          <input type="text" value={this.state.nick} onChange={this.handleChangeNick} />
                </label>
                <br />
                <label>
                    Password:
          <input type="text" value={this.state.password} onChange={this.handleChangePassword} />
                </label>
                <br />
                <input type="submit" value="Join Game" />
            </form>
        );
    }
}

function Header() {
    return <h1>Copyplash</h1>
}

function Greeting() {
    return <p>
        Welcome to Copyplash! Fill your nick and the lobby password
        to join a game.
    </p>
}

function JoinScreen(props) {
    return <div>
        <Header />
        <Greeting />
        <JoinForm {...props} />
    </div>
}

export default JoinScreen;