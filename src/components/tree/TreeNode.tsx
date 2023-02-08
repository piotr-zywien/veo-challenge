import React from 'react';

import { makeStyles } from 'tss-react/mui';
import TableCell from '@mui/material/TableCell';

import Node, { NodeShape } from '../node';
import TreeShape from './TreeShape';
import {
  getNode,
  collapseNodes,
  deleteNode,
  deleteBranch,
  toggleNode,
} from './utils';

const useStyles = makeStyles()(({ spacing }) => ({
  cell: {
    border: 'none',
    verticalAlign: 'top',
  },
}));

const TreeNode: React.FC<{
  id: number,
  nodes: NodeShape[],
  tree: TreeShape,
  treeBr: TreeShape,
  setNodes: (value: NodeShape[]) => void,
  setTree: (value: TreeShape) => void,
  depth: number,
  wrapInCell?: boolean | false,
  isLeaf?: boolean | false,
}> = ({
  id,
  nodes,
  tree,
  treeBr,
  setNodes,
  setTree,
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
      treeBr,
    )],
  );
  const onToggleSingle = () => setNodes(
    [...toggleNode(
      id,
      nodes,
    )],
  );
  const onDelete = () => {
    setTree(
      structuredClone({...deleteBranch(
        id,
        tree,
      )}),
    );
    setNodes(
      [...deleteNode(
        id,
        nodes,
      )],
    );
  };

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
      onToggleSingle={onToggleSingle}
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
