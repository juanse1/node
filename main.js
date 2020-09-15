const axios = require('axios');
const fs = require('fs');
const parse = require('node-html-parser').parse;
const server = require("./server.js");

async function getDataProveedores()
{
    const resp = await axios.get('https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json');
    let data = resp.data;

    fs.readFile('proveedores.html', 'utf8', (err, data2) => {
        if(err) {console.log("Error leyendo el html de proveedores.")};

        const p = parse(data2);
        const tableBody = p.querySelector('#tablaProveedores');

        for(var i in data)
        {
            var actual = data[i];
            var id = actual["idproveedor"];
            var nombre = actual["nombrecompania"];
            var contacto = actual["nombrecontacto"];
            tableBody.appendChild('<tr> <td>'+id+'</td> <td>'+nombre+'</td> <td>'+contacto+'</td></tr>');
        }

        fs.writeFile("./proveedores.html", p.toString(), 'utf-8', (err) => {
            if(err) {console.log("Error escribiendo el html de proveedores")};
        });
    });
}

async function getDataClientes()
{
    const resp = await axios.get('https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json');
    let data = resp.data;

    fs.readFile('clientes.html', 'utf8', (err, data2) => {
        if(err) {console.log("Error leyendo el html de clientes.")};

        const p = parse(data2);
        const tableBody = p.querySelector('#tablaClientes');

        for(var i in data)
        {
            var actual = data[i];
            var id = actual["idCliente"];
            var nombre = actual["NombreCompania"];
            var contacto = actual["NombreContacto"];
            tableBody.appendChild('<tr> <td>'+id+'</td> <td>'+nombre+'</td> <td>'+contacto+'</td></tr>');
        }

        fs.writeFile("./clientes.html", p.toString(), 'utf-8', (err) => {
            if(err) {console.log("Error escribiendo el html de clientes")};
        });
    });
}

function run()
{
    server.correrServidor();
    getDataProveedores();
    getDataClientes();
}

run();