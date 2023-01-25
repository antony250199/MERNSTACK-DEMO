import axios from 'axios'
 
 
 class orderService{
     
    url='http://localhost:5000/api/order/'

    getAllOrderList(){
        return axios.get(`${this.url}getAllOrder`)
    }
    getOrderList(){
        return axios.get(`${this.url}getOrder/:id`)
    }
    editOrderList(edit){
        return axios.put(`${this.url}editOrder/:id`,edit)
    }
    deleteOrder(){
        return axios.delete(`${this.url}deleteOrder/:id`)
    }
    addOrderData(order){
        return axios.post(`${this.url}addOrder`,order) 
    }
    
}


export default new orderService()