import { API } from "../../backend";

export const getProducts = async() => {
    try{

        const respones = await fetch(`${API}products`,
        {
            method:"GET",
        })
        
        return respones.json()

    }catch(e){
        console.log("Error: " ,e);
    }
}