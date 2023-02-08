import React from 'react'

import Typography from '@mui/material/Typography';

import Tree from '../tree';


const App = () => (
  <>
    <Typography
      variant="h5"
      gutterBottom
    >
      Veo's Frontend Coding Challenge
    </Typography>
    <Tree
      nodes={[
        {
          id: 0,
          firstName: 'Piotr',
          lastName: 'Żywień',
          title: 'Frontend/FullStack Engineer',
          department: 'SAS Frontend Team',
          email: 'piotr.zywien@gmail.com',
          expanded: true,
        },
        {
          id: 1,
          firstName: 'Michał',
          lastName: 'Żywień',
          title: 'Backend/FullStack Engineer',
          department: 'SAS Frontend Team',
          email: 'michal.zywien@gmail.com',
          expanded: true,
        },
        {
          id: 2,
          firstName: 'Ewa',
          lastName: 'Żywień',
          title: 'Backend/FullStack Engineer',
          department: 'SAS Frontend Team',
          email: 'ewa.zywien@gmail.com',
          expanded: true,
        },
        {
          id: 3,
          firstName: 'Andrzej',
          lastName: 'Żywień',
          title: 'Backend/FullStack Engineer',
          department: 'SAS Frontend Team',
          email: 'andrzej.zywien@gmail.com',
          expanded: true,
        },
        {
          id: 4,
          firstName: 'Maria',
          lastName: 'Strehl',
          title: 'Backend/FullStack Engineer',
          department: 'SAS Frontend Team',
          email: 'maria.strehl@gmail.com',
          expanded: false,
        },
      ]}
      tree={{
        id: 0,
        children: [
          {
            id: 1,
          },
          {
            id: 2,
            children: [
              {
                id: 3,
              },
            ],
          },
          {
            id: 4,
          },
        ],
      }}
    />
  </>
);

export default App;
