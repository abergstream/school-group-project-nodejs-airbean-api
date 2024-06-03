import db from "../database/database.js";

const getCompanyInfo = async() => {
    try{

        const companyInfo = await db["company"].find({})
        return companyInfo

    }catch(error){
        console.error(error)
    }
}

export default getCompanyInfo