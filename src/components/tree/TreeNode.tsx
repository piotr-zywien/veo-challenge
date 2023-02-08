import React from 'react';

import { makeStyles } from 'tss-react/mui';
import TableCell from '@mui/material/TableCell';

import Node, { NodeShape } from '../node';
import TreeShape from './TreeShape';
import { getNode, collapseNodes, deleteNode } from './utils';

const useStyles = makeStyles()(({ spacing }) => ({
  cell: {
    border: 'none',
  },
}));

const TreeNode: React.FC<{
  id: number,
  nodes: NodeShape[],
  setNodes: (value: NodeShape[]) => void,
  tree: TreeShape,
  depth: number,
  wrapInCell?: boolean | false,
  isLeaf?: boolean | false,
}> = ({
  id,
  nodes,
  setNodes,
  tree,
  depth,
  wrapInCell,
  isLeaf,
}) => {
  const { classes, cx } = useStyles();
  const node = getNode(id, nodes);
  if (!node) return null;

  const onCollapse = () => setNodes(
    [...collapseNodes(
      id,
      nodes,
      tree,
    )],
  );
  const onDelete = () => setNodes(
    [...deleteNode(
      id,
      nodes,
    )],
  );
  const {
    firstName,
    lastName,
    title,
    department,
    phone,
    email,
    expanded,
  } = node;

  const nodeContent = (
    <Node
      id={id}
      firstName={firstName}
      lastName={lastName}
      title={title}
      department={department}
      phone={phone}
      email={email}
      expanded={expanded}
      depth={depth}
      onCollapse={onCollapse}
      onDelete={onDelete}
      isLeaf={isLeaf}
    />
  );

  if (depth === 0) {
    return wrapInCell ?(
      <TableCell
        padding="none"
        className={classes.cell}
      >
        {nodeContent}
      </TableCell>
    ) : nodeContent;
  }

  return wrapInCell ? (
    <TableCell
      padding="none"
      className={classes.cell}
    >
      {nodeContent}
    </TableCell>
  ) : nodeContent;
};

export default TreeNode;
