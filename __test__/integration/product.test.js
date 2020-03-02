const dbHandler = require('../../src/database')
const seedProduct = require('../../src/database/seed/seedProduct')
const app = require('../../src/appController')
const getProductModel = require('../../src/Product/models/Product')
const request = require('supertest')

let Product = null

beforeAll(async () => {
  await dbHandler.connect()
  await seedProduct()
  Product = await getProductModel()
})

afterAll(async () => await dbHandler.closeDatabase())

describe('Product', () => {
  it('Should return a 404 for invalid url product/:pid', async () => {
    const response = await request(app)
      .get('/product/' + 'invalidproductid')

    expect(response.status).toBe(404)
    expect(response.body.error).toBe('Product not exists')
  })

  it('Should return a 404 for product not found', async () => {
    const response = await request(app)
      .get('/product/' + '41224d776a326fb40f000001')

    expect(response.status).toBe(404)
    expect(response.body.error).toBe('Product not exists')
  })

  it('Should return a product by it\'s id', async () => {
    const product = await Product.findOne({})
    const response = await request(app)
      .get('/product/' + product._id)

    expect(response.status).toBe(200)
    expect(response.body.id).toEqual(product.id)
    expect(response.body.brand).toEqual(product.brand)
    expect(response.body.image).toEqual(product.image)
    expect(response.body.price).toEqual(product.price)
    expect(response.body.title).toEqual(product.title)
    expect(response.body.reviewScore).toEqual(product.reviewScore)
  })

  it('Should list second page of products', async () => {
    const response = await request(app)
      .get('/product/')
      .query({ page: 2 })

    const totalProducts = await Product.countDocuments()

    expect(response.status).toBe(200)
    expect(response.body.products.length).toBe(6)
    expect(response.body.currentPage).toBe(2)
    expect(response.body.numOfProducts).toBe(totalProducts)
  })

  it('Should list first page of products', async () => {
    const response = await request(app)
      .get('/product/')

    const totalProducts = await Product.countDocuments()
    expect(response.status).toBe(200)
    expect(response.body.products.length).toBe(10)
    expect(response.body.currentPage).toBe(1)
    expect(response.body.numOfProducts).toBe(totalProducts)
  })
})
