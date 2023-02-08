import React, { useState } from 'react'

import Tree from '../tree';
import { NodeShape } from '../node';
import FamilyTree from './FamilyTree';


const App = () => {
  const [nodes, setNodes] = useState<NodeShape[]>(FamilyTree.nodes);

  return (
    <Tree
      nodes={nodes}
      tree={FamilyTree.tree}
      setNodes={setNodes}
    />
  );
};

export default App;
