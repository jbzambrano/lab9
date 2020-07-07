'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql2");


var app = express();
app.use(bodyParser.urlencoded({extended:true}));
//app.use(bodyParser.json());

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

//localhost:9669/categoriasEquipo/create
app.post("/categoriasEquipo/create", function(request,response){

    var nombreCategoriaEquipo = request.body.nombre;
    var idCategoriaEquipo = request.body.idCategoriaEquipo;

    var query = "INSERT INTO categoriaequipo (idCategoriaEquipo, nombre) VALUES (?, ?);"
    var  query2= "select * from categoriaequipo where idCategoriaEquipo =?";
    var parametros =[idCategoriaEquipo, nombreCategoriaEquipo];

    conn.query(query,parametros,function(error,resultado)
    {
        if (error) {
            console.log(error);
        } else {
           var id = resultado.insertId.toString();

            conn.query(query2,[id],function(err,resul)
            {
                if (err) {
                    console.log(err);
                } else {
                    response.json(resul);
                }
            });

        }
    });
});


//localhost:9669/categoriasEquipo/update
app.post("/categoriasEquipo/update", function(request,response){

    var idCategoriaEquipo = request.params.idCategoriaEquipo;
    var nombreCategoriaEquipo = request.params.nombreCategoriaEquipo;
    var nombreCategoriaEquipo = request.body.nombre;
    var idCategoriaEquipo = request.body.idCategoriaEquipo;

    var query = "UPDATE categoriaequipo SET idCategoriaEquipo = ?, nombre = ?  WHERE (idCategoriaEquipo = ? AND nombre=?);"
    var parametros =[idCategoriaEquipo2,nombreCategoriaEquipo2,idCategoriaEquipo,nombreCategoriaEquipo];
    var query2 = "select * from categoriaequipo where idCategoriaEquipo =?";


    conn.query(query,parametros,function(error,resultado)
    {
        if (error) {
            console.log(error);
        } else {
            var id = resultado.insertId.toString();

            conn.query(query2,[id],function(err,result)
            {
                if (err) {
                    console.log(err);
                } else {
                    response.json(result);
                }
            });

        }
    });

    /*
    conn.query(query,parametros,function(err,resultado)
    {
        if (err) {
            console.log(err);
        } else {
            //Crear Json
            var obtenerJson = {
                idCategoriaEquipo:idCategoriaEquipo2,
                nombre : nombreCategoriaEquipo2
            };
            response.json(obtenerJson);
            response.json(resultado);
        }
    });

     */
});