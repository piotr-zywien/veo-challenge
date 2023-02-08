import React from 'react'

import { makeStyles } from 'tss-react/mui';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import NodeShape from './NodeShape';


const useStyles = makeStyles()(({ spacing, palette, shadows }) => ({
  root: {
    maxWidth: spacing(2),
    maxHeight: spacing(3),
    borderWidth: 1,
    borderColor: palette.primary.light,
    borderStyle: 'solid',
    borderRadius: spacing(1),
    borderCollapse: 'inherit',
    padding: spacing(1),
    boxShadow: shadows[5],
  },
  row: {
    '&:last-child td, &:last-child th': {
      border: 'none',
    },
  },
  cell: {
    fontSize: 10,
  },
  label: {
    color: palette.primary.main,
  },
  info: {
    fontWeight: 'bold',
  },
}));

const Node: React.FC<NodeShape> = ({
  id,
  firstName,
  lastName,
  title,
  department,
  phone,
  email,
  depth,
}: NodeShape ) => {
  const { cx, classes, theme } = useStyles();
  console.log(theme);
  return (
    <Table className={classes.root}>
      <TableBody>
        <TableRow className={classes.row}>
          <TableCell className={cx(classes.cell, classes.label)}>ID</TableCell>
          <TableCell className={cx(classes.cell, classes.info)}>{id}</TableCell>
        </TableRow>
        <TableRow className={classes.row}>
          <TableCell className={cx(classes.cell, classes.label)}>First Name</TableCell>
          <TableCell className={cx(classes.cell, classes.info)}>{firstName}</TableCell>
        </TableRow>
        <TableRow className={classes.row}>
          <TableCell className={cx(classes.cell, classes.label)}>Last Name</TableCell>
          <TableCell className={cx(classes.cell, classes.info)}>{lastName}</TableCell>
        </TableRow>
        <TableRow className={classes.row}>
          <TableCell className={cx(classes.cell, classes.label)}>Title</TableCell>
          <TableCell className={cx(classes.cell, classes.info)}>{title}</TableCell>
        </TableRow>
        {department && (
          <TableRow className={classes.row}>
            <TableCell className={cx(classes.cell, classes.label)}>Department</TableCell>
            <TableCell className={cx(classes.cell, classes.info)}>{department}</TableCell>
          </TableRow>
        )}
        {phone && (
          <TableRow className={classes.row}>
            <TableCell className={cx(classes.cell, classes.label)}>Phone</TableCell>
            <TableCell className={cx(classes.cell, classes.info)}>{phone}</TableCell>
          </TableRow>
        )}
        <TableRow className={classes.row}>
          <TableCell className={cx(classes.cell, classes.label)}>Email</TableCell>
          <TableCell className={cx(classes.cell, classes.info)}>{email}</TableCell>
        </TableRow>
        <TableRow className={classes.row}>
          <TableCell className={cx(classes.cell, classes.label)}>Depth</TableCell>
          <TableCell className={cx(classes.cell, classes.info)}>{depth}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default Node;
