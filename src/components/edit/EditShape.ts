interface EditShape {
  name: string,
  value: any,
  change: (
    field: string,
    value: any,
    shouldValidate?: boolean,
  ) => void,
  error?: boolean,
  helper?: string,
}

export default EditShape;
