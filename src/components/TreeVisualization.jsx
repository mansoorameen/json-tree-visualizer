import { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { jsonToNodes } from '../utils/jsonToNodes';

function TreeVisualization({ jsonData }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  useEffect(() => {
    if (jsonData) {
      const { nodes: newNodes, edges: newEdges } = jsonToNodes(jsonData);
      setNodes(newNodes);
      setEdges(newEdges);
    }
  }, [jsonData, setNodes, setEdges]);

  return (
    <div className="tree-visualization">
      <h2 className="section-title">
        Tree Visualization
      </h2>
      <div style={{ height: 'calc(100% - 60px)' }}>
        {jsonData ? (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        ) : (
          <div className="placeholder-content">
            Enter JSON data and click "Generate Tree" to visualize
          </div>
        )}
      </div>
    </div>
  );
}

export default TreeVisualization;