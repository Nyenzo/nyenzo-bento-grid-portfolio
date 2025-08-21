import Markdown from "react-markdown"
import "../../../styles/chat/bubble-message-content.css"

function BubbleMessageContent({ message, isLoading }) {
  return (
    <div className="bubble-message-content">
        <div className="bubble-message-content-markdown">
            <Markdown
                components={{
                    a: ({ ...props}) => <a {...props} target='_blank' rel='noopener noreferrer'/>,
                }}
            >
                {message}
            </Markdown>
        </div>
        {
            isLoading ? (
                <div className="bubble-message-content-loading">
                    <div className="bubble-message-content-loading-spinner">
                        <div>Loading..</div>
                    </div> 
                </div>
            ): null
        }
    </div>
  )
}

export default BubbleMessageContent