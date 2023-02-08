import React, { useState, useCallback, useEffect } from 'react'

import Tree from '../tree';
import { NodeShape } from '../node';
import { TreeShape } from '../tree';
import FamilyTree from './FamilyTree';


const App = () => {
  const [nodes, setNodes] = useState<NodeShape[]>(FamilyTree.nodes);
  const [tree, setTree] = useState<TreeShape>(FamilyTree.tree);

  const setNodesCallback = useCallback((value: NodeShape[]) => setNodes(value), [nodes, tree]);
  const setTreeCallback = useCallback((value: TreeShape) => setTree(value), [nodes, tree]);

  useEffect(() => {}, [nodes, tree]);

  return (
    <Tree
      nodes={nodes}
      tree={tree}
      treeBr={tree}
      setNodes={setNodesCallback}
      setTree={setTreeCallback}
    />
  );
};

export default App;
