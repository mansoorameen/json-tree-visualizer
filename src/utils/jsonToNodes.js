export function jsonToNodes(jsonData) {
  const nodes = [];
  const edges = [];
  let nodeId = 0;

  function createNode(data, key, parentId = null, x = 0, y = 0) {
    const currentId = nodeId++;
    
    if (data === null) {
      nodes.push({
        id: currentId.toString(),
        position: { x, y },
        data: { label: `${key}: null` },
        style: { background: '#fb923c', color: 'white' }
      });
    } else if (typeof data === 'object' && Array.isArray(data)) {
      nodes.push({
        id: currentId.toString(),
        position: { x, y },
        data: { label: key || 'Array' },
        style: { background: '#22c55e', color: 'white' }
      });
      
      data.forEach((item, index) => {
        const childY = y + 100;
        const childX = x + (index - data.length / 2) * 150;
        const childId = createNode(item, `[${index}]`, currentId, childX, childY);
        edges.push({
          id: `${currentId}-${childId}`,
          source: currentId.toString(),
          target: childId.toString()
        });
      });
    } else if (typeof data === 'object') {
      nodes.push({
        id: currentId.toString(),
        position: { x, y },
        data: { label: key || 'Object' },
        style: { background: '#3b82f6', color: 'white' }
      });
      
      const keys = Object.keys(data);
      keys.forEach((objKey, index) => {
        const childY = y + 100;
        const childX = x + (index - keys.length / 2) * 150;
        const childId = createNode(data[objKey], objKey, currentId, childX, childY);
        edges.push({
          id: `${currentId}-${childId}`,
          source: currentId.toString(),
          target: childId.toString()
        });
      });
    } else {
      nodes.push({
        id: currentId.toString(),
        position: { x, y },
        data: { label: `${key}: ${JSON.stringify(data)}` },
        style: { background: '#fb923c', color: 'white' }
      });
    }
    
    return currentId;
  }

  createNode(jsonData, 'root', null, 0, 0);
  return { nodes, edges };
}