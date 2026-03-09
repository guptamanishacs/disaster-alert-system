export default function AlertControl(){

  const sendAlert = () => {
    alert("🚨 National Alert Sent to All Users");
  };

  return (
    <div>
      <h2>Emergency Broadcast</h2>
      <button onClick={sendAlert}>Send National Alert</button>
    </div>
  );
}