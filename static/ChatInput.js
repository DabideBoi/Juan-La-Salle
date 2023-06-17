export default function ChatInput({typeHandler}) {
    return (
        <input onChange={typeHandler} type="text" id="chat-input" className="form-control border rounded m-2" placeHolder="Type something..." /> 
    )
}

