const express = require('express')
const app = express()
const PORT = 8080

const contenedor1 = require('./desafioClase4/massetaniNahir')

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))

app.get('/productos', async (solicitud, respuesta) => {

    const productos = await contenedor1.getAll()

    respuesta.send(productos)
})


app.get('/productoRandom', async (solicitud, respuesta) => {

    const productos = await contenedor1.getAll()
    const maxProductos = productos.length 

    const productoRandom =  Math.floor(Math.random() * (maxProductos) + 1);
    console.log(productoRandom)
    respuesta.send(productos[productoRandom -1])
})

