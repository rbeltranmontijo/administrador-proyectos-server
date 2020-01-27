const Usuario = require("../models/Usuario");

exports.crearUsiario = async (req, res) => {
  // Extraer email y password
  const { email, password } = req.body;

  try {
    // REvisar que el usuario registrado sea unico
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    // Guardar el nuevo usuaro
    usuario = new Usuario(req.body);

    // Guarda el usuario
    await usuario.save();

    // Mensaje de confirmacion
    res.json({ msg: "Usuario creado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};
