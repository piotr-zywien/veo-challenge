const EmptyNode = (id: number, depth: number) => ({
  id,
  firstName: '',
  lastName: '',
  title: '',
  department: '',
  phone: '',
  email: '',
  depth,
  expanded: false,
});

export default EmptyNode;
