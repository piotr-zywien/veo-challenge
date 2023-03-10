import React, { useState, useLayoutEffect, useRef, useCallback } from 'react';

import { makeStyles } from 'tss-react/mui';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { NodeShape } from '../node';
import Tree from './Tree';
import TreeShape from './TreeShape';


const useStyles = makeStyles()(({ spacing, palette }) => ({
  children: {
    display: 'flex',
    justifyContent: 'center',
  },
  line: {
    height: 0,
    borderWidth: spacing(0.5),
    borderColor: palette.primary.main,
    borderStyle: 'solid',
  },
  cell: {
    border: 'none',
    verticalAlign: 'top',
  },
  hidden: {
    opacity: 0,
  },
  shown: {
    opacity: 1,
  },
}));

const TreeChildren: React.FC<{
  children: TreeShape[],
  nodes: NodeShape[],
  tree: TreeShape,
  treeBr: TreeShape
  setNodes: (value: NodeShape[]) => void,
  setTree: (value: TreeShape) => void,
  setLastId: (value: number) => void,
  lastId: number,
  setShow: (value: boolean) => void,
  depth?: number,
  onSave: () => void,
}> = ({
  children,
  nodes,
  tree,
  treeBr,
  setNodes,
  setTree,
  setLastId,
  lastId,
  setShow,
  depth,
  onSave,
}) => {
  const { cx, classes } = useStyles();
  const fromRef = useRef(null);
  const toRef = useRef(null);
  const [from, setFrom] = useState<{
    x: number,
    p: number,
  }>(null);
  const [to, setTo] = useState<{
    x: number,
    p: number,
  }>(null);
  const [margin, setMargin] = useState<number>(null);
  const [width, setWidth] = useState<number>(null);

  const getPoints = useCallback((ref: React.RefObject<HTMLElement>) => {
    const element = ref.current;
    const parent = element && element.parentElement;

    const x = element && (element.offsetLeft + element.offsetWidth / 2);
    const p = parent && parent.offsetLeft;

    return { x, p };
  }, [tree, treeBr]);

  useLayoutEffect(() => {
    if (fromRef) {
      setFrom(getPoints(fromRef));
    }
  }, [tree, treeBr, fromRef])
  useLayoutEffect(() => {
    if (toRef) {
      setTo(getPoints(toRef));
    }
  }, [tree, treeBr, toRef]);
  useLayoutEffect(() => {
    if (from && to) {
      setMargin(from.x - from.p)
      setWidth(to.x - from.x);
      setShow(margin !== null && width !== null);
    }
  }, [
    tree,
    treeBr,
    from,
    to,
    margin,
    width,
  ]);

  if (!children || children.length < 1) return null;

  return (
    <>
      <TableRow className={cx(classes.hidden, {
        [classes.shown]: children.length > 1,
      })}>
        <TableCell
          padding="none"
          className={classes.cell}
          colSpan={children.length}
        >
          <div
            className={classes.line}
            style={{
              marginLeft: margin,
              width,
            }}
          />
        </TableCell>
      </TableRow>
      <TableRow className={classes.children}>
        {children.map((child, index) => {
          let ref = undefined;
          if (index === 0) {
            ref = fromRef;
          }
          if (index === children.length - 1) {
            ref = toRef;
          }
          return (
            <TableCell
              ref={ref}
              padding="none"
              className={classes.cell}
            >
              <Tree
                nodes={nodes}
                tree={tree}
                treeBr={child}
                setNodes={setNodes}
                setTree={setTree}
                setLastId={setLastId}
                lastId={lastId}
                depth={depth + 1}
                onSave={onSave}
              />
            </TableCell>
          );
        })}
      </TableRow>
    </>
  );
};

export default TreeChildren;
