import React from 'react';

import { makeStyles } from 'tss-react/mui';

import Node, { NodeShape } from '../node';

import TreeShape from './TreeShape';
import { isLeaf, getNode } from './utils';


const useStyles = makeStyles()(({ spacing, palette }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexFlow: 'column',
  },
  children: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    flexDirection: 'row',
    flexFlow: 'row',
    borderTopWidth: spacing(0.25),
    borderTopStyle: 'solid',
    borderTopColor: palette.secondary.main,
  },
  branchVerticalContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexFlow: 'column',
    width: 'fit-content',
  },
  branchVertical: {
    display: 'flex',
    borderLeftWidth: spacing(0.25),
    borderLeftStyle: 'solid',
    borderLeftColor: palette.secondary.main,
    height: spacing(4),
    width: 0,
    marginLeft: spacing(14),
  },
}));

const Tree: React.FC<{
  nodes: NodeShape[],
  tree: TreeShape,
  depth?: number,
}> = ({
  nodes,
  tree,
  depth = 0,
}) => {
  const { classes } = useStyles();

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
      );
    }

    return (
      <div className={classes.branchVerticalContainer}>
        <div className={classes.branchVertical} />
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
      </div>
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
    <div className={classes.root}>
      {getNodeComponent(
        id,
        nodes,
        depth,
      )}
      <div className={classes.branchVerticalContainer}>
        <div className={classes.branchVertical} />
        <div className={classes.children}>
          {children.map(child => (
            <Tree
              nodes={nodes}
              tree={child}
              depth={depth + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tree;
