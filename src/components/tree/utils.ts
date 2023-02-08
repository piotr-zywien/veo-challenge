import { NodeShape } from '../node';

import TreeShape from './TreeShape';


export const isLeaf = (node: TreeShape) => {
  const { children } = node;
  return !Array.isArray(children) || children.length === 0;
};

export const getNode = (id: number, nodes: NodeShape[]) => nodes.find(node => node.id === id) || null;

export const getNodeId = (id: number, nodes: NodeShape[]) => nodes.findIndex(node => node.id === id);

export const searchTree = (id: number, tree: TreeShape) => {
  if (tree.id === id) {
    return tree;
  } else if (tree.children) {
    let result = null;
    tree.children.forEach(child => {
      result = searchTree(id, child);
    });
    return result;
  }
  return null;
};

export const deleteNode = (id: number, nodes: NodeShape[]) => {
  const index = nodes.findIndex((child) => child.id === id);
  nodes.splice(index, 1);
  return nodes;
}

export const getIds = (tree: TreeShape, ids: number[]) => {
  const { id, children } = tree;
  ids.push(id);
  if (isLeaf(tree)) return ids;
  children.map(child => getIds(child, ids));
  return ids;
};

export const getUnique = (
  value: any,
  index: number,
  array: number[],
) => array.indexOf(value) === index;

export const collapseNodes = (
  id: number,
  nodes: NodeShape[],
  tree: TreeShape,
) => {
  const subTree = searchTree(id, tree);
  const subIds = getIds(tree, []);
  const uniqueSubIds = subIds.filter(getUnique);
  const clicked = getNode(uniqueSubIds[0], nodes);
  const expanded = !clicked.expanded;

  const $nodes = nodes;
  $nodes.forEach(node => {
    const { id: $id } = node;
    if (uniqueSubIds.includes($id)) {
      node.expanded = expanded;
    }
  });

  return $nodes;
};
