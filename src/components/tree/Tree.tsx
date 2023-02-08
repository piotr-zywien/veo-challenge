import React from 'react';

import { makeStyles } from 'tss-react/mui';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';

import { NodeShape } from '../node';
import TreeNode from './TreeNode';
import TreeChildren from './TreeChildren';
import TreeShape from './TreeShape';
import { isLeaf } from './utils';


const useStyles = makeStyles()(({ spacing }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexFlow: 'column',
  },
}));

const Tree: React.FC<{
  nodes: NodeShape[],
  tree: TreeShape,
  setNodes: (value: NodeShape[]) => void,
  depth?: number,
}> = ({
  nodes,
  tree,
  setNodes,
  depth = 0,
}) => {
  const { cx, classes } = useStyles();
  const { id, children } = tree;

  if (isLeaf(tree)) return (
    <TreeNode
      id={id}
      nodes={nodes}
      setNodes={setNodes}
      tree={tree}
      depth={depth}
      isLeaf
    />
  );

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TreeNode
            id={id}
            nodes={nodes}
            setNodes={setNodes}
            tree={tree}
            depth={depth}
            wrapInCell
          />
        </TableRow>
        <TreeChildren
          children={children}
          nodes={nodes}
          tree={tree}
          setNodes={setNodes}
          depth={depth}
        />
      </TableBody>
    </Table>
  );
};

export default Tree;
