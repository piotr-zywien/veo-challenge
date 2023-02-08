interface EditShape {
  name: string,
  value: any,
  onChange: (
    field: string,
    value: any,
    shouldValidate?: boolean,
  ) => void,
  error?: boolean,
  helper?: string,
}

export default EditShape;
