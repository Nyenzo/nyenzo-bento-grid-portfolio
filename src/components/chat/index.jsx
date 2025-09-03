import "../../styles/chat/chat.css"
import { BrushCleaning } from "lucide-react"
import {api} from "../../../convex/_generated/api"
import {useMutation} from "convex/react"
import { useEffect } from "react"
import {useAnonUser} from "./AnonUserContext"
import { useState, useCallback, useRef } from "react"
import { useQueryWithStatus } from "./helper"
import MessageInput from "./MessageInput"
import MessageList from "./MessageList"
import { Hatch } from 'ldrs/react'
import 'ldrs/react/Hatch.css'
import meImage from "../../assets/avatars/me.jpg"

const currentThreadIdStorageKey = "nyenzobot_current_thread_id"

export default function Chat({initialMessage}) {
  const anonUser = useAnonUser()
  const hasInitialized = useRef(false)
  const chatBoxRef = useRef(null)

  const [currentThreadId, setCurrentThreadId] = useState(
    () => localStorage[currentThreadIdStorageKey] || null
  )
  const [messageCount, setMessageCount] = useState(0);

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

  const handleMessageCountChange = useCallback((count) => {
    setMessageCount(count);
  }, []);

  useEffect(() => {
    if (!anonUser) return
    if(!currentThreadId) {
      handleCreateThread()
    }
  }, [anonUser, currentThreadId, handleCreateThread])


  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-header-avatar">
          <img src={meImage}
          alt="AssistantAvatar"
          />
        </div>
        <div className="chat-header-content">
          <h2 className="chat-header-title">Nyenzo Bot</h2>
        </div>
        <button
        className="chat-header-new-thread-btn"
        title="Start new conversation"
        onClick={() =>{
          if (!confirm("Are you sure you want to clear this thread?")) return;
          localStorage.removeItem(currentThreadIdStorageKey);
          setMessageCount(0);
          setCurrentThreadId(null);
          hasInitialized.current = false;
        }}
        disabled={!anonUser || messageCount === 0}
        >
          <BrushCleaning size={16} className="chat-icon" />
        </button>
      </div>

      <div  ref={chatBoxRef} className="chat-messages-container">
       {threadQuery.data && anonUser ? (

        <MessageList
          threadId={threadQuery.data._id}
          userId={anonUser._id}
          chatBoxRef={chatBoxRef}
          onMessageCountChange={handleMessageCountChange}
        />
       ) : (
          <div className="chat-loading-container">
            <div className="chat-loading-spinner">
              <Hatch
                size="28"
                stroke="4"
                speed="3.5"
                color="white" 
              />
            </div>
          </div>
       )}

      </div>
        <div className="chat-input-wrapper">
           <MessageInput
          userId={anonUser?._id}
          threadId={threadQuery.data?._id}
          defaultMessage={initialMessage}
          />
        </div>
      </div>
  )
}