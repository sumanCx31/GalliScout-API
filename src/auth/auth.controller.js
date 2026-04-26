class AuthController {
    register = async(req,res)=>{
        try {
            res.json({
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