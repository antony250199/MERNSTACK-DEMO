import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import orderServices from '../services/order.services'


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '40ch',
    },
  },
}));

export default function AddOrder() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [order,setOrder]=useState({
    quantity:"",
    amount:"",
    customer:"",
    shippingdate:""
    
  })
  const handleChange=(e)=>{
    const{name,value}=e.target
    console.log(name,value)
    setOrder({...order,[name]:value})
  }

  const addOrder=(e)=>{
    // e.preventDefault()
    // let loggedUser=AuthHeader.getLoginUser()
    // let PostData={
    //   user_id:loggedUser.userid,
    //   authorname:loggedUser.username,
    //   title:post.title,
    //   content:post.content
    // }
    console.log("add order")
    orderServices.addOrderData(order)
    .then((res)=>{
      console.log(res);
      alert("Order Placed")
      setOpen(false)

    //   e.preventDefault()
    }).catch((err)=>{
      console.log(err)
    })
  }
 

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={addOrder}>
      <div>
      <TextField
          id="outlined-multiline-flexible"
          label="Quantity"
          multiline
          rowsMax={1}
          name="quantity"
          defaultValue={order.quantity}
          onChange={handleChange}
          variant="outlined"
        />
         <TextField
          id="outlined-multiline-static"
          label="Amount"
          multiline
          rows={1}
          defaultValue={order.amount}
          name="amount"
          variant="outlined"
          onChange={handleChange}
        />
         <TextField
          id="outlined-multiline-static"
          label="Customer"
          multiline
          rows={1}
          defaultValue={order.customer}
          name="customer"
          variant="outlined"
          onChange={handleChange}
        />
         <TextField
          id="outlined-multiline-static"
          label="Shipping Date"
          multiline
          rows={1}
          defaultValue={order.shippingdate}
          name="shippingdate"
          variant="outlined"
          onChange={handleChange}
        />
         <Button variant="contained" color="primary" type="submit"  >
        ORDER
    </Button>
   
      </div>
      </form>
  )
}
