import React, { useState } from 'react';

import { makeStyles } from 'tss-react/mui';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Grow from '@mui/material/Grow';

import { NodeShape } from '../node';
import TreeNode from './TreeNode';
import TreeChildren from './TreeChildren';
import TreeShape from './TreeShape';
import { isLeaf } from './utils';


const Tree: React.FC<{
  nodes: NodeShape[],
  tree: TreeShape,
  treeBr: TreeShape,
  setNodes: (value: NodeShape[]) => void,
  setTree: (value: TreeShape) => void,
  setLastId: (value: number) => void,
  lastId: number,
  depth?: number,
  onSave: () => void,
}> = ({
  nodes,
  tree,
  treeBr,
  setNodes,
  setTree,
  setLastId,
  lastId,
  depth = 0,
  onSave,
}) => {
  const { id, children } = treeBr;
  const [show, setShow] = useState<boolean>(false);

  if (isLeaf(treeBr)) return (
    <TreeNode
      id={id}
      nodes={nodes}
      tree={tree}
      treeBr={treeBr}
      setNodes={setNodes}
      setTree={setTree}
      setLastId={setLastId}
      lastId={lastId}
      depth={depth}
      onSave={onSave}
      isLeaf
    />
  );

  return (
    <Grow in={show}>
      <Table>
        <TableBody>
          <TableRow>
            <TreeNode
              id={id}
              nodes={nodes}
              tree={tree}
              treeBr={treeBr}
              setNodes={setNodes}
              setTree={setTree}
              setLastId={setLastId}
              lastId={lastId}
              depth={depth}
              onSave={onSave}
              wrapInCell
            />
          </TableRow>
          <TreeChildren
            children={children}
            nodes={nodes}
            tree={tree}
            treeBr={treeBr}
            setNodes={setNodes}
            setTree={setTree}
            setLastId={setLastId}
            lastId={lastId}
            setShow={setShow}
            depth={depth}
            onSave={onSave}
          />
        </TableBody>
      </Table>
    </Grow>
  );
};

export default Tree;
