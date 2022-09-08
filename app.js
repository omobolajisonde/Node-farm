const http = require("http");
const fs = require("fs");


const appData = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const parsedAppData = JSON.parse(appData);

const requestHandler = function(req, res){
    const path = req.url;
    if (path === "/" || path === "/overview"){
        res.end("Overview");
    }
    else if (path === "/products"){
        res.end("Products");
    }
    else if (path === "/api"){
        res.end(appData);
    }
    else {
        res.writeHead(404, "Not Found", {
            'Content-Type': 'text/html'
        })
        res.end("<h1>Page not found</h1>");
    }
    
}




const server = http.createServer(requestHandler);
server.listen(8000, "127.0.0.1", ()=>{
    console.log("Listening to changes on http://127.0.0.1:8000");
})