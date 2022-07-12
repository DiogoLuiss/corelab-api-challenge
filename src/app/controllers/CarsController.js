import * as Yup from 'yup'
import Cars from '../models/Cars'

class CarsController {
  async store (request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      brand: Yup.string().required(),
      color: Yup.string().required(),
      year: Yup.number().required(),
      price: Yup.number().required(),
      board: Yup.string().required(),
      description: Yup.string().required(),
      author: Yup.boolean()
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { filename: path } = request.file

    const { name, brand, color, year, price, board, description, author } = request.body

    const cars = await Cars.create({
      name,
      brand,
      color,
      year,
      price,
      board,
      description,
      path,
      author

    })

    return response.status(200).json(cars)
  }

  async index (request, response) {
    const cars = await Cars.findAll({})

    return response.json(cars)
  }

  async update (request, response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      brand: Yup.string(),
      color: Yup.string(),
      year: Yup.number(),
      price: Yup.number(),
      board: Yup.string(),
      description: Yup.string()
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { id } = request.params

    const CarExist = await Cars.findByPk(id) // confirmando se o email existe
    if (!CarExist) {
      return response
        .status(401)
        .json({ error: 'make sure your id Car is correct' })
    }
    let path // esse metodo é possivel fazer a aplicação procurar o arquivo apenas quando ele existe, sem isso iria bugar

    if (request.file) {
      path = request.file.filename
    }

    const { name, brand, color, year, price, board, description } = request.body

    await Cars.update(
      {
        name,
        brand,
        color,
        year,
        price,
        board,
        description,
        path

      },
      { where: { id } } // é ecessario especificar onde vc quer mudar as informações, usando id por exemplo
    )

    return response.status(200).json({ message: 'car successfully updated ' })
  }

  async delete (request, response) {
    const { id } = request.params

    const CarExist = await Cars.findByPk(id) // confirmando se o email existe
    if (!CarExist) {
      return response
        .status(401)
        .json({ error: 'make sure your id Car is correct' })
    }

    await Cars.destroy(

      { where: { id } } // é ecessario especificar onde vc quer mudar as informações, usando id por exemplo
    )

    return response.status(200).json({ message: 'car successfully Deleted ' })
  }
}

export default new CarsController()
