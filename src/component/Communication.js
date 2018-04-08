import React from 'react';
import Env from '../config/Env';

class Communication extends React.PureComponent {
    constructor(props) {
        super(props);
        this.webSocket = null;
        this.state = { error: null, message: null, isOpen: false }

        this.connect = this.connect.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onMessage = this.onMessage.bind(this);
        this.onError = this.onError.bind(this);
        this.send = this.send.bind(this);
        this.disconnect = this.disconnect.bind(this);
    }

    connect(lobbyId) {
        if (this.webSocket == null || !this.state.isOpen) {
            this.webSocket = new WebSocket(`ws://${Env.serverAddress}:${Env.serverPort}/${lobbyId}`)
            this.webSocket.onopen = this.onOpen
            this.webSocket.onclose = this.onClose
            this.webSocket.onmessage = this.onMessage
            this.webSocket.onerror = this.onError
        }
    }

    disconnect() {
        if (this.webSocket != null && this.state.isOpen) {
            this.webSocket.close();
        }
    }

    send(action) {
        if (this.webSocket != null && this.state.isOpen) {
            this.webSocket.send(JSON.stringify(action));
        }
    }

    onOpen(event) {
        this.setState({ isOpen: true })
    }

    onClose(event) {
        this.setState({ isOpen: false })
    }

    onError(error) {
        this.setState({ error })
    }

    onMessage(message) {
        this.setState({ message: JSON.parse(message.data) })
    }

    render() {
        const { children } = this.props;

        const childrenState = {
            message: this.state.message,
            error: this.state.error,
            connect: this.connect,
            disconnect: this.disconnect,
            isConnected: this.state.isOpen,
            send: this.send,
        }

        const childrenWithProps = React.Children.map(children, child =>
            React.cloneElement(child, childrenState));

        return (
            <div>{childrenWithProps}</div>
        )
    }
}

export default Communication;