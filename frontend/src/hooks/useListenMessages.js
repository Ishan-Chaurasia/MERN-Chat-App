import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      
      // 1. No import needed! Just use the string directly.
      const sound = new Audio("/notification.mp3");
      sound.play().catch((err) => console.log("Sound blocked by browser:", err));
      
      // 2. Safely get the previous messages without relying on the dependency array
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // 3. Added optional chaining (?) just to be safe
    return () => socket?.off("newMessage");
    
  }, [socket, setMessages]); // 4. 'messages' is strictly removed from here!
};

export default useListenMessages;