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

////////////////////// OBTENER CENTROS POBLADOS
app.get("/centrosPoblados",function (request,response) {
    var query="SELECT * FROM inventariotest.centrospoblados";
    conn.query(query, function (err,resultado) {
        if(err){
            console.log("algo salió mal");
            response.send("algo salio mal");
        }else{
            response.json(resultado);
        }
    })
});

////////////////////// OBTENER CENTROS POBLADOS POR ID
app.get("/centrosPoblados/get/:id",function (request,response) {
    var id = request.params.id;

    var query=`SELECT * FROM inventariotest.centrospoblados cep WHERE cep.idCentroPoblado=${id}`;
    conn.query(query, function (err,resultado) {
        if(err){
            console.log("algo salió mal");
        }else{
            response.json(resultado);
        }
    })
})

////////////////////// CREAR CENTROS POBLADOS
app.post("/centrosPoblados/create",function (request,response) {
    var nombreCentroPoblado =request.body.nombreCentroPoblado;
    var ubigeo = request.body.ubigeo;
    var query="INSERT INTO centrospoblados (nombreCentroPoblado, ubigeo) VALUES (?,?)";
    var query2="SELECT * FROM inventariotest.centrospoblados cep WHERE cep.idCentroPoblado=?";
    var parametros=[nombreCentroPoblado,ubigeo];
    conn.query(query,parametros, function (error,resultado) {
        if(error){
            console.log("NO SE PUDO CREAR");
            response.send("NO SE PUDO CREAR");
        }else{

            var id = resultado.insertId.toString();

            conn.query(query2,[id], function (err,res) {
                if(error){
                    console.log("fue ps");
                }else{
                    response.json(res);
                }
            })
        }
    })
})

////////////////////// EDITAR CENTROS POBLADOS
app.post("/centrosPoblados/update",function (request,response) {
    var idCentroPoblado =request.body.idCentroPoblado;
    var nombreCentroPoblado =request.body.nombreCentroPoblado;
    var ubigeo = request.body.ubigeo;

    var query="UPDATE inventariotest.centrospoblados SET nombreCentroPoblado = ?, `ubigeo` = ? WHERE (`idCentroPoblado` = ?)";
    var query2="SELECT * FROM inventariotest.centrospoblados cep WHERE cep.idCentroPoblado=?";
    var parametros=[nombreCentroPoblado,ubigeo,idCentroPoblado];

    conn.query(query,parametros, function (error,resultado) {
        if(error){
            console.log("NO SE PUDO editar");
            response.send("NO SE PUDO editar");
        }else{
            var id = idCentroPoblado;

            conn.query(query2,[id], function (err,res) {
                if(error){
                    console.log("fue ps");
                }else{
                    response.json(res);
                }
            })

        }
    })
})

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