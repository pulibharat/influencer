import { useState } from 'react';
import { sampleChatThreads, type ChatThread } from '@/data/mockData';
import { Search, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState<ChatThread>(sampleChatThreads[0]);
  const [newMessage, setNewMessage] = useState('');
  const [showList, setShowList] = useState(true);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    activeChat.messages.push({
      id: `m-new-${Date.now()}`,
      senderId: 'me',
      senderName: 'You',
      senderAvatar: '',
      text: newMessage,
      timestamp: 'Just now',
    });
    setNewMessage('');
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] glass-card overflow-hidden">
      {/* Chat list */}
      <div className={`w-full md:w-80 border-r border-border flex flex-col ${!showList ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-3 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search messages..." className="pl-10 bg-muted/50 border-0" />
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          {sampleChatThreads.map(thread => (
            <button
              key={thread.id}
              onClick={() => { setActiveChat(thread); setShowList(false); }}
              className={`w-full flex items-center gap-3 p-3 border-b border-border/50 hover:bg-muted/50 transition-colors text-left ${activeChat.id === thread.id ? 'bg-primary/5' : ''}`}
            >
              <img src={thread.participantAvatar} alt={thread.participantName} className="w-10 h-10 rounded-full" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium truncate">{thread.participantName}</span>
                  <span className="text-xs text-muted-foreground">{thread.lastTimestamp}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{thread.lastMessage}</p>
              </div>
              {thread.unread > 0 && (
                <span className="bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">{thread.unread}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat view */}
      <div className={`flex-1 flex flex-col ${showList ? 'hidden md:flex' : 'flex'}`}>
        <div className="h-14 border-b border-border flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-sm text-primary" onClick={() => setShowList(true)}>← Back</button>
            <img src={activeChat.participantAvatar} alt="" className="w-8 h-8 rounded-full" />
            <div>
              <p className="text-sm font-medium">{activeChat.participantName}</p>
              <p className="text-xs text-muted-foreground capitalize">{activeChat.participantRole}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-3">
          {activeChat.messages.map(msg => (
            <motion.div
              key={msg.id}
              className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                msg.senderId === 'me'
                  ? 'gradient-bg text-primary-foreground rounded-br-md'
                  : 'bg-muted rounded-bl-md'
              }`}>
                <p>{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.senderId === 'me' ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>{msg.timestamp}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-3 border-t border-border flex gap-2">
          <Input
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <Button className="gradient-bg border-0" size="icon" onClick={handleSend}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
