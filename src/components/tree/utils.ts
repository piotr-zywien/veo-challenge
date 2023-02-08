import { NodeShape } from '../node';

import TreeShape from './TreeShape';


export const isLeaf = (node: TreeShape) => {
  const { children } = node;
  return !Array.isArray(children) || children.length === 0;
};

export const getNode = (id: number, nodes: NodeShape[]) => nodes.find(node => node.id === id);
