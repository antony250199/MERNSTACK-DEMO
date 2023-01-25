import axios from 'axios'
 
 
 class customerService{
     
    url='http://localhost:5000/api/customer/'

    getAllCustomerList(){
        return axios.get(`${this.url}getAllCustomer`)
    }
    getCustomerList(){
        return axios.get(`${this.url}getCustomer/:id`)
    }
    editCustomerList(edit){
        return axios.put(`${this.url}editCustomer/:id`,edit)
    }
    deleteCustomerList(){
        return axios.delete(`${this.url}deleteCustomer/:id`)
    }
    addCustomerData(customer){
        return axios.post(`${this.url}addCustomer`,customer) 
    }
    
}


export default new customerService()