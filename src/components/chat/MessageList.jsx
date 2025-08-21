import { useThreadMessages } from '@convex-dev/agent/react'
import { api } from '../../../convex/_generated/api'
import MessageRow from '../chat/messages/MessageRow'
import '../../styles/chat/message-list.css'

function MessageList({threadId, userId}) {
    const messages = useThreadMessages(
    api.nyenzobot.queries.listMessagesForUserThread,
    {threadId, userId},
    {initialNumItems: 10, stream: true}

     )
     console.log(messages)
  return (
    <div className='message-list-container'>
      {
        messages.results.map((message) => {
            <MessageRow key={message._id} message={message} />
        })
      }
    </div>
  )
}

export default MessageList