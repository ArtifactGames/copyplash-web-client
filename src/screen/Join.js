import React from 'react';
import ActionCodes from '../config/ActionCodes'
import { Loading }from '../component'
import doLogin from '../datasource/doLogin'


const LoginForm = ({ nick, password, handleSubmit, handleChangeNick, handleChangePassword}) => (
  <form onSubmit={handleSubmit}>
    <label>
      Nick:
      <input type="text" value={nick} onChange={handleChangeNick} />
    </label>
    <br />
    <label>
      Password:
      <input type="text" value={password} onChange={handleChangePassword} />
    </label>
    <br />
    <input type="submit" value="Join Game" />
  </form>
)

export class Index extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { nick: '', password: '', nickSet: 0};

        this.handleChangeNick = this.handleChangeNick.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeNick(event) {
        this.setState({ nick: event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            const lobby = await doLogin(this.state.password);
            if (lobby) {
                this.props.connect(lobby);
            }
        } catch (e) {
            console.log(e);
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.isConnected && this.state.nickSet === 0) {
            this.props.send({
                action: ActionCodes.SET_NICK,
                payload: this.state.nick
            })
            this.setState({ nickSet: 1 })
        } else if(this.state.nickSet === 1 &&
                    parseInt(nextProps.message.action, 10) === ActionCodes.SET_NICK_SUCCESS ) {
            this.setState({ nickSet: 2 })
        }
    }
    
    render() {
        switch(this.state.nickSet) {
            case 1:
                return <Loading/>
            default:
                return <LoginForm
                    nick={this.state.nick}
                    passsword={this.state.password}
                    handleChangeNick={this.handleChangeNick}
                    handleChangePassword={this.handleChangePassword}
                    handleSubmit={this.handleSubmit}
                />
        }
    }
}

function Greeting() {
    return <p>
        Welcome to Copyplash! Fill your nick and the lobby password
        to join a game.
    </p>
}

function Join(props) {
    return <div>
        <Greeting />
        <Index {...props} />
    </div>
}

export { Join };