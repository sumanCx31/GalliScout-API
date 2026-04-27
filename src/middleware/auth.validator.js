const bodyValidator = (schema)=>{
    return async(req,res,next)=>{
        try {
            const data = req.body;
            let response = await schema.validateAsync(data);
            next();
        } catch (exception) {
           console.log(exception);   
        }
    }
}

module.exports = bodyValidator;