import { useState } from "react";
import {api} from "../../../../convex/_generated/api";
import { useMutation } from "convex/react";

function ChatSection() {
    const createThread = useMutation(api.demo.chat.createThread)
    const [threadId, setThreadId] = useState(null)
  return (
    <div>
        <div>
            <h1>Convex agent demo</h1>
        </div>
        {
            threadId ? (<div>Thread open</div>) : (
                <div>
                    <p>No thread created</p>
                    <button onClick={() => createThread().then(setThreadId)}>
                        create thread
                    </button>
                </div>
        )
    }
    </div>
  )
}

export default ChatSection;