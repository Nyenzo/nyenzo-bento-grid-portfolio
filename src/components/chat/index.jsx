import "../../styles/chat/chat.css"
import { BrushCleaning } from "lucide-react"
import {api} from "../../../convex/_generated/api"
import {useMutation} from "convex/react"
import { useEffect } from "react"
import {useAnonUser} from "./AnonUserContext"
import { useState, useCallback, useRef } from "react"
import { useQueryWithStatus } from "./helper"
import MessageInput from "./MessageInput"

const currentThreadIdStorageKey = "nyenzobot_current_thread_id"

export default function Chat({initialMessage}) {
  const anonUser = useAnonUser()
  const hasInitialized = useRef(false)
  const [currentThreadId, setCurrentThreadId] = useState(
    () => localStorage[currentThreadIdStorageKey] || null
  )


  const createThread = useMutation(api.nyenzobot.mutation.createThreadForUser)

  const threadQuery = useQueryWithStatus(
    api.nyenzobot.queries.findThreadForUser,
    currentThreadId && anonUser ? {threadId: currentThreadId, userId: anonUser._id} : "skip"
  )

  const handleCreateThread = useCallback(async ()=> {
    if (!anonUser || hasInitialized.current) return
    
    hasInitialized.current = true
    try{
      const id = await createThread({userId: anonUser._id})
      localStorage[currentThreadIdStorageKey] = id
      setCurrentThreadId(id)
    }catch (error){
      console.error(error)
      hasInitialized.current = false
    }
  }, [anonUser, createThread])
  useEffect(() => {
    if (!anonUser) return
    if(!currentThreadId) {
      handleCreateThread()
    }
  }, [anonUser, currentThreadId, handleCreateThread])

  useEffect(() => {
    if (!anonUser) return
    if(!currentThreadId) {
      handleCreateThread()
    }
  },[anonUser, currentThreadId, handleCreateThread])

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-header-avatar">
          <img src="/src/assets/avatars/me.jpg" 
          alt="AssistantAvatar"
          />
        </div>
        <div className="chat-header-content">
          <h2 className="chat-header-title">Nyenzo Bot</h2>
        </div>
        <button
        className="chat-header-new-thread-btn"
        title="Start new conversation"
        >
          <BrushCleaning size={16} className="chat-icon" />
        </button>
      </div>
      <div className="chat-messages-container">
       
        {/* <MessagesList 
        /> */}
        <div className="chat-input-wrapper">
           <MessageInput
          userId={anonUser?._id}
          threadId={threadQuery.data?._id}
          defaultMessage={initialMessage}
          />
        </div>
      </div>
      </div>
  )
}