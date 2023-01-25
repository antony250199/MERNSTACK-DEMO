import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import productServices from '../services/product.services'



const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '40ch',
    },
  },
}));

export default function AddProduct() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [product,setProduct]=useState({
    product_name:"",
    category:"",
    price:"",
    stock:""
    
  })
  const handleChange=(e)=>{
    const{name,value}=e.target
    console.log(name,value)
    setProduct({...product,[name]:value})
  }

  const addProduct=(e)=>{
    // e.preventDefault()
    // let loggedUser=AuthHeader.getLoginUser()
    // let PostData={
    //   user_id:loggedUser.userid,
    //   authorname:loggedUser.username,
    //   title:post.title,
    //   content:post.content
    // }
    console.log("add product")
    productServices.addProductData(product)
    .then((res)=>{
      console.log(res);
      alert("Product added")
      setOpen(false)

    //   e.preventDefault()
    }).catch((err)=>{
      console.log(err)
    })
  }
 

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={addProduct}>
      <div>
      <TextField
          id="outlined-multiline-flexible"
          label="Product Name"
          multiline
          rowsMax={1}
          name="product_name"
          defaultValue={product.product_name}
          onChange={handleChange}
          variant="outlined"
        />
         <TextField
          id="outlined-multiline-static"
          label="Category"
          multiline
          rows={1}
          defaultValue={product.category}
          name="category"
          variant="outlined"
          onChange={handleChange}
        />
         <TextField
          id="outlined-multiline-static"
          label="Price"
          multiline
          rows={1}
          defaultValue={product.price}
          name="price"
          variant="outlined"
          onChange={handleChange}
        />
         <TextField
          id="outlined-multiline-static"
          label="Stock"
          multiline
          rows={1}
          defaultValue={product.stock}
          name="stock"
          variant="outlined"
          onChange={handleChange}
        />
         <Button variant="contained" color="primary" type="submit"  >
        ADD PRODUCT
    </Button>
   
      </div>
      </form>
  )
}
