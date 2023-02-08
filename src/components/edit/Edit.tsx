import React from 'react';

import { makeStyles } from 'tss-react/mui';
import TextField from '@mui/material/TextField';

import EditShape from './EditShape';


const useStyles = makeStyles()(({ spacing }) => ({
  root: {
    width: spacing(18),
  },
}));

const Edit: React.FC<EditShape> = ({
  name,
  value,
  error,
  helper,
  onChange,
}) => {
  const { classes } = useStyles();
  const $onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;
    onChange(
      name,
      value,
      true,
    );
  };
  const onClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <TextField
      className={classes.root}
      name={name}
      value={value}
      helperText={helper}
      error={error}
      onChange={$onChange}
      onClick={onClick}
    />
  );
};

export default Edit;
