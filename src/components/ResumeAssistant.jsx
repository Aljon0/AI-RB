import { useState } from "react";

const ResumeAssistant = () => {
    const [chatMessage, setChatMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([
      {
        sender: "ai",
        message: "Hello! I'm your resume assistant. Tell me about your work experience, skills, or education, and I'll help build your resume."
      }
    ]);
    
    const [selectedFile, setSelectedFile] = useState(null);
  
    const handleChatSubmit = (e) => {
      e.preventDefault();
      if (chatMessage.trim() === "") return;
      
      // Add user message to chat
      setChatHistory([...chatHistory, { sender: "user", message: chatMessage }]);
      
      // Simulate AI response
      setTimeout(() => {
        setChatHistory(prev => [...prev, { 
          sender: "ai", 
          message: "I've noted that information. What else would you like to add to your resume?" 
        }]);
      }, 1000);
      
      setChatMessage("");
    };
  
    const handleFileChange = (e) => {
      if (e.target.files && e.target.files[0]) {
        setSelectedFile(e.target.files[0]);
      }
    };
  
    return (
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-[#22333B]">Resume Assistant</h2>
          <div className="relative">
            <input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*,.pdf,.doc,.docx"
            />
            <button className="flex items-center space-x-1 bg-[#22333B] text-white px-3 py-1.5 rounded-md hover:bg-opacity-90 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
              </svg>
              <span>{selectedFile ? selectedFile.name : "Upload Documents"}</span>
            </button>
          </div>
        </div>
        
        {/* Chat messages */}
        <div className="bg-[#F2F4F3] rounded-lg p-3 mb-3 h-40 overflow-y-auto">
          {chatHistory.map((chat, index) => (
            <div key={index} className={`mb-2 ${chat.sender === "user" ? "text-right" : ""}`}>
              <div className={`inline-block rounded-lg px-3 py-2 max-w-[80%] ${
                chat.sender === "user" 
                  ? "bg-[#A9927D] text-white" 
                  : "bg-[#22333B] text-white"
              }`}>
                {chat.message}
              </div>
            </div>
          ))}
        </div>
        
        {/* Chat input */}
        <form onSubmit={handleChatSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            placeholder="Tell me about your experience, education, or skills..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A9927D]"
          />
          <button 
            type="submit"
            className="bg-gradient-to-r from-[#A9927D] to-[#5E503F] text-white px-4 py-2 rounded-md hover:from-[#5E503F] hover:to-[#A9927D] transition duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </form>
      </div>
    );
  };

  export default ResumeAssistant;