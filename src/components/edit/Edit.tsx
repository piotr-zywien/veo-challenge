import React from 'react';

import TextField from '@mui/material/TextField';

import EditShape from './EditShape';


const Edit: React.FC<EditShape> = ({
  name,
  value,
  error,
  helper,
  change,
}) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;
    change(
      name,
      value,
      true,
    );
  };
  const onClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
  };
  return (
    <TextField
      name={name}
      value={value}
      helperText={helper}
      error={error}
      onChange={onChange}
      onClick={onClick}
    />
  );
};

export default Edit;
