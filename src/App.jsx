import { useState } from "react";
import JsonInput from "./components/JsonInput";
import TreeVisualization from "./components/TreeVisualization";
import { sampleJsonData } from "./data/sampleJson";

function App() {
  const [jsonData, setJsonData] = useState(JSON.parse(sampleJsonData));

  return (
    <div className="app">
      <JsonInput onJsonChange={setJsonData} />
      <TreeVisualization jsonData={jsonData} />
    </div>
  );
}

export default App;
