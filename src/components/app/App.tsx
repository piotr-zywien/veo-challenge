import React from 'react'

import Node from '../node';

const App = () => (
  <>
    <h1>Veo's Frontend Coding Challenge</h1>
    <Node
      id={0}
      firstName="Piotr"
      lastName="Żywień"
      title="Frontend/FullStack Engineer"
      department="SAS Frontend Team"
      email="piotr.zywien@gmail.com"
      depth={0}
      expanded={true}
    />
  </>
);

export default App;
