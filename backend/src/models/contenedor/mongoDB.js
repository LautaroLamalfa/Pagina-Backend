const mongoose = require('mongoose')
const { asPOJO, removeField, renameField } = require ('../../shotcuts/mongo')
const ENV = require('../../config/enviromentConfig')

const logs = require('../../logs/log4')
const logConsola = logs.getLogger("console");
const logError = logs.getLogger("error")

const connectDB = () => {
    mongoose.connect(
    ENV.dbString, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }); 
    mongoose.connection.on("open", () => {
        logConsola.info("DB conectada, que bien!")
    });
    mongoose.connection.on("error", () => {
        logError.info("DB no conectada, que mal")
    })
}

connectDB()


class ContenedorMongoDB {
    constructor(name, esquema) {
        this.collection = mongoose.model(name, esquema)
    }

    guardar = async (newItem) => {
        try {
            let doc = await this.collection.create(newItem)
            doc = asPOJO(doc)
            renameField(doc, "_id", "id");
            removeField(doc, "__v");
            return doc
        } catch (error) {
            logError.error(error)
        }
    }

    leerId = async () => {
        try {
            let oneDoc = false
            oneDoc = await this.collection.findOne({ _id: num }, { __v: 0 })
            if (oneDoc) {
            const result = renameField(asPOJO(docs), "_id", "id");
            return result;
        }
            else {
                return false
            }
        } catch (error) {
            logError.error(error)
        }
    }

    leerALL = async () => {
        try {
            let manyDocs = await this.collection.find({}, { __v:0}).lean()
            rewriteDoc = manyDocs.map(asPOJO)
            rewriteDoc = manyDocs.map((id) => renameField(id, "_id", "id"))
            return rewriteDoc   
        } catch (error) {
            logError.error(error)
        }
    }

    actualizar = async () => {
        try {
            renameField(nuevoElem, "id", "_id");
            const { n, nModified } = await this.collection.replaceOne(
                { _id: nuevoElem._id },
                nuevoElem
            );
            if (n == 0 || nModified == 0) {
                res.status(304).json("Error al actualizar")
            } else {
                renameField(nuevoElem, "_id", "id");
                removeField(nuevoElem, "__v");
                return nuevoElem
            }
        } catch (error) {
            logError.error(error)
        }
    }

    eliminarId = async () => {
        try {
            const deletedId = await this.collection.findByIdAndDelete({ _id:num })
            res.status(200).json(deletedId + "+ eliminado")   
        } catch (error) {
            logError.error(error)
        }
    }

    eliminarALL = async () => {
        try {
            await this.collection.deleteMany({})
            return { message: "Todos los productos borrados" }
        } catch (error) {
            logError.error(error)
        }
    }
}

module.exports = ContenedorMongoDB