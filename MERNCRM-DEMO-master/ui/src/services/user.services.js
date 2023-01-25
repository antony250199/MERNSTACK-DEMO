import axios from 'axios'
 
 
 class userService{
     
    url='http://localhost:5000/api/user/'

    getAllUsersList(){
        return axios.get(`${this.url}getAllUser`)
    }
    getUsersList(){
        return axios.get(`${this.url}getUser/:id`)
    }
    editUsersList(edit){
        return axios.put(`${this.url}editUser/:id`,edit)
    }
    deleteUserList(){
        return axios.delete(`${this.url}deleteUser/:id`)
    }

 

    registerUser(user){
        return axios.post(`${this.url}addUser`,user)
    }
    getLoginUser(loginuser){
        return axios.post(`${this.url}loginuser`,loginuser)
    }
}


export default new userService()