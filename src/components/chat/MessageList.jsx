import { useThreadMessages } from '@convex-dev/agent/react'
import { api } from '../../../convex/_generated/api'
import MessageRow from '../chat/messages/MessageRow'
import '../../styles/chat/message-list.css'
import { useEffect } from 'react'
import WelcomeMessage from '../chat/messages/WelcomeMessage'

function MessageList({threadId, userId, chatBoxRef, onMessageCountChange}) {
    const messages = useThreadMessages(
    api.nyenzobot.queries.listMessagesForUserThread,
    {threadId, userId},
    {initialNumItems: 10, stream: true}

     )
    useEffect(() => {
      if (chatBoxRef.current) {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
      }
    }, [messages, chatBoxRef])
    useEffect(() => {
      if (onMessageCountChange) {
        onMessageCountChange(messages.results.length);
      }
    }, [messages, onMessageCountChange]);

    if(messages.results.length === 0) {
      return <WelcomeMessage threadId={threadId} userId={userId} />;
    }

  return (
    <div className='message-list-container'>
      {
        messages.results.map((message) => (
            <MessageRow key={message._id} message={message} />
        ))
      }
    </div>
  )
}

export default MessageList