import React, { useState, useCallback, useEffect } from 'react'

import Requests from '../../requests';
import Tree from '../tree';
import { NodeShape, EmptyNode } from '../node';
import { TreeShape } from '../tree';
import FamilyTree from './FamilyTree';


const App = () => {
  const [lastId, setLastId] = useState<number>(0);
  const [nodes, setNodes] = useState<NodeShape[]>([EmptyNode(lastId, 0)]);
  const [tree, setTree] = useState<TreeShape>({ id: lastId });

  const setNodesCallback = useCallback((value: NodeShape[]) => setNodes(value), [lastId, nodes, tree]);
  const setTreeCallback = useCallback((value: TreeShape) => setTree(value), [lastId, nodes, tree]);
  const setLastIdCallback = useCallback((value: number) => setLastId(value), [lastId, nodes, tree]);

  useEffect(() => {
    Promise.all([
      Requests.getIndex(),
      Requests.getNodes(),
      Requests.getTree(),
    ]).then(([
      index,
      nodes,
      tree,
    ]) => {
      setLastId(index);
      setNodesCallback([...nodes]);
      setTreeCallback({...tree});
    });
  }, []);

  // Requests.save({
  //   index: lastId,
  //   nodes,
  //   tree,
  // });

  // if (lastId === null || nodes === null || tree === null) return null;
console.log(lastId, nodes, tree);
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
