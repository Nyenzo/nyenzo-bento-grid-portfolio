import React from 'react'
import BubbleMessageContent from './BubbleMessageContent'
import '../../../styles/chat/user-message.css'

function UserMessage({ message }) {
    if(!message.text) return null
    let userMessage = message.text ?? ""

    try{
        userMessage =JSON.parse(message.text).message
        // eslint-disable-next-line no-unused-vars, no-empty
    } catch (e) {}
  return (
    <div className='user-message'>
        <div className='user-message-content'>
            <div className='user-message-bubble'>
                <BubbleMessageContent message={userMessage} />
            </div> 
        </div>
    </div>
  )
}

export default UserMessage