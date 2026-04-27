class AuthController {
    register = async(req,res)=>{
        try {
            const data = req.body;
            console.log(data);
            
            res.json({
                data:data,
                message:"This is register route",
                status:"success"
            })
        } catch (exception) {
            throw exception;
        }
    }
}

const authCltr = new AuthController();
module.exports  = authCltr;