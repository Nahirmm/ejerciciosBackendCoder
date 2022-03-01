const fs = require('fs')

class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
        this.id = 1;
    }

    async leerArchivo() {
        try {
            let contenido = await fs.promises.readFile(this.nombreArchivo)
            if (!contenido) {
                return []
            }
            let array = JSON.parse(contenido)
            return array
        }catch(error) {
            if (error.code === "ENOENT") {
                fs.promises.writeFile(this.nombreArchivo, "[]")
                return []
              } else {
                console.log(error);
            }  
        }  
    }

    async save (producto) {
        
        try {
            let datos = await this.leerArchivo() 

            if (datos.length > 0) { 
                datos.map((prod) => {this.id <= prod.id ? this.id = prod.id++:""});
                producto.id = this.id
                datos.push(producto)
                datos.sort((a, b) => a.id - b.id)
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(datos, null, 2))
            }else { 
                producto.id = this.id
                datos.push(producto)
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(datos, null, 2))
            }
            this.id++
            return producto.id

        }catch(err) {
            console.log("Error " + err)
        }
    }

    async getAll() {
        try {
            let data = await this.leerArchivo()
            return data;
        }catch(err) {
            console.log("Error " + err)
        }
    }

    async getById(id) {
        try {
            let datos = await this.leerArchivo()
            let dato = datos.filter(data => data.id == id)
            return dato
        }catch(err) {
            console.log("Error " + err)
        }
    }

    async deleteById(id) {
        try{
            let datos = await this.getAll()
            let datosFiltrados = datos.filter(data => data.id !== id)
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(datosFiltrados, null, 2))
            return datosFiltrados
        }catch(err) {
            console.log("Error " + err)
        }
    }

    async deleteAll() {
        try{
            await fs.promises.writeFile(this.nombreArchivo, "[]")
        }catch(err) {
            console.log("Error " + err)
        }
    }
}

const contenedor1 = new Contenedor("./desafioClase4/productos.txt")
module.exports = contenedor1 
/*
contenedor1.save({
     title: 'yerba',
     price: 300.00,
     thumbnail: 'https://ejemplo.com/data/img/yerba.png'
})
contenedor1.save({
     title: 'mate',
     price: 935.50,
     thumbnail: 'https://ejemplo.com/data/img/mate.png'
})
contenedor1.save({
     title: 'termo',
     price: 4810.20,
     thumbnail: 'https://ejemplo.com/data/img/termo.png'
})*/


//contenedor1.getAll()
//contenedor1.getById(1)
//contenedor1.deleteById(1)
//contenedor1.deleteAll()

