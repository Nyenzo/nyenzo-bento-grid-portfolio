import '../../../styles/chat/tool-message.css'

function ToolMessage({message}) {
    if(message.message?.role !== 'assistant') return null;
    if(!message.message.content) return null;
    if(typeof message.message.content == 'string') return null;
  return (
    <div className="tool-message">
        {message.message.content.map((content, idx) => (
            <div key={idx} className="tool-message-content">
                <span role="img" className="tool-message-icon">
                    🔩
                </span>
                <span className="tool-message-text">
                    Tool used: {content.toolName}
                </span>
            </div>
        ))}
    </div>
  )
}

export default ToolMessage