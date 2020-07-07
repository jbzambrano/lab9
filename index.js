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



<<<<<<< HEAD
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


=======
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
>>>>>>> ef368d6707519941831053877b57f736d52b7cfd

});


<<<<<<< HEAD

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



=======
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



            //response.json(resultado);
        }
    });
});


//localhost:9669/categoriasEquipo/update
app.post("/categoriasEquipo/update", function(request,response){

    var idCategoriaEquipo = request.params.idCategoriaEquipo;
    var nombreCategoriaEquipo = request.params.nombreCategoriaEquipo;
    var nombreCategoriaEquipo2 = request.body.nombre;
    var idCategoriaEquipo2 = request.body.idCategoriaEquipo;

    var query = "UPDATE  categoriaequipo SET idCategoriaEquipo = idCategoriaEquipo2, nombre = nombreCategoriaEquipo2  WHERE (idCategoriaEquipo = ? AND nombre=?);"
    var parametros =[idCategoriaEquipo,nombreCategoriaEquipo];

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
});
>>>>>>> ef368d6707519941831053877b57f736d52b7cfd
