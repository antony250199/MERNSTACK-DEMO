import { Typography } from '@material-ui/core'
import React from 'react'
import Customer from './Customer'
import Order from './Order'

export default function About(){
    return(
        <div>
            <Typography variant="h5" component="h1">
                About
            </Typography>
            <Typography variant="h5" component="h2">
               React CRM Demo App 2.0.0
            </Typography>
            <Typography paragraph>
             {/* <Customer/> */}
             {/* <Order/> */}
             
           </Typography>
        </div>
    )
}

