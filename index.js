'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql2");


var app = express();
app.use(bodyParser.urlencoded({extended:true}));

//CONFIGURO MI CONEXION A BASE DE DATOS

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "inventariotest"

});

conn.connect(function(err){
    if(err){
        console.log(err);
    }else {
        console.log("Conexión exitosa a base de datos");
    }
});

app.listen(9669,function(){
    console.log("Servidor levantado exitosamente");
});



//localhost:9669:categoriasEquipo/get/{id}
app.get("/categoriasEquipo/get/:id", function(request,response){
    var idCategoriasEquipo = request.params.id;
    var query = "select * from categoriaequipo where idCategoriaEquipo= ?";
    var parametro = [idCategoriasEquipo];

    conn.query(query,parametro, function(err,result){
        if(err){
            console.log(err);
        } else {
            response.json(result);
        }
    })

});


//localhost:9669:categoriasEquipo/get
app.get("/categoriasEquipo/get/", function(request,response){
    var query = "select * from categoriaequipo";

    conn.query(query, function(err,result){
        if(err){
            console.log(err);
        } else {
            response.json(result);
        }
    })

});