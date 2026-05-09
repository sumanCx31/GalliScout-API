class BannerController{
    addBanner=async(req,res)=>{
        try{
            console.log("Banner add successfully!");
            
        }catch(error){
            res.status(500).json({message: "Error adding banner"});
        }
    }
}

const bannerClrt = new BannerController();
module.exports = bannerClrt;