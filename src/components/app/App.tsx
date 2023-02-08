import React from 'react'

import Typography from '@mui/material/Typography';

import Tree from '../tree';
import FamilyTree from './FamilyTree';


const App = () => (
  <>
    <Typography
      variant="h5"
      gutterBottom
    >
      Veo's Frontend Coding Challenge
    </Typography>
    <Tree
      nodes={FamilyTree.nodes}
      tree={FamilyTree.tree}
    />
  </>
);

export default App;
