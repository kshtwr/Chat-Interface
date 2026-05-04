import ReactMarkdown from 'react-markdown'

type MessageBubbleProps = {
    content: string
    role: "user" | "assistant"
}

export default function MessageBubble({content, role}: MessageBubbleProps) {
    return <div className = {`px-4 py-2 rounded-[20px] max-w-[80%] markdown shadow-md ${role == "user"?"self-end bg-yellow-200":"self-start bg-blue-200"}`}>
    <ReactMarkdown>{content}</ReactMarkdown>
  </div>
  }
  