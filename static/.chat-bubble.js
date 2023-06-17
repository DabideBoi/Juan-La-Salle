const documentChatbox = document.querySelector('main');

class ChatBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            isTyping: false
        }

        this.typingHandler = this.typingHandler.bind(this);
    }

    typingHandler() {
        this.setState({
            isTyping: true
        }); 
    }
    
    render() {
        return (
            <chatbox className="card mx-auto chatbox" style={{height: 100%, border-radius: 20px }}>
                <ch className="card-header bg-transparent" >
                    <nav className="navbar navbar-expand py-0">
                        <ul className="d-flex align-items-center justify-content-between w-100 ps-0 mb-0">
                            <ul className="navbar-nav me-auto align-items-center">
                                <li className="nav-item">
                                    <div className="position-relative" style={{width:50px, height: 50px, border-radius, 50%, padding: 2px}}>
                                        <img src="https://media.discordapp.net/attachments/624110762691919882/1025435206884261949/JuanLasalle-big.png" className="img-fluid rounded-circle" alt="Juan Lasalle, at your service! :)" />
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <a href="#!" className="nav-link fs-6">Juan LaSalle</a>
                                </li>
                            </ul>
                            <ul className="navbar-nav align-items-center"> 
                                <li className="nav-item">
                                    <div className="border" id="session" style={{background: #3FCC53, border-radius: 50px, font-size: 12px, font-weight: bold, color: #FFFFFF, padding: 5px 10px}}></div>
                                </li>
                            </ul>
                            <ul className="navbar-nav ms-auto">
                                <button className="btn btn-light text-secondary" id="menu">
                                    <i className="fas fa-bars"></i>
                                </button>
                            </ul>
                        </ul>    
                    </nav>   
                </ch>

                <ChatMessages isTyping={this.state.isTyping}/>

                <cf className="card-footer bg-white position-absolute w-100 bottom-0 m-0 p-1" style={{border-radius: 0px 0px 20px 20px}}>
                    <input-group className="input-group">
                        
                        <ChatInput isTyping={this.state.isTyping} />

                        <div className="input-group-text bg-transparent border-0">
                            <button className="btn btn-light text-secondary" id="send">
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </input-group>
                </cf>

            </chatbox>
        );
    }
}

class ChatInput extends React.Component {
constructor(props) {
    super(props);
    this.state = {
    isTyping: false
    };
}

render() {
    return (
        <input onChange={this.props.typingHandler} type="text" id="chat-input" class="form-control border rounded m-2" placeholder="Type something...">
            { this.isTyping ? <ChatBubble /> : null } 
        </input>
    );
}
}

class ChatMessages extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {

        const isTyping = this.props.isTyping;
        return (
            <cm className="d-flex card-body mb-5">
                { isTyping ? <ChatBubble /> : null }
            </cm>
        );
    }
}

const ChatBubble = () => {
    return (
        <div className="typing">
            8==D
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
        </div>  
    );
};

function App() {
    return (
        <div>
            <ChatBox />
        </div>
    );
};

ReactDOM.render(<App />, documentChatbox);
const valid = React.isValidElement(<App />);