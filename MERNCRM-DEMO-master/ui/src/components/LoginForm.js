import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AuthHeader from '../services/auth.header';
import userService from '../services/user.services'
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: '40ch',
      },
    maxWidth: 400,
    marginTop:'40px',
    marginLeft:'500px',
    justifyContent:'center',
    alignItems:'center',
    textAlign:"center"
  },
  media: {
    height: 140,
  },
  head:{
      justifyContent:'center',
      alignItems:'center',
      textAlign:"center"
      
  },
  
}));

export default function LoginForm() {
  const classes = useStyles();
  const[loginuser,setLoginUser]=useState({
    email:"",
    password:""
  })


  const handleChange=(e)=>{
    const{name,value}=e.target
    console.log(name,value)
    setLoginUser({...loginuser,[name]:value})
  }
  const login=(e)=>{
    e.preventDefault()
    userService.getLoginUser(loginuser)
    .then((res)=>{
      console.log(res)
      if(res.data.status==1)
      {
        AuthHeader.storeLoginUser(res.data)
        window.location.href='/about'
      }
      alert(res.data.msg)
      }).catch((err)=>{
        console.log(err)
      })

  }

  return (
    
    <form  noValidate autoComplete="off" onSubmit={login} >
      <div>
      <Card className={classes.root}>
        <CardContent>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.head}>
            LOGIN
          </Typography>
      
      
      
      
      
      <TextField
          required
          id="outlined-required"
          label="User Name"
          defaultValue={loginuser.email}
          name="email"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="outlined-helperText"
          label="Password"
          defaultValue={loginuser.password}
          name="password"
          variant="outlined"
          onChange={handleChange}
        />
         <Button variant="contained" color="primary" type="submit" >
        LOGIN
    </Button>
    <Link
          component=""
          variant="body2"
          onClick={() => {
          // console.info("I'm a button.");
          window.location.href='/register'
          }}
          >
          Create a new account 
        </Link>
    </CardContent>   
        </CardContent>
      
    </Card>


       </div>
    </form>
     )
}
