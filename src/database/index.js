import Sequelize from 'sequelize'

import Cars from '../app/models/Cars'

import configDatabase from '../config/database'

const models = [Cars]

class Database {
  constructor () {
    this.init()
  }

  m
  init () {
    this.connection = new Sequelize(configDatabase)
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      )
  }
}

export default new Database()
