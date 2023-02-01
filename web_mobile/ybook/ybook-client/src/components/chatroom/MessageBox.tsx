import { IconSend } from "@tabler/icons-react";
import { useState } from "react";
import { useSendMessage } from "../../hooks/chatrooms/useSendMessage";

export function MessageBox({ conversationId }: { conversationId: number }) {
  const send = useSendMessage({ conversationId });
  const [content, setContent] = useState("");
  return (
    <div className="fixed bottom-2 left-2 right-2 flex gap-2 rounded-full border bg-white p-2">
      <input
        type="text"
        className="w-full rounded-full border-none p-2 outline-none"
        value={content}
        placeholder="Type a message..."
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={() => {
          send(content);
          setContent("");
        }}
        className="aspect-square rounded-full bg-blue-500 p-2 text-white"
      >
        <IconSend />
      </button>
    </div>
  );
}
