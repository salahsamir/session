


const list=['body','params','query']

export const validation=(schema)=>{
   return (req,res,next)=>{
    const error=[]
    list.forEach(key => {
        if(schema[key]){
            const result=schema[key].validate(req[key],{
                abortEarly:false
            })
            if(result.error){
               error.push(result.error.details)
            }
        }
        
    });
    if(error.length){
        return res.json({message:"validation error",error})
    }
    return next()
   }
  
}