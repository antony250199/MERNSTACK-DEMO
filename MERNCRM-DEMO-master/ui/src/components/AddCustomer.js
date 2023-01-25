import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import customerServices from '../services/customer.services'



const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '40ch',
    },
  },
}));

export default function AddCustomer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [customer,setCustomer]=useState({
    first_name:"",
    last_name:"",
    email:"",
    mobile:"",
    membership:"",
    
  })
  const handleChange=(e)=>{
    const{name,value}=e.target
    console.log(name,value)
    setCustomer({...customer,[name]:value})
  }

  const addCustomer=(e)=>{
    // e.preventDefault()
    // let loggedUser=AuthHeader.getLoginUser()
    // let PostData={
    //   user_id:loggedUser.userid,
    //   authorname:loggedUser.username,
    //   title:post.title,
    //   content:post.content
    // }
    console.log("add customer")
    customerServices.addCustomerData(customer)
    .then((res)=>{
      console.log(res);
      alert("Customer added")
      setOpen(false)

    //   e.preventDefault()
    }).catch((err)=>{
      console.log(err)
    })
  }
 

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={addCustomer}>
      <div>
      <TextField
          id="outlined-multiline-flexible"
          label="First Name"
          multiline
          rowsMax={1}
          name="first_name"
          defaultValue={customer.first_name}
          onChange={handleChange}
          variant="outlined"
        />
         <TextField
          id="outlined-multiline-static"
          label="Last Name"
          multiline
          rows={1}
          defaultValue={customer.last_name}
          name="last_name"
          variant="outlined"
          onChange={handleChange}
        />
         <TextField
          id="outlined-multiline-static"
          label="Email"
          multiline
          rows={1}
          defaultValue={customer.email}
          name="email"
          variant="outlined"
          onChange={handleChange}
        />
         <TextField
          id="outlined-multiline-static"
          label="Mobile No"
          multiline
          rows={1}
          defaultValue={customer.mobile}
          name="mobile"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="outlined-multiline-static"
          label="MemberShip"
          multiline
          rows={1}
          defaultValue={customer.membership}
          name="membership"
          variant="outlined"
          onChange={handleChange}
        />
         <Button variant="contained" color="primary" type="submit"  >
        ADD CUSTOMER
    </Button>
   
      </div>
      </form>
  )
}
