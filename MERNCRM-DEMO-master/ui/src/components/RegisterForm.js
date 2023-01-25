import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import userService from '../services/user.services';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';



const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1.5),
      width: '25ch',
      
    },
  },
  state:{
      '&.MuiTextField-root':{
      width:'53ch'
  },
},
head:{
  justifyContent:'center',
      alignItems:'center',
      textAlign:"center"
}
  
}));



export default function RegisterForm() {
  const classes = useStyles();
  const [user,setUser]=useState({
    firstname:"",
    lastname:"",
    email:"",
    password:"",
    address:"",
    city:"",
    state:"",
    nation:""
  })
  const handleChange=(e)=>{
    const{name,value}=e.target
    console.log(name,value)
    setUser({...user,[name]:value})
  }

  const signUp=(e)=>{
    
    console.log("signup")
    userService.registerUser(user)
    .then((res)=>{
      console.log(res);
      alert(res.data)
      e.preventDefault()
    }).catch((err)=>{
      console.log(err)
    })
  }
   
  return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="sm">
    
      <Typography component="div" style={{ marginTop:'10px', padding:'20px',height: 'auto', border:'2px solid lightgray', borderRadius:'10px', justifyContent:'center'}} >
          <h1 className={classes.head}>Registeration Form</h1>
     
      
      
   



    <form className={classes.root} noValidate autoComplete="off" onSubmit={signUp}>
      <div>
      <TextField
          required
          id="outlined-required"
          label="First Name"
          defaultValue={user.firstname}
          variant="outlined"
          name="firstname"
          onChange={handleChange}
        />
        <TextField
          id="outlined-lastname"
          label="Last Name"
          defaultValue={user.lastname}
          variant="outlined"
          name="lastname"
          onChange={handleChange}
        />
         <TextField
          id="outlined-email"
          label="Email"
          defaultValue={user.email}
          variant="outlined"
          name="email"
          onChange={handleChange}
        />
         <TextField
          id="outlined-password"
          label="Password"
          type="password"
          defaultValue={user.password}
          variant="outlined"
          name="password"
          onChange={handleChange}
        />
         <TextField
          id="outlined-address"
          label="Address"
          defaultValue={user.address}
          variant="outlined"
          name="address"
          onChange={handleChange}
        />
         <TextField
          id="outlined-city"
          label="City"
          defaultValue={user.city}
          variant="outlined"
          name="city"
          onChange={handleChange}
        />
         <TextField
         className={classes.state}
          id="outlined-state"
          label="State"
          defaultValue={user.state}
          variant="outlined"
          name="state"
          onChange={handleChange}
        />
        <TextField
         className={classes.state}
          id="outlined-state"
          label="Nation"
          defaultValue={user.nation}
          variant="outlined"
          name="state"
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" type="submit"  >
        SUBMIT
        </Button>
       
        
         
       </div>
    </form>'
    </Typography>
    </Container>
  </React.Fragment>
     )
}