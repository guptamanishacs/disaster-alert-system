export default function ExplainableAI({data}){

  return (
    <div>
      <h3>AI Explanation</h3>
      <p>Rainfall Impact: {data.rainfall}%</p>
      <p>Temperature Impact: {data.temperature}%</p>
      <p>Wind Impact: {data.wind}%</p>
    </div>
  );
}