const http = require('http');
const fs = require('fs');
const url = require('url');

exports.correrServidor = function display()
{
    http.createServer(function (req, res) {
        if(req.url == '/api/clientes')
        {
            res.writeHead(200, {'Content-type':'text/html'});
            fs.readFile('./clientes.html', (err, html) => {
                if(err) {console.log("Error leyendo el html de clientes.")};
                res.end(html);
            });
        }
        else if(req.url == '/api/proveedores')
        {
            res.writeHead(200, {'Content-type':'text/html'});
            fs.readFile('./proveedores.html', (err, html) => {
                if(err) {console.log("Error leyendo el html de proveedores.")};
                res.end(html);
            });
        }
    }).listen(8081); 
}

