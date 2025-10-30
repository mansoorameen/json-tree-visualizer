import { useState } from "react";
import { sampleJsonData } from "../data/sampleJson";

function JsonInput({ onJsonChange }) {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");

  const validateAndVisualize = () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      setError("");
      onJsonChange(parsedJson);
    } catch (err) {
      setError("Invalid JSON: " + err.message);
    }
  };

  return (
    <div className="json-input">
      <h2 className="section-title">
        JSON Input
      </h2>
      
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder={sampleJsonData}
        className="json-textarea"
      />
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <button
        onClick={validateAndVisualize}
        className="generate-button"
      >
        Generate Tree
      </button>
    </div>
  );
}

export default JsonInput;