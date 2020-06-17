import mongoose from "mongoose";

const NotificacaoSchema = new mongoose.Schema(
  {
    texto: {
      type: String,
      required: true,
    },
    usuario_id: {
      type: Number,
      required: true,
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Notificacao", NotificacaoSchema);
