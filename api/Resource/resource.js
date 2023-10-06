const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
app.use(bodyParser.json());

const sequelize = new Sequelize("database", "username", "password", {
  dialect: "sqlite",
  storage: "database.sqlite",
});

const TbMarcaVeicu = sequelize.define("TbMarcaVeicu", {
  idMarcVeic: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  marcVeic: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const TbModelVeicu = sequelize.define("TbModelVeicu", {
  idModeVeic: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idMarcVeic: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TbMarcaVeicu,
      key: "idMarcVeic",
    },
  },
  apelModeVeic: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const TbVeicu = sequelize.define("TbVeicu", {
  idVeic: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idMarcVeic: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TbMarcaVeicu,
      key: "idMarcVeic",
    },
  },
  idModeVeic: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TbModelVeicu,
      key: "idModeVeic",
    },
  },
  placVeic: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estaPlac: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  corVeic: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipoVeicDena: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

app.post("/veiculo/v001", async (req, res) => {
  const eduVeiculoModels = req.body;
  const generalResponseModel = {
    httpStatus: 200,
    messageStatus: "REGISTRO EFETUADO COM SUCESSO",
    dateRequest: new Date(),
    listSize: eduVeiculoModels.length,
    object: eduVeiculoModels,
  };

  try {
    await sequelize.transaction(async (t) => {
      for (const eduVeiculoModel of eduVeiculoModels) {
        let veiculoMarca = await TbMarcaVeicu.findOne({
          where: { marcVeic: eduVeiculoModel.marca.toUpperCase() },
          transaction: t,
        });
        if (!veiculoMarca) {
          veiculoMarca = await TbMarcaVeicu.create(
            {
              marcVeic: eduVeiculoModel.marca,
            },
            { transaction: t }
          );
        }

        let veiculoModel = await TbModelVeicu.findOne({
          where: {
            idMarcVeic: veiculoMarca.idMarcVeic,
            apelModeVeic: eduVeiculoModel.modelo,
          },
          transaction: t,
        });
        if (!veiculoModel) {
          veiculoModel = await TbModelVeicu.create(
            {
              idMarcVeic: veiculoMarca.idMarcVeic,
              apelModeVeic: eduVeiculoModel.modelo,
            },
            { transaction: t }
          );
        }

        let veiculoPlaca = await TbVeicu.findOne({
          where: { placVeic: eduVeiculoModel.placa },
          transaction: t,
        });
        if (!veiculoPlaca) {
          veiculoPlaca = await TbVeicu.create(
            {
              idMarcVeic: veiculoMarca.idMarcVeic,
              idModeVeic: veiculoModel.idModeVeic,
              placVeic: eduVeiculoModel.placa,
              estaPlac: eduVeiculoModel.uf,
              corVeic: eduVeiculoModel.cor,
              tipoVeicDena: eduVeiculoModel.tipoVei,
            },
            { transaction: t }
          );
        } else {
          await TbVeicu.update(
            {
              idMarcVeic: veiculoMarca.idMarcVeic,
              idModeVeic: veiculoModel.idModeVeic,
              estaPlac: eduVeiculoModel.uf,
              corVeic: eduVeiculoModel.cor,
              tipoVeicDena: eduVeiculoModel.tipoVei,
            },
            {
              where: { idVeic: veiculoPlaca.idVeic },
              transaction: t,
            }
          );
        }

        await TbIEducaVeiculos.create(
          {
            placa: eduVeiculoModel.placa,
            marca: eduVeiculoModel.marca,
            modelo: eduVeiculoModel.modelo,
            cor: eduVeiculoModel.cor,
            uf: eduVeiculoModel.uf,
            tipoVei: eduVeiculoModel.tipoVei,
          },
          { transaction: t }
        );
      }
    });

    res.status(200).json(generalResponseModel);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
