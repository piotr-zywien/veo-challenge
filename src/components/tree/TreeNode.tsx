import React from 'react';

import { makeStyles } from 'tss-react/mui';
import TableCell from '@mui/material/TableCell';

import Node, { NodeShape, EmptyNode } from '../node';
import TreeShape from './TreeShape';
import {
  getNode,
  collapseNodes,
  deleteNode,
  deleteBranch,
  toggleNode,
  addChild,
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
  setLastId: (value: number) => void,
  lastId: number,
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
  setLastId,
  lastId,
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
      {...deleteBranch(
        id,
        tree,
      )},
    );
    setNodes([
      ...deleteNode(
        id,
        nodes,
    )]);
  };
  const onAdd = () => {
    const newId = lastId + 1;
    setLastId(newId);

    const newNode = EmptyNode(newId, depth);
    nodes.push(newNode);
    setNodes([
      ...nodes,
    ]);

    setTree({...addChild(
      id,
      newNode,
      tree,
    )});

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
      onAdd={onAdd}
      isLeaf={isLeaf}
    />
  );

  if (depth === 0) {
    return wrapInCell ? (
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
