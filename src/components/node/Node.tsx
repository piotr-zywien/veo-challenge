import React from 'react';
import { useFormik, FormikProps } from 'formik';

import { makeStyles } from 'tss-react/mui';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import Edit from '../edit';

import NodeShape from './NodeShape';
import schema from './schema';


const useStyles = makeStyles()(({ spacing, palette, shadows }) => ({
  root: {
    paddingLeft: spacing(1),
    paddingRight: spacing(1),
  },
  branch: {
    borderWidth: spacing(0.5),
    borderColor: palette.primary.main,
    borderStyle: 'solid',
    width: 0,
    height: spacing(4),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  table: {
    position: 'sticky',
    width: spacing(42),
    height: 'fit-content',
    borderWidth: 1,
    borderColor: palette.primary.light,
    borderStyle: 'solid',
    borderRadius: spacing(1),
    borderCollapse: 'initial',
    padding: spacing(0.25),
    boxShadow: shadows[5],
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: palette.common.white,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  addButton: {
    color: palette.primary.light,
  },
  saveButton: {
    color: 'green',
  },
  deleteButton: {
    color: 'red',
  },
  lastRow: {
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
  dot: {
    position: 'absolute',
    backgroundColor: palette.primary.main,
    borderRadius: '50%',
    height: spacing(4),
    width: spacing(4),
  },
  topDot: {
    marginTop: spacing(-2.75),
    marginLeft: spacing(-2),
  },
  bottomDot: {
    marginTop: spacing(2.75),
    marginLeft: spacing(-2),
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
  onToggleSingle,
  onCollapse,
  onDelete,
  onAdd,
  isLeaf,
}: NodeShape ) => {
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

  const { setFieldValue, values, errors } = formik;

  return (
    <div className={classes.root}>
      {depth > 0 && (
        <div className={classes.branch} >
          <div className={cx(classes.dot, classes.topDot)} />
        </div>
      )}
      <Table
        className={classes.table}
        onClick={(event) => {
          event.stopPropagation();
          onToggleSingle();
        }}
        onDoubleClick={(event) => {
          event.stopPropagation();
          onCollapse();
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell padding="none" className={classes.cell}>
              <span className={classes.label}>ID </span>
              <span className={classes.info}>{values.id}</span>
            </TableCell>
            <TableCell padding="none" className={classes.cell}>
              <IconButton
                className={classes.addButton}
                onClick={(event) => {
                  event.stopPropagation();
                  onAdd();
                }}
              >
                <AddCircleIcon />
              </IconButton>
              <IconButton className={classes.saveButton}>
                <SaveIcon />
              </IconButton>
              <IconButton
                className={classes.deleteButton}
                onClick={(event) => {
                  event.stopPropagation();
                  onDelete();
                }}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell padding="none" className={cx(classes.cell, classes.label)}>First Name</TableCell>
            <TableCell padding="none" className={cx(classes.cell, classes.info)}>
              <Edit
                name="firstName"
                value={values.firstName}
                error={Boolean(errors.firstName)}
                helper={errors.firstName}
                onChange={setFieldValue}
              />
            </TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell padding="none" className={cx(classes.cell, classes.label)}>Last Name</TableCell>
            <TableCell padding="none" className={cx(classes.cell, classes.info)}>
              <Edit
                name="lastName"
                value={values.lastName}
                error={Boolean(errors.lastName)}
                helper={errors.lastName}
                onChange={setFieldValue}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell colSpan={2} padding="none">
              <Collapse in={expanded}>
                <Table>
                  <TableBody>
                    <TableRow hover>
                      <TableCell padding="none" className={cx(classes.cell, classes.label)}>Title</TableCell>
                      <TableCell padding="none" className={cx(classes.cell, classes.info)}>
                        <Edit
                          name="title"
                          value={values.title}
                          error={Boolean(errors.title)}
                          helper={errors.title}
                          onChange={setFieldValue}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell padding="none" className={cx(classes.cell, classes.label)}>Department</TableCell>
                      <TableCell padding="none" className={cx(classes.cell, classes.info)}>
                        <Edit
                          name="department"
                          value={values.department}
                          error={Boolean(errors.department)}
                          helper={errors.department}
                          onChange={setFieldValue}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell padding="none" className={cx(classes.cell, classes.label)}>Phone</TableCell>
                      <TableCell padding="none" className={cx(classes.cell, classes.info)}>
                        <Edit
                          name="phone"
                          value={values.phone}
                          error={Boolean(errors.phone)}
                          helper={errors.phone}
                          onChange={setFieldValue}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell padding="none" className={cx(classes.cell, classes.label)}>Email</TableCell>
                      <TableCell padding="none" className={cx(classes.cell, classes.info)}>
                        <Edit
                          name="email"
                          value={values.email}
                          error={Boolean(errors.email)}
                          helper={errors.email}
                          onChange={setFieldValue}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow hover className={classes.lastRow}>
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
      {!isLeaf && (
        <div className={classes.branch}>
          <div className={cx(classes.dot, classes.bottomDot)} />
        </div>
      )}
    </div>
  );
};

export default Node;
