import React, { useState } from 'react';
import { useFormik, FormikProps } from 'formik';

import { makeStyles } from 'tss-react/mui';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Collapse from '@mui/material/Collapse';

import Edit from '../edit';

import NodeShape from './NodeShape';
import schema from './schema';


const useStyles = makeStyles()(({ spacing, palette, shadows }) => ({
  root: {
    width: spacing(42),
    height: 'fit-content',
    borderWidth: 1,
    borderColor: palette.primary.light,
    borderStyle: 'solid',
    borderRadius: spacing(1),
    borderCollapse: 'inherit',
    padding: spacing(0.25),
    boxShadow: shadows[5],
    margin: spacing(4),
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
  const initialValues: NodeShape = {
    id,
    firstName,
    lastName,
    title,
    department,
    phone,
    email,
    expanded,
    depth,
  };
  const formik: FormikProps<NodeShape> = useFormik<NodeShape>({
    initialValues,
    validationSchema: schema,
    onSubmit: values => {},
  });

  const { setFieldValue, values } = formik;

  return (
    <Table
      className={classes.root}
      onClick={() => setIsExpanded(!isExpanded)}
      onDoubleClick={() => console.log('AAA', id)}
    >
      <TableHead>
        <TableRow hover className={classes.row}>
          <TableCell padding="none" className={cx(classes.cell, classes.label)}>First Name</TableCell>
          <TableCell padding="none" className={cx(classes.cell, classes.info)}>
            <Edit
              name="firstName"
              value={values.firstName}
              error={Boolean(formik.touched.firstName && formik.errors.firstName)}
              helper={formik.errors.firstName}
              change={setFieldValue}
            />
          </TableCell>
        </TableRow>
        <TableRow hover className={classes.row}>
          <TableCell padding="none" className={cx(classes.cell, classes.label)}>Last Name</TableCell>
          <TableCell padding="none" className={cx(classes.cell, classes.info)}>
            <Edit
              name="lastName"
              value={values.lastName}
              error={Boolean(formik.touched.lastName && formik.errors.lastName)}
              helper={formik.errors.lastName}
              change={setFieldValue}
            />
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell colSpan={2} padding="none">
            <Collapse in={isExpanded}>
              <Table>
                <TableBody>
                  <TableRow hover className={classes.row}>
                    <TableCell padding="none" className={cx(classes.cell, classes.label)}>ID</TableCell>
                    <TableCell padding="none" className={cx(classes.cell, classes.info)}>
                      <Edit
                        name="id"
                        value={values.id}
                        error={Boolean(formik.touched.id && formik.errors.id)}
                        helper={formik.errors.id}
                        change={setFieldValue}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow hover className={classes.row}>
                    <TableCell padding="none" className={cx(classes.cell, classes.label)}>Title</TableCell>
                    <TableCell padding="none" className={cx(classes.cell, classes.info)}>
                      <Edit
                        name="title"
                        value={values.title}
                        error={Boolean(formik.touched.title && formik.errors.title)}
                        helper={formik.errors.title}
                        change={setFieldValue}
                      />
                    </TableCell>
                  </TableRow>
                  {department && (
                    <TableRow hover className={classes.row}>
                      <TableCell padding="none" className={cx(classes.cell, classes.label)}>Department</TableCell>
                      <TableCell padding="none" className={cx(classes.cell, classes.info)}>
                        <Edit
                          name="department"
                          value={values.department}
                          error={Boolean(formik.touched.department && formik.errors.department)}
                          helper={formik.errors.department}
                          change={setFieldValue}
                        />
                      </TableCell>
                    </TableRow>
                  )}
                  {phone && (
                    <TableRow hover className={classes.row}>
                      <TableCell padding="none" className={cx(classes.cell, classes.label)}>Phone</TableCell>
                      <TableCell padding="none" className={cx(classes.cell, classes.info)}>
                        <Edit
                          name="phone"
                          value={values.phone}
                          error={Boolean(formik.touched.phone && formik.errors.phone)}
                          helper={formik.errors.phone}
                          change={setFieldValue}
                        />
                      </TableCell>
                    </TableRow>
                  )}
                  <TableRow hover className={classes.row}>
                    <TableCell padding="none" className={cx(classes.cell, classes.label)}>Email</TableCell>
                    <TableCell padding="none" className={cx(classes.cell, classes.info)}>
                      <Edit
                        name="email"
                        value={values.email}
                        error={Boolean(formik.touched.email && formik.errors.email)}
                        helper={formik.errors.email}
                        change={setFieldValue}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow hover className={classes.row}>
                    <TableCell padding="none" className={cx(classes.cell, classes.label)}>Depth</TableCell>
                    <TableCell padding="none" className={cx(classes.cell, classes.info)}>{depth}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default Node;
