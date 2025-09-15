"use client"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Phone, Video, MoreVertical } from "lucide-react"
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc, Timestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { set } from "mongoose"


export function ChatDialog({ isOpen, onClose, mentor, currentUserId, currentUserName }) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const scrollAreaRef = useRef(null)

  // Create chat ID using the same logic as Flutter
  const getChatId = (currentUserID, otherUserID) => {
    const userIds = [currentUserID, otherUserID]
    userIds.sort()
    return userIds.join("_")
  }

  const chatId = getChatId(currentUserId, mentor._id)

  console.log("Chat ID:", chatId)

  useEffect(() => {
    if (!isOpen) return

    // Set up real-time listener for messages using nested collection structure
    const chatDocRef = doc(db, "chats", chatId)
    const messagesRef = collection(chatDocRef, "messages")
    const q = query(messagesRef, orderBy("timestamp", "desc"))

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const newMessages = []
        snapshot.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
          })
        })
        // Reverse to show oldest first (since we ordered by desc for pagination)
        setMessages(newMessages.reverse())
        setLoading(false)
      },
      (error) => {
        console.error("Error fetching messages:", error)
        setLoading(false)
      },
    )

    return () => unsubscribe()
  }, [isOpen, chatId])

  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight
      }
    }
  }, [messages])

  const handleSendMessage = async () => {
    const trimmedMessage = message.trim()
    setMessage("") // Clear input after sending
    if (trimmedMessage) {
      try {
        // Add message to nested collection structure
        const chatDocRef = doc(db, "chats", chatId)
        const messagesRef = collection(chatDocRef, "messages")

        await addDoc(messagesRef, {
          text: trimmedMessage,
          senderId: currentUserId,
          senderName: currentUserName,
          timestamp: serverTimestamp(),
        })

      } catch (error) {
        console.error("Error sending message:", error)
      }
    }
  }

  const formatTime = (timestamp) => {
    if (!timestamp) return "" // or return "N/A"

    let date
    if (timestamp.toDate) {
      date = timestamp.toDate()
    } else {
      date = new Date(timestamp) // fallback if it's a native timestamp
    }

    if (!date) return ""

    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleVideoCall = () => {
    // open new window with Jitsi meeting
    const roomName = `${mentor._id}-${currentUserId}-${Date.now()}`
    const userName = currentUserName || "User"
    const isModerator = currentUserId === mentor._id // Assuming mentor is the moderator
    const jitsiUrl = `/meeting/${roomName}?userName=${encodeURIComponent(userName)}&isModerator=${isModerator}`
    window.open(jitsiUrl, "_blank", "width=800,height=600")
  }


  if (!mentor) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md h-[600px] p-0 flex flex-col">
        {/* Header */}
        <DialogHeader className="p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10 ring-2 ring-white">
                <AvatarImage src={mentor.image || "/placeholder.svg"} alt={mentor.name} />
                <AvatarFallback className="bg-white text-blue-600 font-semibold">
                  {mentor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-white font-semibold">{mentor.name}</DialogTitle>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button onClick={handleVideoCall} size="sm" variant="ghost" className="text-white hover:bg-white/20">
                <Phone className="w-4 h-4" />
              </Button>
              <Button onClick={handleVideoCall} size="sm" variant="ghost" className="text-white hover:bg-white/20">
                <Video className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                <MoreVertical className="w-4 h-4" />

              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Messages */}
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderId === currentUserId ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${msg.senderId === currentUserId
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-gray-100 text-gray-900"
                      }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.senderId === currentUserId ? "text-blue-100" : "text-gray-500"}`}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              {messages.length === 0 && (
                <div className="text-center text-gray-500 mt-8">
                  <p>No messages yet. Start the conversation!</p>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t bg-gray-50">

          <div className="flex space-x-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <div className="absolute top-full mt-2 right-0 bg-black text-white text-sm px-4 py-2 rounded shadow-lg font-thin">
            For complete chat system, download the app and start a chat with your instructor.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
