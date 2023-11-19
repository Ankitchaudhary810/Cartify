import { API } from "../../backend";


export const createOrder = async (userId , Token, orderData) => {
    try{
        const response = await fetch(`${API}/order/create/${userId}`, {
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
                Authorization:`Bearer ${Token}`
            },
            body:JSON.stringify({order:orderData})
        })

        return response.json()
    }catch(e){
        console.log("Err: " , e);
    }

}