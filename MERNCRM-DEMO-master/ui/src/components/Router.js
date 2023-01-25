import React from 'react'
import {BrowserRouter,Link,Route,Switch,NavLink} from 'react-router-dom'
import About from './About';
import Customer from './Customer';
import LoginForm from './LoginForm';
import Order from './Order';
import Product from './Product'
import RegisterForm from './RegisterForm'

export default function Router(){
    const routes=[
        {link:"Home",path:"/"},
        {link:"Dashboard",path:"/dashboard"},
        {link:"Customer",path:"/customer"},
        {link:"Order",path:"/order"},
        {link:"Product",path:"/product"},
        {link:"About",path:"/about"},
        {link:"Register",path:"/register"}
    ]

    return(
        <BrowserRouter>
        
            {
                routes.map((elmt,index)=>{
                    return(
                        <div key={index}>
                            
 
                        </div>
                         )
                }
                )
            }
        
        <Switch>
             <Route exact path="/" component={LoginForm}/>
            {/* <Route exact path="/dashboard" component={Dashboard}/> */}
            <Route exact path="/customer" component={Customer}/>
            <Route exact path="/product" component={Product}/>
            <Route exact path="/order" component={Order}/> 
            <Route exact path="/about" component={About}/>
            <Route exact path="/register" component={RegisterForm}/>
            {/* <Route component={()=><h1>Page Not Found</h1>}/> */}

        </Switch>
        </BrowserRouter>
    )
} 