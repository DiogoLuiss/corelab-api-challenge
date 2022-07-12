import Sequelize, { Model } from 'sequelize'

class Cars extends Model {
  static init (sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        brand: Sequelize.STRING,
        color: Sequelize.STRING,
        year: Sequelize.NUMBER,
        price: Sequelize.NUMBER,
        board: Sequelize.STRING,
        description: Sequelize.STRING,
        author: Sequelize.BOOLEAN,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get () {
            return `http://localhost:3001/cars-file/${this.path}`
          }
        }
      },
      { sequelize }
    )
    return this
  }
}
export default Cars
// os models sempre precisam, ser exportados para o index das migrations, necessario se conectar
