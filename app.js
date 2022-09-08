const http = require("http");
const fs = require("fs");
const url = require("url");

const fillTemplateHandler = require("./modules/fillTemplate");

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempProd = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");

const appData = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const parsedAppData = JSON.parse(appData);


const requestHandler = function(req, res){
    res.setHeader("Content-Type", "text/html");
    const {query, pathname} = url.parse(req.url, true);
    if (pathname === "/" || pathname === "/overview"){
        const html = (parsedAppData.map(prodData => fillTemplateHandler(tempCard, prodData))).join("");
        const overviewHtml = tempOverview.replace("{% PRODUCT_CARD %}", html);
        res.end(overviewHtml);
    }
    else if (pathname === "/product"){
        const product = parsedAppData[query.id - 1]
        const productHtml = fillTemplateHandler(tempProd, product);
        res.end(productHtml);
    }
    else if (pathname === "/api"){
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