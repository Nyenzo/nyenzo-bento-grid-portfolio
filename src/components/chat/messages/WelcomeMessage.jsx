import '../../../styles/chat/welcome-message.css'
import {portfolioPrompts} from '../../../data/portfolioPrompts'
import { optimisticallySendMessage } from '@convex-dev/agent/react'
import {useMutation} from 'convex/react'
import {api} from '../../../../convex/_generated/api'

function WelcomeMessage({threadId, userId}) {
    const sendMessage = useMutation(
        api.nyenzobot.mutation.sendMessageToThreadFromUser,
    ).withOptimisticUpdate((store, args) => {
        optimisticallySendMessage(api.nyenzobot.queries.listMessagesForUserThread)(store, {
            threadId: args.threadId,
            prompt: args.prompt,
        });
    });
  return (
    <div className='message-list-container welcome-container'>
        <div className='welcome-message'>
            <h2 className='welcome-title'> Hey there, here to tickle your thoughts. What would you like to know?</h2>
            <div className='suggested-prompts'>
                {portfolioPrompts.reduce((rows, prompt, index) => {
                    const rowIndex = Math.floor(index / 4);
                    if (!rows[rowIndex]) {
                        rows[rowIndex] = [];
                    }
                    rows[rowIndex].push(prompt);
                    return rows;
                }, []).map((row, rowIndex) => (
                    <div key={rowIndex} className='prompt-row'>
                        {row.map((prompt) => (
                            <button 
                                key={prompt.id}
                                className='prompt-button'
                                onClick={() => sendMessage({threadId, userId, message: prompt.text})}
                            >
                                {prompt.text}
                            </button>
                        ))}
                    </div>

                ))}
            </div>
        </div>
    </div>
  )
};

export default WelcomeMessage