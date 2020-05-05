const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"
const IMAGEUP = "IMAGEUP"

const login =(data)=>{
    return{
        type:LOGIN,
        payload:data
    }
}
const logout =()=>{
    return{
        type:LOGOUT
    }
}
const imageupload = (data) =>{
    return{
        type:IMAGEUP,
        payload:data
    }
}
export {login,logout,imageupload}