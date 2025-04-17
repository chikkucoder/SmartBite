import React, { useState } from 'react';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');

    // 🔽 Your handleSend function goes here INSIDE the component
    const handleSend = async () => {
        if (!userInput.trim()) return;

        const userMessage = { sender: 'user', text: userInput };
        setMessages(prev => [...prev, userMessage]);

        try {
            const response = await fetch('http://localhost:5000/api/chatbot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userInput })
            });

            const data = await response.json();
            console.log("Response from backend:", data); // 🛠️ Debug log

            const botMessage = { sender: 'bot', text: data.reply };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Error with the chatbot request:", error);
            const errorMessage = { sender: 'bot', text: "Oops! Something went wrong. Please try again later." };
            setMessages(prev => [...prev, errorMessage]);
        }

        setUserInput('');
    };

    // 🧠 Component JSX
    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', width: '300px', zIndex: 9999 }}>
            <button className="btn btn-primary" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? 'Close Chat' : 'Chat with SmartBite'}
            </button>

            {isOpen && (
                <div className="card p-2 mt-2">
                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {messages.map((msg, i) => (
                            <div key={i} className={`text-${msg.sender === 'bot' ? 'success' : 'primary'}`}>
                                <strong>{msg.sender === 'bot' ? 'Bot' : 'You'}:</strong> {msg.text}
                            </div>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        className="form-control my-2"
                        placeholder="Ask me anything..."
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button className="btn btn-success w-100" onClick={handleSend}>Send</button>
                </div>
            )}
        </div>
    );
}
