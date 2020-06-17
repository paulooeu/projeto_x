import Sequelize from "sequelize";
import mongoose from "mongoose";
import databaseConfig from "../config/database";
import Usuario from "../app/models/Usuario";

const models = [Usuario];
class Database {
  constructor() {
    this.init();
    this.mongo();
  }
  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.connection));
  }
  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    /* this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
    });*/
  }
}

export default new Database();
