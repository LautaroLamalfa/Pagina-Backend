const getUser = (req, res) => {
    if (req.user) {
      res.status(200)
      res.send({
        user: req.user.nombre,
        carrito: req.user.carrito,
        chat: req.user.chat,
        isAdmin : req.user.isAdmin
      });
    } else {
      res.status(403)
      res.send(false);
    }
}; 

module.exports = {
    getUser,
  };
  