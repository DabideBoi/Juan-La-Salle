class Chatbox {
    constructor() {
        this.args = {
            //openButton: document.querySelector('.chatbox_button'),
            chatBox: document.querySelector('.chatbox'),
            sendButton: document.querySelector('#send')
        }

        this.state = false;
        this.messages = [];
    }  

    display() {
        const {chatBox, sendButton} = this.args;

        //openButton.addEventListener('click', () => this.toggleState(chatBox))

        sendButton.addEventListener('click', () => this.onSendButton(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })

        this.setSessionID(chatBox);
        this.introText(chatBox);
    }

    /*
    toggleState(chatbox) {
        this.state = !this.state;

        // show or hides the box
        if(this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }
    */

    introText(chatbox) {

        let intro = "Hello! My name is Juan, at your service!"; 
        let currentTime = new Date().toLocaleTimeString(); 
        let msg = { name: "Juan", message: intro, time: currentTime};
        this.messages.push(msg);
        this.updateChatText(chatbox)
    }
    
    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value
        if (text1 === "") {
            return;
        }

        let loading = '<img src="https://thumbs.gfycat.com/BlackandwhiteAmusedGilamonster.webp" style="width:50px; border-radius: 50%; padding: 2px"></img>'
        let currentTime = new Date().toLocaleTimeString(); 

        let msg1 = { name: "User", message: text1, time: currentTime }
        this.messages.push(msg1);
        let msg2 = { name: "Juan", message: loading, time: currentTime }
        this.messages.push(msg2);
        this.updateChatText(chatbox);
        textField.value = ''

        let chat_input = document.querySelector('#chat-input');
        chat_input.disabled = true
        chat_input.setAttribute("placeholder", "Please wait... Juan is thinking...");
        
        const response = fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          .then(r => r.json())
          .then(r => {
            this.messages.pop();
            this.deleteLatestMessage(chatbox);
            setTimeout(()=> {
                let currentTime = new Date().toLocaleTimeString(); 
                let msg2 = { name: "Juan", message: r.answer, time: currentTime };
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                chat_input.disabled = false;
                chat_input.setAttribute("placeholder", "Type something...");
             }
             ,500);
        }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox)
        });
    }

    deleteLatestMessage(chatbox) {
        let chatmessage = chatbox.querySelector('cm');
        let lastMessage = chatmessage.firstElementChild;
        if (lastMessage) {
          lastMessage.remove();
        }
    }
    updateChatText(chatbox) {
        let html = '';

        this.messages.slice().reverse().forEach(function(item, index) {
            if (item.name === "Juan") // Message from JuanLasalle
            {
                //component.chatbox chatbox_messages message.user
                //<message class="bot"><p>Hello! I am Juan, the only "Juan" you need for Registrar inquiries and concerns!</p></message>
                // html += '<message class="bot"><p>' + item.message + '</p><space></space></message>'

                // html += '<message class="d-flex bot pt-2"> \
                //             <p>'+ item.message + '</p> \
                //             <span class="ms-1 mt-auto text-muted">' + item.time + '</span> \
                //         </message>'

                html += '<div class="bot-div"><img class="juan-logo" src="https://media.discordapp.net/attachments/624110762691919882/1025435206884261949/JuanLasalle-big.png"><message class="d-flex bot"><p>'+ item.message + '</p><span class="ms-1 mt-auto text-muted">' + item.time + '</span></message></div>';
            }
            else { // Message from User
                // <message class="user"><p>haha can i say this out loud?</p></message>
                // html += '<message class="user"><space></space><p>' + item.message + '</p></message>' 

                html += '<message class="d-flex user pt-2"> \
                            <span class="ms-auto ps-auto text-muted">' + item.time + '</span> \
                            <p class="ms-2">' + item.message + '</p> \
                        </message>'
            }
          });

        // this.delayMessage(chatbox)

        // setTimeout(function() {            
        //     let chatbubble = chatbox.querySelector(".chat-bubble");
        //     chatbubble.remove();
        // }, 500);
        
        // let chatbubble = chatbox.querySelector(".chat-bubble");
        // chatbubble.remove();

        let chatmessage = chatbox.querySelector('cm');
        chatmessage.innerHTML = html;
    }
    
    setSessionID(chatbox) {
        let session = chatbox.querySelector('#session');
        let currentSession = new Date().toJSON();
        session.innerHTML = currentSession; 
    }

    
}

function onSeenMessage(id) {
    fetch('http://127.0.0.1:5000/seen_message', {
        method: 'POST',
        body: JSON.stringify({ message_id: id }),
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(r => r.json())
      .then(r => 
        {
            notifs = document.querySelector('#notifs');

            if (notifs != null) {
                if ( r.length <= 0) {
                    notifs.innerHTML = ''
                
                } else {
                    notifs.innerHTML = '+' + r.length;
                }
            }
           
        }
        ).catch((error) => {
        console.error('Error:', error);
    });

    let item = document.querySelector('#li-' + id);
    if (item.childNodes[1] != null) {
        item.removeChild(item.childNodes[1]);
    }
    
}

function checkIfNew() {
    let myList = [...document.querySelectorAll('.li-e')];
    myList.forEach(item => {
        let isNew = item.dataset.isnew;
        if (isNew == "True") {
            item.innerHTML += '<span style="z-index: 1;" id="notifs" class="badge bg-danger">NEW!<span class="visually-hidden">unread messages</span>';
            item.dataset.isnew = "False";
        }
    });
}

const chatBox = new Chatbox();
chatBox.display();


