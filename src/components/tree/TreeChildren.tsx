import React, { useState, useEffect, useRef } from 'react';

import { makeStyles } from 'tss-react/mui';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { NodeShape } from '../node';
import Tree from './Tree';
import TreeShape from './TreeShape';


const useStyles = makeStyles()(({ spacing, palette }) => ({
  children: {
    display: 'block',
  },
  line: {
    height: 0,
    borderWidth: spacing(0.5),
    borderColor: palette.primary.main,
    borderStyle: 'solid',
  },
  cell: {
    border: 'none',
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
  setNodes: (value: NodeShape[]) => void,
  depth?: number,
}> = ({
  children,
  nodes,
  tree,
  setNodes,
  depth,
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

  const getPoints = (ref: React.RefObject<HTMLElement>) => {
    const element = ref.current;
    const parent = element.parentElement;
    const x = element && (element.offsetLeft + element.offsetWidth / 2);
    const p = parent && parent.offsetLeft;
    return { x, p };
  }

  useEffect(() => {
    if (fromRef) {
      setFrom(getPoints(fromRef));
    }
  }, [fromRef])
  useEffect(() => {
    if (toRef) {
      setTo(getPoints(toRef));
    }
  }, [toRef]);
  useEffect(() => {
    if (from && to) {
      setMargin(from.x - from.p)
      setWidth(to.x - from.x);
    }
  }, [
    from,
    to,
  ]);

  return (
    <>
      <TableRow className={cx(classes.hidden, {
        [classes.shown]: margin !== null && width !== null,
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
      <TableRow className={cx(classes.children, classes.hidden, {
        [classes.shown]: margin !== null && width !== null,
      })}>
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
                tree={child}
                setNodes={setNodes}
                depth={depth + 1}
              />
            </TableCell>
          );
        })}
      </TableRow>
    </>
  );
};

export default TreeChildren;
