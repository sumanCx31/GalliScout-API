const http =  require("http");
const app = require("./src/config/express.config")

const server = http.createServer(app);

const PORT =9004;

server.listen(PORT,"localhost",(err)=>{
if(!err)
{
    console.log(`Server is running on ${PORT}`);
    console.log(`Press CLTR+C to stop the server......`);

}
})