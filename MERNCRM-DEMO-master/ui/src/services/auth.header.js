class AuthHeader{

    // if token is here in some values the condition is true goes to showpost app bar(!12345=0!=1(true)) 
        isloggedin()
        {
             return !!localStorage.getItem("token")
        }
    
    
        // isloggedout()
        // {
        //     return !!localStorage.removeItem("token")
        // }
    
    
        storeLoginUser(data){
            localStorage.setItem("userId",data.user._id)
            localStorage.setItem("userName",data.user.firstname+" "+data.user.lastname)
            localStorage.setItem("token",data.token)
    
    
        }
    
        removeLoginUser(){
            localStorage.removeItem("userId")
            localStorage.removeItem("userName")
            localStorage.removeItem("token")
    
        }
    
        getLoginUser(){
    
            let userId=localStorage.getItem("userId")
            let userName=localStorage.getItem("userName")
            return {userid:userId,username:userName}
        }
    }
    export default new AuthHeader()