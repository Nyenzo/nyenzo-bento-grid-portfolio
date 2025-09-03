import '../../../styles/chat/assistant-message.css'
import BubbleMessageContent from "./BubbleMessageContent"
import ToolMessage from "./ToolMessage"
import meImage from "../../../assets/avatars/me.jpg"

function AssistantMessage({ message, status }) {
    const messageText = message.text ?? ""
    if(message.tool) return <ToolMessage message={message} />

  return (
    <div className="assistant-message">
        <div className="assistant-avatar">
            <img src={meImage} alt='Assistant Avatar' />
        </div> 

        <div className="assistant-message-container">
            <div className="assistant-message-bubble">
                <BubbleMessageContent message={messageText} isLoading={status === "pending"} />
            </div>
        </div>
    </div>
  )
}

export default AssistantMessage