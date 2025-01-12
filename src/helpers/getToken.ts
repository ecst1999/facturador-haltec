

export const getToken = () => {

    const token = localStorage.getItem("token")

    if(!token){
        //TODO
        return null
    }


    return token
    

}