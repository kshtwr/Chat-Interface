type MessageBubbleProps = {
    content: string
    role: "user" | "assistant"
}

export default function MessageBubble({content, role}: MessageBubbleProps) {
    return <div className = {`px-4 py-2 rounded-xl ${role == "user"?"self-end bg-yellow-200":"self-start bg-blue-200"}`}>{content}</div>
  }
  