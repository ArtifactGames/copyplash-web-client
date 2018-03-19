const Env = {
    serverAddress: "8563c8fb.ngrok.io",
    serverPort: "80"
}

class Communication {
    constructor(){
        this.ws = WebSocket(`ws://${Env.serverAddress}:${Env.serverPort}`)
    }
}

class JoinForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { nick: '', password: '' };

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

    handleSubmit(event) {
        // TODO: Join a game.
        alert(`Information was submitted: ${this.state.nick} and ${this.state.password}`);
        event.preventDefault();
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

function JoinScreen() {
    return <div>
        <Header />
        <Greeting />
        <JoinForm />
    </div>
}

ReactDOM.render(
    <JoinScreen />,
    document.getElementById('root')
);