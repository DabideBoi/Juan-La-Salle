const documentChatbox = document.querySelector('body-d');

const ChatBox = () => {
    const [isTyping, setTyping] = React.useState(false);
    const [timeoutId, setTimeoutId] = React.useState(null);

    function typeHandler(event) {
        setTyping(true);
        // clearTimeout(timeoutId);
        const newTimeoutId = setTimeout(() => {
            setTyping(false);
        }, 2000);
        setTimeoutId(newTimeoutId);
    }

    return (
        <chatbox className="card mx-auto chatbox" style={{height: "100%", borderRadius: "20px" }}>
            <ch className="card-header bg-transparent" >
                <NavBar/ >
            </ch>

            <ChatMessages isTyping={isTyping}/>

            <cf className="card-footer bg-white position-absolute w-100 bottom-0 m-0 p-1" style={{borderRadius: "0px 0px 20px 20px"}}>
                <input-group class="input-group">
                    
                    <ChatInput typeHandler={typeHandler} />

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

function ChatInput( {typeHandler}) {
    return (
        <input tabIndex="0" onKeyDown={typeHandler} type="text" id="chat-input" className="form-control border rounded m-2" placeHolder="Type something..."/> 
    )
}

function ChatMessages( {isTyping} ) {
    return (
        <cm className="d-flex card-body mb-5">
            { isTyping ? <ChatBubble /> : null }
        </cm>
    );
}

function ChatBubble() {
    return (
    <div class="typing">
        <span class="circle scaling"></span>
        <span class="circle scaling"></span>
        <span class="circle scaling"></span>
    </div>
    );
};

function NavBar() {
    return (
        <nav className="navbar navbar-expand py-0">
            <ul className="d-flex align-items-center justify-content-between w-100 ps-0 mb-0">
                <ul className="navbar-nav me-auto align-items-center">
                    <li className="nav-item">
                        <div className="position-relative" style={{width:50, height: 50, borderRadius: "50%", padding: 2}}>
                            <img src="https://media.discordapp.net/attachments/624110762691919882/1025435206884261949/JuanLasalle-big.png" className="img-fluid rounded-circle" alt="Juan Lasalle, at your service! :)" />
                        </div>
                    </li>
                    <li className="nav-item">
                        <a href="#!" className="nav-link fs-6">Juan LaSalle</a>
                    </li>
                </ul>
                <ul className="navbar-nav align-items-center"> 
                    <li className="nav-item">
                        <div className="border" id="session" style={{background: "#3FCC53", borderRadius: "50px", fontSize: 12, fontWeight: "bold", color: "#FFFFFF", padding: "5px 10px"}}></div>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto">
                    <a className="btn btn-light text-secondary" id="menu" type="button" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                        <i className="fas fa-bars"></i>
                    </a>
                </ul>
            </ul>    
        </nav>
    );
}

function OffCanvas() {
    return (
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" data-bs-scroll="true" data-bs-backdrop="false">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div>
                    {/* Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
                    {% for e in mylist %}
                    {{e}}
                    {% endfor %} */}
                </div>
                <div class="dropdown mt-3">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    Dropdown button
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
                </div>
            </div>
        </div>
    );
}

function App() {

    return (
        <main className="container-sm my-4" style={{height: '94vh'}}>
            <ChatBox />
            <OffCanvas />   
        </main>
    );
};

ReactDOM.render(<App />, documentChatbox);

const chatbox = new Chatbox();
chatbox.display();


// class ChatBox extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = { 
//             isTyping: false
//         }

//         //this.typingHandler = this.typingHandler.bind(this);
//     }

//     typingHandler() {
//         console.log("typed!");
//     }

//     componentDidMount () {
//         const script = document.createElement("script");
//         script.src = "/path/to/resource.js";
//         script.async = true;
//         document.body.appendChild(script);
//     }
    
//     render() {
//         return (
//             <chatbox className="card mx-auto chatbox" style={{height: "100%", borderRadius: "20px" }}>
//                 <ch className="card-header bg-transparent" >
//                     <nav className="navbar navbar-expand py-0">
//                         <ul className="d-flex align-items-center justify-content-between w-100 ps-0 mb-0">
//                             <ul className="navbar-nav me-auto align-items-center">
//                                 <li className="nav-item">
//                                     <div className="position-relative" style={{width:50, height: 50, borderRadius: "50%", padding: 2}}>
//                                         <img src="https://media.discordapp.net/attachments/624110762691919882/1025435206884261949/JuanLasalle-big.png" className="img-fluid rounded-circle" alt="Juan Lasalle, at your service! :)" />
//                                     </div>
//                                 </li>
//                                 <li className="nav-item">
//                                     <a href="#!" className="nav-link fs-6">Juan LaSalle</a>
//                                 </li>
//                             </ul>
//                             <ul className="navbar-nav align-items-center"> 
//                                 <li className="nav-item">
//                                     <div className="border" id="session" style={{background: "#3FCC53", borderRadius: "50px", fontSize: 12, fontWeight: "bold", color: "#FFFFFF", padding: "5px 10px"}}></div>
//                                 </li>
//                             </ul>
//                             <ul className="navbar-nav ms-auto">
//                                 <button className="btn btn-light text-secondary" id="menu">
//                                     <i className="fas fa-bars"></i>
//                                 </button>
//                             </ul>
//                         </ul>    
//                     </nav>   
//                 </ch>

//                 <ChatMessages isTyping={this.state.isTyping}/>

//                 <cf className="card-footer bg-white position-absolute w-100 bottom-0 m-0 p-1" style={{borderRadius: "0px 0px 20px 20px"}}>
//                     <input-group class="input-group">
                        
//                         <ChatInput onChange={() => this.setState({ isTyping: True }))} />

//                         <div className="input-group-text bg-transparent border-0">
//                             <button className="btn btn-light text-secondary" id="send">
//                                 <i className="fas fa-paper-plane"></i>
//                             </button>
//                         </div>
//                     </input-group>
//                 </cf>

//             </chatbox>
//         );
//     }
// }



// class ChatInput extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//         isTyping: false
//         };
//     }

//     render() {
//         return (
//             <hakdog> 
                
//                 <tite></tite>
//             </hakdog>
            
//         );
//     }
// }

// class ChatMessages extends React.Component {
//     constructor(props) {
//         super(props);
//     }
    
//     render() {
//         const isTyping = this.props.isTyping;
//         return (
//             <cm className="d-flex card-body mb-5">
//                 { isTyping ? <ChatBubble /> : null }
//             </cm>
//         );
//     }
// }

