const Env = {
    serverAddress: "8563c8fb.ngrok.io",
    serverPort: "80"
}

class Communication extends React.PureComponent {
    constructor(props){
        super(props);
        this.webSocket = null;
        this.state = { error: null, message: null, isOpen: false}

        this.connect = this.connect.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onMessage = this.onMessage.bind(this);
        this.onError = this.onError.bind(this);
    }

    connect (lobbyId) {
        if (this.webSocket == null || !this.state.isOpen) {
            this.webSocket = new WebSocket(`ws://${Env.serverAddress}:${Env.serverPort}/${lobbyId}`)
            this.webSocket.onopen = this.onOpen
            this.webSocket.onclose = this.onClose
            this.webSocket.onmessage = this.onMessage
            this.webSocket.onerror = this.onError
        }
    }

    disconnect () {
        if (this.webSocket != null && this.state.isOpen) {
            this.webSocket.close();
        }
    }

    onOpen (event) {
        this.setState({ isOpen: true })
    }

    onClose (event) {
        this.setState({ isOpen: false })
    }

    onError (error) {
        this.setState({ error })
    }

    onMessage (message) {
        this.setState({ message })
    }

    render () {
        const { children } = this.props;

        const childrenState = { 
            message: this.state.message, 
            error: this.state.error, 
            connect: this.connect, 
            disconnect: this.disconnect 
        }

        const childrenWithProps = React.Children.map(children, child =>
            React.cloneElement(child, childrenState));

        return (
            <div>{childrenWithProps}</div>
        )
    }
}


class JoinForm extends React.PureComponent {
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

function JoinScreen(props) {
    return <div>
        <Header />
        <Greeting />
        <JoinForm {...props}/>
    </div>
}

function getCurrentScreen() {
    //TODO navigate to other screen when some condition changed
    return <JoinScreen />
}

const App = () => (
    <Communication>
        { getCurrentScreen() }
    </Communication>
)

ReactDOM.render(
    <App />,
    document.getElementById('root')
);