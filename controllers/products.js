const mongoose=require("mongoose");
const productModel=require("../models/product");


const getAllStaticProducts=async(req,res)=>{
    const products=await productModel.find({ price:{$gt:30} }).sort("-price").select("price").limit(5) ;
    res.status(200).json(products);
}


const getAllProducts=async(req,res)=>{

    const{featured, company, name, sort, fields, numericFielters}=req.query;
    const queryObject={};

    if(featured){
        queryObject.featured=featured==="true"?true:false; 
    }
    if(company){
        queryObject.company=company;
    }
    if(name){
        queryObject.name={$regex:name,$options:"i"}; //to search based on any single input //i means case insensitive //regex means regular expression // $regex & $options is a mongo operator 
    }

    // const products=await productModel.find(queryObject);
    let result=productModel.find(queryObject);
        //sort
        if(sort){
            const sortList=sort.split(",").join(" "); //join is used to convert array to string
            result=result.sort(sortList); 
        }
        else{
            result=result.sort("createdAt");
        }
        
        //fields 
        if(fields){
            const fieldsList=fields.split(",").join(" ");
            result=result.select(fieldsList);
        }
        else{
            result=result.select("-__v"); //to remove __v from the result // - means remove
        }

        //numeric filters
        if(numericFielters){
            const operatorMap={
                ">":"$gt",
                ">=":"$gte",
                "=":"$eq",
                "<":"$lt",
                "<=":"$lte",
            }
            const regEx=/\b(<|>|>=|=|<|<=)\b/g; //\b is used to match the exact word
            let filters=numericFielters.replace(regEx,(match)=>`-${operatorMap[match]}-`);
            const options=["price","rating"];
            filters=filters.split(",").forEach((item)=>{
                const [field,operator,value]=item.split("-");
                if(options.includes(field)){
                    result=result.where({[field]:{[operator]:Number(value)}});
                }
            })
        }
        

        const page=Number(req.query.page)||1;
        const limit=Number(req.query.limit)||10;
        const skip=(page-1)*limit;
        result=result.skip(skip).limit(limit); 
        const products=await result;

    res.status(200).json({products,nbHits:products.length});

}


module.exports={getAllProducts, getAllStaticProducts}




