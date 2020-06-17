import jwt from "jsonwebtoken";
import * as Yup from "yup";
import Usuario from "../models/Usuario";
import authConfig from "../../config/auth";

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().required().email(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Erro na validação" });
    }

    const { email, password } = req.body;
    const usuario = await Usuario.findOne({
      where: { email },
    });

    if (!usuario) {
      return res.status(401).json({ error: "Usuario nâo existe" });
    }
    if (!(await usuario.checkPassword(password))) {
      return res.status(401).json({ error: "Usuario ou Senha incorreta" });
    }
    const { id, nome } = usuario;
    return res.json({
      usuario: {
        id,
        nome,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
