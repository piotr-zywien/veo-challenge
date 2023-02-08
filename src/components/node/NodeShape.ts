interface NodeShape {
  id: number,
  firstName: string,
  lastName: string,
  title: string,
  department?: string,
  phone?: string,
  email: string,
  depth?: number,
  expanded: boolean,
}

export default NodeShape;
