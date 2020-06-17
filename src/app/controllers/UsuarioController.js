import * as Yup from "yup";
import Usuario from "../models/Usuario";

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().required().email(),
      password: Yup.string().required().min(6),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Erro na validação" });
    }
    const userExists = await Usuario.findOne({
      where: { email: req.body.email },
    });
    if (userExists) {
      return res.status(400).json({ error: "Usuario ja existe" });
    }
    const { id, name, email } = await Usuario.create(req.body);
    return res.json({
      id,
      nome,
      email,
    });
  }
}
export default new UserController();
