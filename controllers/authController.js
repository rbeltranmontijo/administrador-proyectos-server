const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.autenticarUsuario = async (req, res) => {
  // REvisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  // Extraer el email y password
  const { email, password } = req.body;

  try {
    // REvisar que sea un usuario registrado
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }

    // REvisar password
    const passCorrecto = await bcryptjs.compare(password, usuario.password);
    if (!passCorrecto) {
      return res.status(400).json({ msg: "Password incorrecto" });
    }

    // Si todo es correcto se crea JWT Crear y firmar el JWT
    const payload = {
      usuario: {
        id: usuario.id
      }
    };
    // Firmar el JWT
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600
      },
      (error, token) => {
        if (error) throw error;

        // Mensaje de confirmacion
        res.json({ token: token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
