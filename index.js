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



app.post("/sitios/create", function(request,response){
    var codigoSitio = request.body.codigoSitio;
    var idCentroPoblado = request.body.idCentroPoblado;
    var latitud = request.body.latitud;
    var longitud = request.body.longitud;

    var query = "INSERT INTO sitios (codigoSitio,idCentroPoblado,latitud, longitud) VALUES (?, ? , ?, ?);";
    var query2 = "SELECT s.codigoSitio,s.idCentroPoblado,s.latitud,s.longitud,s.idSitio,c.nombreCentroPoblado FROM sitios s INNER JOIN centrospoblados c ON s.idCentroPoblado= c.idCentroPoblado WHERE s.idSitio= ?";

    var parametros= [codigoSitio,idCentroPoblado,latitud, longitud];
    conn.query(query, parametros,function(error,resultado){
        if (error){
            console.log(error);
        }else {
            // Se captura el id del sitio creado.
            var id = resultado.insertId.toString();

            conn.query(query2,[id],function(err,result){
                if (err){
                    console.log(err);
                }else {
                    response.json(result);
                }

            });
            //response.json(result);

        }

    });



});



app.post("/equipos/create", function(request,response){
    var nombreEquipo = request.body.nombreEquipo;
    var idCategoriaEquipo = request.body.idCategoriaEquipo;
    var serialNumber = request.body.serialNumber;
    var modelo = request.body.modelo;
    var idSitio = request.body.idSitio;




    var query = "INSERT INTO equipos (nombreEquipo,idCategoriaEquipo,serialNumber, modelo,idSitio) VALUES (?, ?, ?, ? , ? );";
    var query2 = "SELECT * FROM inventariotest.equipos WHERE idequipo= ?;";

    var parametros= [nombreEquipo,idCategoriaEquipo,serialNumber, modelo,idSitio];
    conn.query(query, parametros,function(error,resultado){
        if (error){
            console.log(error);
        }else {
            // Se captura el id del sitio creado.
            var id = resultado.insertId.toString();

            conn.query(query2,[id],function(err,result){
                if (err){
                    console.log(err);
                }else {
                    response.json(result);
                }

            });
            //response.json(resultado);

        }

    });



});



