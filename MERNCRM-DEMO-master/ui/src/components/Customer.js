import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import customerService from '../services/customer.services'
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AddCustomer from './AddCustomer'
import AddCircleIcon from '@material-ui/icons/AddCircle';


const columns = [
  { id: 'first_name', label: 'First Name', minWidth: 170 },
  { id: 'last_name', label: 'Last Name', minWidth: 100 },
  {
    id: 'email',
    label: 'Email',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'mobile',
    label: 'Mobile',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2)
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'membership',
    label: 'Membership',
    minWidth: 170,
    align: 'right'
    
  },
];

// function createData(product_id,product_name,category,price,stock) {
// //   const density = population / size;
// //   return { name, code, population, size, density };
// }



const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  icon:{
    marginLeft:'95%',
    fontSize:'50px'
  }
});

export default function Customer() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows,setRows]=useState([])
  const [open, setOpen] = React.useState(false);

  useEffect(()=>{
      getAllCustomers()
  },[])

      const getAllCustomers=()=>{
        customerService.getAllCustomerList()
      .then((res)=>{
        console.log(res)
        if(res.data.status==1){
          console.log(res.data)
          setRows(res.data.result)
        }else{
          console.log("customers not available")
        }
      }).catch((err)=>{
        console.log(err)
      })
      }
    

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const addCustomer=()=>{
    setOpen(true);
  }
  const addClose=()=>{
    setOpen(false)
  };

  return (
    <div>
    <AddCircleIcon className={classes.icon} onClick={addCustomer}/> 
                 <Dialog
                     open={open}
                     onClose={addClose}
                     aria-labelledby="alert-dialog-title"
                     aria-describedby="alert-dialog-description"
                  >
                  <DialogTitle id="alert-dialog-title">{"Add Customer"}</DialogTitle>
                  <DialogContent>
                  <AddCustomer/>
                  </DialogContent>
                  </Dialog>
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    </div>
  );
}
