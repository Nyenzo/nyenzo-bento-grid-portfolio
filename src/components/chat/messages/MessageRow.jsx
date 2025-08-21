import  AssistantMessage  from "./AssistantMessage"
import UserMessage from "./UserMessage"

function MessageRow({ message }) {
    if(!message.message) return "Message Missing"
    if(message.message.role === "assistant"){
        return <AssistantMessage message={message.status} />
    }
    if(message.message.role === "user"){
        return <UserMessage message={message} />
    }

    if (message.message.role == 'system') return null
    return "Unknown Message"

}

export default MessageRow