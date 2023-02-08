import React from 'react';

import { makeStyles } from 'tss-react/mui';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import Node, { NodeShape } from '../node';

import TreeShape from './TreeShape';
import { isLeaf, getNode, collapseNodes } from './utils';


const useStyles = makeStyles()(({ spacing, palette }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexFlow: 'column',
  },
  branch: {
    borderWidth: spacing(0.25),
    borderStyle: 'solid',
    borderColor: palette.primary.main,
  },
  horizontal: {
    height: 0,
    width: 'auto',
    marginLeft: spacing(25),
    marginRight: spacing(25),
  },
  vertical: {
    width: 0,
    height: spacing(8),
    marginLeft: spacing(25),
  },
  children: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: 'fit-content',
  },
  cell: {
    border: 'none',
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

  const getNodeComponent = (
    id: number,
    nodes: NodeShape[],
    depth: number,
  ) => {
    const node = getNode(id, nodes);
    const collapse = () => setNodes(
      [...collapseNodes(
        id,
        nodes,
        tree,
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

    if (depth === 0) {
      return (
        <TableCell
          padding="none"
          className={classes.cell}
        >
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
            collapse={collapse}
          />
        </TableCell>
      );
    }

    return (
      <TableCell
        padding="none"
        className={classes.cell}
      >
        <div className={cx(classes.branch, classes.vertical)} />
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
          collapse={collapse}
        />
      </TableCell>
    );
  };

  const { id, children } = tree;

  if (isLeaf(tree)) {
    return getNodeComponent(
      id,
      nodes,
      depth,
    );
  }

  return (
    <Table>
      <TableBody>
        <TableRow>
          {getNodeComponent(
            id,
            nodes,
            depth,
          )}
        </TableRow>
        <TableRow>
          <TableCell
            padding="none"
            className={classes.cell}
          >
            <div className={cx(classes.branch, classes.vertical)} />
            <div className={cx(classes.branch, classes.horizontal)} />
          </TableCell>
        </TableRow>
        <TableRow className={classes.children}>
          {children.map((child) => (
            <Tree
              nodes={nodes}
              tree={child}
              setNodes={setNodes}
              depth={depth + 1}
            />
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default Tree;
