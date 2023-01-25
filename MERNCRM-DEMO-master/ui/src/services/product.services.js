import axios from 'axios'
 
 
 class productService{
     
    url='http://localhost:5000/api/product/'

    getAllProductList(){
        return axios.get(`${this.url}getAllProducts`)
    }
    getProductList(){
        return axios.get(`${this.url}getProduct/:id`)
    }
    editProductList(edit){
        return axios.put(`${this.url}editProduct/:id`,edit)
    }
    deleteProduct(){
        return axios.delete(`${this.url}deleteProduct/:id`)
    }
    addProductData(product){
        return axios.post(`${this.url}addProduct`,product) 
    }
    
}


export default new productService()