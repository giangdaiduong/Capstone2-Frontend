import React, { useState, useEffect, useMemo } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { User, Search, Users, MessageCircle } from 'lucide-react';

// Example mock data updated for group conversations
const mockConversations = [
  {
    id: 1,
    name: 'Group Chat 1',
    lastMessage: 'Hello everyone!',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    online: true,
    unread: false,
    members: [
      { id: 1, name: 'Lê Văn A', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
      { id: 2, name: 'Darshan Zalavadiya', avatar: 'https://randomuser.me/api/portraits/men/43.jpg' },
    ],
  },
  {
    id: 2,
    name: 'Project Team',
    lastMessage: 'Project updates?',
    avatar: 'https://randomuser.me/api/portraits/men/43.jpg',
    online: false,
    unread: true,
    members: [
      { id: 1, name: 'Lê Văn A', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
      { id: 3, name: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
    ],
  },
];

const mockUsers = [
  { id: 1, name: 'Lê Văn A', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 2, name: 'Darshan Zalavadiya', avatar: 'https://randomuser.me/api/portraits/men/43.jpg' },
  { id: 3, name: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { id: 4, name: 'Nguyễn Văn B', avatar: 'https://randomuser.me/api/portraits/men/46.jpg' },
];

function ChatApp({ senderId }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [connection, setConnection] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [search, setSearch] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [file, setFile] = useState(null);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [conversations, setConversations] = useState(mockConversations);

  // Fetch messages for the selected conversation
  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await fetch(`/v1/api/groupChat/${senderId}/${selectedConversation.id}`);
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        } else {
          console.error('Lỗi khi tải tin nhắn');
        }
      } catch (error) {
        console.error('Lỗi API:', error);
      }
    }

    fetchMessages();
  }, [selectedConversation, senderId]);

  // SignalR connection for receiving messages
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5000/chathub")
      .build();

    newConnection.on("ReceiveMessage", (user, message) => {
      setMessages(prev => [...prev, { user, message }]);
    });

    newConnection.start()
      .then(() => setConnection(newConnection))
      .catch(err => console.error("SignalR Connection Error:", err));

    return () => {
      newConnection.stop();
    };
  }, []);

  const sendMessage = async () => {
    if (message.trim() === "") return;

    setIsSending(true);

    if (connection) {
      connection.invoke("SendMessage", senderId, message, selectedConversation.id)
        .catch(err => console.error("SignalR Error:", err));
    }

    try {
      const response = await fetch(`/v1/api/groupChat/${senderId}/${selectedConversation.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: message,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const newMessage = await response.json();
        setMessages(prev => [...prev, { user: senderId, message: newMessage.content }]);
        setMessage('');
      } else {
        console.error('Gửi tin nhắn thất bại');
      }
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;

    setIsSending(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const uploaded = await response.json();
        setMessages(prev => [...prev, { user: senderId, message: uploaded.url }]);
        setFile(null);
      } else {
        console.error('Tải lên thất bại');
      }
    } catch (err) {
      console.error('Upload lỗi:', err);
    } finally {
      setIsSending(false);
    }
  };

  const filteredConversations = useMemo(() => {
    return mockConversations.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  const handleCreateGroup = (group) => {
    setConversations(prev => [group, ...prev]);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-[340px] bg-white border-r border-gray-200 flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-blue-900">Đoạn chat</h2>
          <div className="flex items-center space-x-2">
            <button
              className="p-1 hover:bg-blue-100 rounded-full"
              onClick={() => setShowCreateGroup(true)}
            >
              <Users className="w-5 h-5 text-blue-700" />
            </button>
            <button className="p-1 hover:bg-blue-100 rounded-full"><User className="w-5 h-5 text-blue-700" /></button>
          </div>
        </div>
        <div className="px-4 py-3 relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
          <input
            type="text"
            placeholder="Tìm kiếm"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-blue-100 text-blue-900 placeholder-blue-400 focus:outline-none"
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map(conv => (
            <div
              key={conv.id}
              className={`flex items-center px-4 py-2 cursor-pointer hover:bg-blue-50 ${selectedConversation.id === conv.id ? 'bg-blue-100' : ''}`}
              onClick={() => setSelectedConversation(conv)}
            >
              <div className="relative">
                <img src={conv.avatar} alt={conv.name} className="w-10 h-10 rounded-full border-2 border-white shadow" />
                {conv.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />}
              </div>
              <div className="ml-3 flex-1">
                <div className="font-semibold text-blue-900 leading-tight">{conv.name}</div>
                <div className="text-xs text-gray-500 font-bold">{conv.lastMessage}</div>
              </div>
              {conv.unread && <span className="w-2 h-2 bg-blue-700 rounded-full ml-2" />}
            </div>
          ))}
          <button onClick={() => setShowCreateGroup(true)} className="flex items-center px-4 py-2 cursor-pointer hover:bg-blue-50">
            <div className="flex-1">
              <div className="font-semibold text-blue-900 leading-tight">+ Tạo nhóm</div>
            </div>
          </button>
        </div>
        {showCreateGroup && (
          <CreateGroupModal
            onClose={() => setShowCreateGroup(false)}
            onCreate={handleCreateGroup}
            users={mockUsers}
          />
        )}
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="flex items-center px-8 py-4 border-b">
          <div className="flex-1">
            <div className="font-semibold text-lg text-blue-900">{selectedConversation.name}</div>
            <div className="text-green-500 text-sm font-semibold">Đang hoạt động</div>
          </div>
        </div>

        <div className="flex-1 px-10 py-6 overflow-y-auto flex flex-col space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.user === senderId ? 'justify-end' : 'justify-start'}`}>
              {msg.user !== senderId && (
                <img src={selectedConversation.avatar} alt="avatar" className="w-8 h-8 rounded-full mr-2" />
              )}
              <div className={`rounded-2xl px-6 py-3 text-white text-base font-medium max-w-[340px] ${msg.user === senderId ? 'bg-blue-800' : 'bg-blue-700'}`}>
                {msg.message}
              </div>
            </div>
          ))}
        </div>

        <div className="px-10 py-4 bg-blue-100 flex items-center space-x-3">
          <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Nhập tin nhắn"
            className="flex-1 rounded-lg px-4 py-3 bg-blue-50 focus:outline-none text-blue-900 placeholder-blue-400"
            onKeyDown={e => { if (e.key === 'Enter' && !isSending) sendMessage(); }}
            disabled={isSending}
          />
          <input type="file" onChange={e => setFile(e.target.files[0])} />
          <button onClick={handleFileUpload} className="text-sm px-3 py-2 bg-white rounded shadow hover:bg-blue-200">Tải lên</button>
          <button
            onClick={sendMessage}
            className={`p-2 rounded-full bg-white shadow hover:bg-blue-200 transition ${isSending ? 'opacity-50' : ''}`}
            disabled={isSending}
          >
            <MessageCircle className="w-6 h-6 text-blue-800" />
          </button>
        </div>
      </div>
    </div>
  );
}

function CreateGroupModal({ onClose, onCreate, users }) {
  const [groupName, setGroupName] = useState('');
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  const handleToggleUser = (id) => {
    setSelectedUserIds(prev =>
      prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    if (!groupName || selectedUserIds.length < 2) return;
    const members = users.filter(u => selectedUserIds.includes(u.id));
    onCreate({
      name: groupName,
      members,
      avatar: members[0]?.avatar || '',
      lastMessage: '',
      online: true,
      unread: false,
      id: Date.now(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[400px]">
        <h2 className="font-bold text-lg mb-2">Tạo nhóm mới</h2>
        <input
          value={groupName}
          onChange={e => setGroupName(e.target.value)}
          placeholder="Tên nhóm"
          className="w-full border rounded px-3 py-2 mb-3"
        />
        <div className="mb-3 max-h-40 overflow-y-auto">
          {users.map(u => (
            <label key={u.id} className="flex items-center space-x-2 mb-1">
              <input
                type="checkbox"
                checked={selectedUserIds.includes(u.id)}
                onChange={() => handleToggleUser(u.id)}
              />
              <img src={u.avatar} alt={u.name} className="w-6 h-6 rounded-full" />
              <span>{u.name}</span>
            </label>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
          disabled={!groupName || selectedUserIds.length < 2}
        >
          Tạo nhóm
        </button>
        <button onClick={onClose} className="px-4 py-2 rounded border">Hủy</button>
      </div>
    </div>
  );
}

export default ChatApp;
