
//Clientes activos,con tarjeta registrada con el dni no renovado y altura mayor o igual a 1,60

db.Clientes.find(
    
    {$and:[
        {activo:true},
        {tarjeta_credito:{$ne:null }},
        {$nor:[
            {"dni.renovado":true},
            {altura:{$lte:1.60}}
        ]
    }
]
}).pretty()

/*

Clientes con fecha mayor o igual a la indicada o con el campo activo falso.
Un municipio que no sea como el indicado con el nombre de Pablo,Antonio o Ricardo y con 2 intereses.


*/

db.Clientes.find(

    {$and:[
        {or:[
        {fecha: {$gte: new Date("2000-01-01")}},
        {activo:false}
    ]},
        {municipio: {$nin:["Mairena Del Alcor","Alcala De Guadaira","Carmona"]}},
        {nombre:{$in:["Pablo","Antonio","Ricardo"]}},
        {"personal.intereses":{$size:2}}
        
    ]

    }
)

/*

Clientes con altura mayor a 1.6,nombre que empiece por j y municipio que termine por r.
Ademas que no muestre el campo activo y con el nombre ordenado alfabeticamente y que si se muestre este campo en la consulta

*/

db.Clientes.find(
{$and:[
{$expr:{$gt:["personal.altura",1.6]}},
{nombre:{$regex :"^j"}},
{municipio:{$regex:"r$"}}



]}
//,{activo:0}.sort({nombre:1})

).pretty()

/*

Clientes con actividad que coincidan con un valor menor a 5 y que no sea igual a 0

*/

db.Clientes.find(
    {$and:[
        {"personal.actividad":{$elemMatch:{$lt:5,$ne:0,}}}

    ]

    }
)

/*

Clientes con nombre que empiece con j y termine con a y que ademas las cuente.

*/

db.Clientes.find(
    {$and: [
        
        {nombre:{$regex:"^j"}},
        {apellido:{$regex:"a$"}},



    ]}

).count()

/*

Clientes con municipios que contengan "na". Ademas limitaremos el resultado para que salgan los 4 primeros 

*/

db.Clientes.find(
    {municipio:{$regex: "na"}}
).limit(4)

//Muestra clientes con intereses en fútbol y activos 1=sale
db.Clientes.find({intereses:"fútbol",activo:true},{nombre:1,intereses:"fútbol",activo:1}).pretty()


/*Muestra clientes con intereses en fútbol y activos 0=No muestra ese campo.

Ordena los clientes activos por orden alfabetico por su nombre

*/

db.Clientes.find({activo:true}).sort({nombre: 1}).pretty()

/*

Clientes con intereses en futbol y esten activos.Ademas mostrara los campos nombre,intereses y activo.
Pero no mostrará el campo id(que lo asigna mongo automaticamente)

*/
db.Clientes.find({intereses:"fútbol",activo:true},{nombre:1,intereses:1,activo:1,_id:0}).pretty()






/*

Find one es Find pero solo devuelve el primero
Aunque no muestre esos campos (añadiendo el 0),si los tiene en cuenta y filtra teniendo en cuenta los parámetros

*/

db.Clientes.findOne({intereses:"fútbol",activo:true},{nombre:0,intereses:0,activo:0,_id:0})


//----------------------------------------------------------------2do Trimestre--------------------------------------------------------------------------------------------------------------------------------------------------------------------


/*

db.Clientes.aggregate(
    [
        {
            $lookup: {
                from: "coches",
                localField: "id_compra_coche",
                foreignField: "id_coche",
                as: "compras"
            }
        }
        {$match:{municipio:"Carmona":}},
    ]
).pretty()
*/


   db.Clientes.aggregate(
    [
        {
            $lookup: {
                from: "coches",
                localFiel: "codcoch",
                foreignField: "codcoche",
                as: "cc"
            }
        },
        {
            $set: {
                coche: {$arrayElemAt: ["$coche", 0]}
            }
        },
        
    ]
).pretty()




