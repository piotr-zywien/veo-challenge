import React from 'react';

import { makeStyles } from 'tss-react/mui';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import Node, { NodeShape } from '../node';

import TreeShape from './TreeShape';
import { isLeaf, getNode } from './utils';


const useStyles = makeStyles()(({ spacing, palette }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexFlow: 'column',
  },
  branchCell: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'red',
  },
  children: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: 'fit-content',
  },
}));

const Tree: React.FC<{
  nodes: NodeShape[],
  tree: TreeShape,
  depth?: number,
  index?: number,
}> = ({
  nodes,
  tree,
  depth = 0,
  index = 0,
}) => {
  const { cx, classes } = useStyles();

  const getNodeComponent = (
    id: number,
    nodes: NodeShape[],
    depth: number,
  ) => {
    const node = getNode(id, nodes);
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
        <TableCell padding="none">
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
          />
        </TableCell>
      );
    }

    return (
      <TableCell padding="none">
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
          <TableCell padding="none" colSpan={children.length}>
            {getNodeComponent(
              id,
              nodes,
              depth,
            )}
          </TableCell>
        </TableRow>
        <TableRow className={classes.children}>
          {children.map((child, index) => (
            <Tree
              nodes={nodes}
              tree={child}
              depth={depth + 1}
            />
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default Tree;
