import React, { useState } from 'react';

import { makeStyles } from 'tss-react/mui';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Collapse from '@mui/material/Collapse';

import NodeShape from './NodeShape';


const useStyles = makeStyles()(({ spacing, palette, shadows }) => ({
  root: {
    width: spacing(41),
    height: 'fit-content',
    borderWidth: 1,
    borderColor: palette.primary.light,
    borderStyle: 'solid',
    borderRadius: spacing(1),
    borderCollapse: 'inherit',
    padding: spacing(0.25),
    boxShadow: shadows[5],
  },
  row: {
    '&:last-child td, &:last-child th': {
      border: 'none',
    },
  },
  cell: {
    maxWidth: spacing(21),
    width: spacing(21),
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    padding: spacing(1),
  },
  label: {
    color: palette.primary.main,
  },
  info: {
    fontWeight: 'bold',
  },
  collapseTable: {
    borderRadius: 'inherit',
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
  expanded,
  depth,
}: NodeShape ) => {
  const [isExpanded, setIsExpanded] = useState(expanded)
  const { cx, classes, theme } = useStyles();
  return (
    <Table
      className={classes.root}
      onClick={() => setIsExpanded(!isExpanded)}
      onDoubleClick={() => console.log('AAA', id)}
    >
      <TableHead>
        <TableRow className={classes.row}>
          <TableCell padding="none" className={cx(classes.cell, classes.label)}>First Name</TableCell>
          <TableCell padding="none" className={cx(classes.cell, classes.info)}>{firstName}</TableCell>
        </TableRow>
        <TableRow className={classes.row}>
          <TableCell padding="none" className={cx(classes.cell, classes.label)}>Last Name</TableCell>
          <TableCell padding="none" className={cx(classes.cell, classes.info)}>{lastName}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell colSpan={2} padding="none">
            <Collapse in={isExpanded}>
              <Table>
                <TableRow className={classes.row}>
                  <TableCell padding="none" className={cx(classes.cell, classes.label)}>ID</TableCell>
                  <TableCell padding="none" className={cx(classes.cell, classes.info)}>{id}</TableCell>
                </TableRow>
                <TableRow className={classes.row}>
                  <TableCell padding="none" className={cx(classes.cell, classes.label)}>Title</TableCell>
                  <TableCell padding="none" className={cx(classes.cell, classes.info)}>{title}</TableCell>
                </TableRow>
                {department && (
                  <TableRow className={classes.row}>
                    <TableCell padding="none" className={cx(classes.cell, classes.label)}>Department</TableCell>
                    <TableCell padding="none" className={cx(classes.cell, classes.info)}>{department}</TableCell>
                  </TableRow>
                )}
                {phone && (
                  <TableRow className={classes.row}>
                    <TableCell padding="none" className={cx(classes.cell, classes.label)}>Phone</TableCell>
                    <TableCell padding="none" className={cx(classes.cell, classes.info)}>{phone}</TableCell>
                  </TableRow>
                )}
                <TableRow className={classes.row}>
                  <TableCell padding="none" className={cx(classes.cell, classes.label)}>Email</TableCell>
                  <TableCell padding="none" className={cx(classes.cell, classes.info)}>{email}</TableCell>
                </TableRow>
                <TableRow className={classes.row}>
                  <TableCell padding="none" className={cx(classes.cell, classes.label)}>Depth</TableCell>
                  <TableCell padding="none" className={cx(classes.cell, classes.info)}>{depth}</TableCell>
                </TableRow>
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default Node;
