import React, { useState, useCallback, useEffect } from 'react'

import Tree from '../tree';
import { NodeShape } from '../node';
import { TreeShape } from '../tree';
import FamilyTree from './FamilyTree';


const App = () => {
  const [nodes, setNodes] = useState<NodeShape[]>(FamilyTree.nodes);
  const [tree, setTree] = useState<TreeShape>(FamilyTree.tree);
  const [lastId, setLastId] = useState<number>(FamilyTree.index);

  const setNodesCallback = useCallback((value: NodeShape[]) => setNodes(value), [nodes]);
  const setTreeCallback = useCallback((value: TreeShape) => setTree(value), [tree]);
  const setLastIdCallback = useCallback((value: number) => setLastId(value), [lastId]);

  useEffect(() => {}, [nodes, tree, lastId]);

  return (
    <Tree
      nodes={nodes}
      tree={tree}
      treeBr={tree}
      setNodes={setNodesCallback}
      setTree={setTreeCallback}
      setLastId={setLastIdCallback}
      lastId={lastId}
    />
  );
};

export default App;
