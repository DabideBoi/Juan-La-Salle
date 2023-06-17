function sendReply(rowID) {
    // alert('input'+rowID);
    // Get the message data from the form
    let email = document.querySelector('#input'+rowID).value;
    let body = document.querySelector('#textarea'+rowID).value;
    // alert("Email " + email + "\nBody " + body); 

    // Make an AJAX request to the server
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/send_reply', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
    if (xhr.status === 200) {
        // Handle a successful response from the server
        location.reload()
        // alert('Reply sent successfully!');
    } else {
        // Handle an error response from the server
        alert('Error sending reply');
    }
    };
    xhr.onerror = function() {
    // Handle a network error
    alert('Network error');
    };
    xhr.send(JSON.stringify({email: email, body: body}));
}