import React from "react";

export default function Emergency({ sendSOS, chatInput, setChatInput, handleChat, chatResponse }) {
  return (
    <div>
      <h2>🆘 Emergency Tools</h2>

      <button onClick={sendSOS}>Send SOS</button>

      <h3>🤖 AI Chat</h3>
      <input
        value={chatInput}
        onChange={(e) => setChatInput(e.target.value)}
        placeholder="Ask help..."
      />
      <button onClick={handleChat}>Ask</button>

      <p>{chatResponse}</p>

      <h3>📞 Contacts</h3>
      <p>Police: 100</p>
      <p>Ambulance: 102</p>
    </div>
  );
}
