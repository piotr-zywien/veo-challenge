import { NodeShape } from '../node';

interface TreeShape {
  id: number,
  children?: TreeShape[],
}

export default TreeShape;
