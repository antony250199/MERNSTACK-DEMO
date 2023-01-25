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
import orderService from '../services/order.services'
import { green } from '@material-ui/core/colors';
import SvgIcon from '@material-ui/core/SvgIcon';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddOrder from './AddOrder'

const columns = [
  { id: 'order_id', label: 'Order_id', minWidth: 170 },
  { id: 'quantity', label: 'Quantity_name', minWidth: 100 },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'customer',
    label: 'Customer',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2)
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'orderdate',
    label: 'Order Date',
    minWidth: 170,
    align: 'right'
    
  },
  {
    id: 'shippingdate',
    label: 'Shipping Date',
    minWidth: 170,
    align: 'right'
  },
  {
    id:'actions',
    label:'Actions'
  }

];

// function createData(product_id,product_name,category,price,stock) {
// //   const density = population / size;
// //   return { name, code, population, size, density };
// }



const useStyles = makeStyles((theme)=>({
  root: {
    width: '100%',
    color: theme.palette.text.primary,
  },
  '& > svg': {
    margin: theme.spacing(2),
  },
  container: {
    maxHeight: 440,
  },
  icon:{
    marginLeft:'95%',
    fontSize:'50px'
  },
  edit:{
    marginTop:'7px',
    padding:'5px'
    
  }
}));


export default function Order() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows,setRows]=useState([])
  const [open, setOpen] = React.useState(false);

  useEffect(()=>{
      getAllOrders()
      
  },[])

      const getAllOrders=()=>{
        orderService.getAllOrderList()
      .then((res)=>{
        console.log(res)
        if(res.data.status==1){
          console.log(res.data)
          setRows(res.data.result)
        }else{
          console.log("orders not available")
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
  const addOrder=()=>{
    setOpen(true);
  }
  const addClose=()=>{
    setOpen(false)
  };

  return (
    <div>
       <AddCircleIcon className={classes.icon} onClick={addOrder}/> 
                 <Dialog
                     open={open}
                     onClose={addClose}
                     aria-labelledby="alert-dialog-title"
                     aria-describedby="alert-dialog-description"
                  >
                  <DialogTitle id="alert-dialog-title">{"Add Order"}</DialogTitle>
                  <DialogContent>
                    <AddOrder/>
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
              //       if(column.id!="actions"){
              //       const value = row[column.id];
              // return (
              //         <TableCell key={column.id} align={column.align}>
              //          {column.format && typeof value === 'number' ? column.format(value) : value}
              //         </TableCell>
              //       );
              // }else{
              //   return (
              //     <div className={classes.edit}>
              //     <EditIcon onClick={handleClickOpen}/>
              //     <DeleteOutlinedIcon/>
              //     <Dialog
              //        open={open}
              //        onClose={handleClose}
              //        aria-labelledby="alert-dialog-title"
              //        aria-describedby="alert-dialog-description"
              //     >
              //     <DialogTitle id="alert-dialog-title">{"Edit Order"}</DialogTitle>
              //     <DialogContent>

                    
              //     </DialogContent>
                
              //   </Dialog>
              //     </div>
                )
              }
                  )}
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
