import { NodeShape } from '../node';

import TreeShape from './TreeShape';


export const isLeaf = (node: TreeShape) => {
  const { children } = node;
  return !Array.isArray(children) || children.length === 0;
};

export const getNode = (id: number, nodes: NodeShape[]) => nodes.find(node => node.id === id) || null;

export const getNodeIndexById = (id: number, nodes: NodeShape[]) => nodes.findIndex(node => node.id === id);

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
  const index = getNodeIndexById(id, nodes);
  nodes.splice(index, 1);
  return nodes;
}

export const toggleNode = (id: number, nodes: NodeShape[]) => {
  const index = getNodeIndexById(id, nodes);
  nodes[index].expanded = !nodes[index].expanded;
  return nodes;
}

export const deleteBranch = (id: number, tree: TreeShape) => {
  const { children } = tree;

  const $children: TreeShape[] = [];
  if (children) {
    children.forEach((child: TreeShape) => {
      if (tree.id !== id) {
        $children.push(deleteBranch(id, child));
      }
    });
  }

  return {
    ...tree,
    children: $children,
  };
};

export const newNode = (node: NodeShape) => {
  const { id } = node;

  return ({
    id,
  });
};

export const addChild = (id: number, node: NodeShape, tree: TreeShape) => {
  const { children } = tree;

  const $children: TreeShape[] = [];
  if (children) {
    if (tree.id === id) {
      $children.push(newNode(node));
    }
    children.forEach((child: TreeShape) => {
      $children.push(addChild(id, node, child));
    });
  }

  return {
    ...tree,
    children: $children,
  };
};

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
