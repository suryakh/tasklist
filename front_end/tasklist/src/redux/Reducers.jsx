const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"
const IMAGEUP = "IMAGEUP"

const initialstate = {
    login:false,
    user:"",
    token:"",
    image:""
}


const loginreducer=(state=initialstate,action)=>{
    switch(action.type){
        case LOGIN:{
            return{
                ...state,
                login:true,
                user:action.payload.username,
                token:action.payload.token,
                image:action.payload.image || "profile.png"
            }
        }
        case LOGOUT:{
            return{
                ...state,
                login:false,
                user:"",
                token:"",
                image:""
            }
        }
        case IMAGEUP:{
            return{
                ...state,
                image:action.payload
            }
        }
        default :{
            return state
        }
    }
}

export default loginreducer