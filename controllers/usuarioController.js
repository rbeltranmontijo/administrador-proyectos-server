const Usuario = require("../models/Usuario");

exports.crearUsiario = async (req, res) => {
  try {
    let usuario;

    // Guardar el nuevo usuaro
    usuario = new Usuario(req.body);

    // Guarda el usuario
    await usuario.save();

    // Mensaje de confirmacion
    res.send("Usuario guardado correctamente");
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};
