const {
    getAllProducts,
    getOneProduct,
    getByCategory,
    newProduct,
    updateProduct,
    deleteProduct
} = require ('../services/productsServices') 

const logs = require("../logs/log4");
const logError = logs.getLogger("error");

const nuevoProducto = async (req, res) => {
    try {
      //Armo un nuevo prod con los datos recibidos por parametro y datos locales como fecha
      const { nombre, descripción, categorías, imagen, precio } = req.body;
      const newObj = {
        nombre,
        descripción,
        categorías,
        imagen,
        precio,
      };
      const response = await newProduct(newObj);
      res.status(201)
      res.send(response);
    } catch (error) {
      logError.error(error);
    }
};

const verProductos = async (req, res) => {
    try {
      const response = await getAllProducts();
      res.status(200)
      res.send(response);
    } catch (error) {
        logError.error(error);
    }
};

const verUnProducto = async (req, res) => {
    try {
      const { id } = req.params;
      const response = await getOneProduct(id);
      if (response.estado === "ok") {
        res.status(200)
        res.send(response.producto);
      } else if (response.estado === "prodFalse") {
        res.status(400);
        res.send({ error: `Producto con ID ${id} no existe` });
      }
    } catch (error) {
      logError.error(error);
    }
};

const actualizarProducto = async (req, res) => {
    try {
      const { nombre, descripción, categorías, imagen, precio } = req.body;
      const prodMod = {
        nombre,
        descripción,
        categorías,
        imagen,
        precio,
      };
      const response = await updateProduct(prodMod, id);
      if (response.estado === "ok") {
        res.status(201)
        res.send(response.producto);
      } else if (response.estado === "prodFalse") {
        res.status(400);
        res.send({ error: `Producto con ID ${id} no existe` });
      }
    } catch (error) {
      logError.error(error);
    }
};

const verPorCategoria = async (req,res) => {
    try {
      const { categorías } = req.params
      const response = await getByCategory(categorías)
      if (response.estado === "ok") {
        res.status(200)
        res.send(response.productos);
      } else if (response.estado === "categoryFalse") {
        res.status(400);
        res.send({ error: `No existen productos con la categoria ${categorías}` });
      }
    } catch (error) {
      logError.error(error);
    }
};

const eliminarProducto = async (req, res) => {
    try {
      const { id } = req.params;
      const response = await deleteProduct(id);
      if (response.estado === "ok") {
        res.status(200)
        res.send(response.productos);
      } else if (response.estado === "prodFalse") {
        res.status(400);
        res.send({ error: `Producto con ID ${id} no existe` });
      }
    } catch (error) {
      logError.error(error);
    }
};

module.exports = {
    verProductos,
    verUnProducto,
    verPorCategoria,
    nuevoProducto,
    actualizarProducto,
    eliminarProducto
}