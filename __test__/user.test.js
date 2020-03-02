const dbHandler = require('../src/database')
const getUserModel = require('../src/User/models/User')
const getProductModel = require('../src/Product/models/Product')
const app = require('../src/appController')
const request = require('supertest')
const seedProduct = require('../src/database/seed/seedProduct')

beforeAll(async () => await dbHandler.connect())
afterEach(async () => await dbHandler.clearDatabase())
afterAll(async () => await dbHandler.closeDatabase())

describe('Auth', () => {
  it('Should deny inexistent product in user watchlist', async () => {
    const User = await getUserModel()

    const user = await User.create({
      name: 'foo bar',
      email: 'foo@watchlist.com',
      password: '12345678'
    })

    const jwt = user.signJWT()

    const response = await request(app)
      .post('/user/watchlist/')
      .set('Authorization', 'Bearer ' + jwt)
      .send({ id: '41224d776a326fb40f000001' })

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Product not exists')
  })

  it('Should deny duplicated product in user watchlist', async () => {
    await seedProduct()
    const User = await getUserModel()
    const Product = await getProductModel()

    const product = await Product.findOne({})
    const user = await User.create({
      name: 'foo bar',
      email: 'foo@watchlist.com',
      password: '12345678'
    })

    const jwt = user.signJWT()

    await request(app)
      .post('/user/watchlist/')
      .set('Authorization', 'Bearer ' + jwt)
      .send({ id: product._id })

    const response = await request(app)
      .post('/user/watchlist/')
      .set('Authorization', 'Bearer ' + jwt)
      .send({ id: product._id })

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Product already saved')
  })

  it('Should add a product in user watchlist', async () => {
    await seedProduct()
    const User = await getUserModel()
    const Product = await getProductModel()

    const product = await Product.findOne({})
    const user = await User.create({
      name: 'foo bar',
      email: 'foo@watchlist.com',
      password: '12345678'
    })

    const jwt = user.signJWT()

    const response = await request(app)
      .post('/user/watchlist/')
      .set('Authorization', 'Bearer ' + jwt)
      .send({ id: product._id })

    const userTest = await User.findOne({ _id: user.id })

    expect(userTest.watchlist.length).toBe(1)
    expect(response.status).toBe(201)
  })

  it('Should return user watchlist', async () => {
    await seedProduct()
    const User = await getUserModel()
    const Product = await getProductModel()

    const products = await Product.find({}).limit(4)
    const user = await User.create({
      name: 'foo bar',
      email: 'foo@watchlist.com',
      password: '12345678',
      watchlist: products
    })

    const jwt = user.signJWT()

    const response = await request(app)
      .get('/user/watchlist/')
      .set('Authorization', 'Bearer ' + jwt)

    expect(response.status).toBe(200)
    expect(response.body.products.length).toBe(4)
    expect(response.body.products[0]).toHaveProperty('image')
    expect(response.body.products[0]).toHaveProperty('title')
    expect(response.body.products[0]).toHaveProperty('reviewScore')
    expect(response.body.products[0]).toHaveProperty('price')
    expect(response.body.products[0]).toHaveProperty('id')
  })
  it('Should block request with invalid token', async () => {
    const response = await request(app)
      .get('/user/')
      .set('Authorization', 'Bearer invalid-token')

    expect(response.status).toBe(401)
    expect(response.body.error).toBe('Token invalid')
  })

  it('Should block request without a valid token', async () => {
    const testEmail = 'foobar@spam.com'
    const testPass = '123456'
    const userModel = await getUserModel()

    const user = await userModel.create({
      name: 'foo bar',
      email: testEmail,
      password: testPass
    })

    const response = await request(app)
      .get('/user/')
    expect(response.status).toBe(401)
    expect(response.body.error).toBe('Token not provided')
  })

  it('Should authenticate with a valid token', async () => {
    const testEmail = 'foobar@spam.com'
    const testPass = '123456'
    const userModel = await getUserModel()

    const user = await userModel.create({
      name: 'foo bar',
      email: testEmail,
      password: testPass
    })

    const jwt = user.signJWT()

    const response = await request(app)
      .get('/user/')
      .set('Authorization', 'Bearer ' + jwt)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('email')
  })

  it('Should block with invalid email', async () => {
    const testEmail = 'foobar@spam.com'
    const testPass = '123456'
    const userModel = await getUserModel()

    const user = await userModel.create({
      name: 'foo bar',
      email: testEmail,
      password: testPass
    })
    const response = await request(app)
      .post('/user/auth')
      .send({
        email: 'wrongmail@test.com',
        password: testPass
      })

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('error')
  })

  it('Should block with invalid password', async () => {
    const testEmail = 'foobar@spam.com'
    const testPass = '123456'
    const userModel = await getUserModel()

    const user = await userModel.create({
      name: 'foo bar',
      email: testEmail,
      password: testPass + '333'
    })

    const response = await request(app)
      .post('/user/auth')
      .send({
        email: testEmail,
        password: testPass
      })

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('error')
  })

  it('Should authenticate with valid credentials', async () => {
    const testEmail = 'foobar@spam.com'
    const testPass = '123456'
    const userModel = await getUserModel()

    await userModel.create({
      name: 'foo bar',
      email: testEmail,
      password: testPass
    })

    const response = await request(app)
      .post('/user/auth')
      .send({
        email: testEmail,
        password: testPass
      })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
  })
})

describe('Register', () => {
  it('should validade user is registered successfully', async () => {
    const response = await request(app)
      .post('/user/register')
      .send({
        name: 'foo bar',
        email: 'foobar@gmail.com',
        password: '123456'
      })

    expect(response.status).toBe(201)
  })

  it('should validate email already exists', async () => {
    const testEmail = 'foo@bar.com.br'
    const userModel = await getUserModel()

    await userModel.create({
      name: 'foo bar',
      email: testEmail,
      password: '1234'
    })

    const response = await request(app)
      .post('/user/register')
      .send({
        name: 'foo bar',
        email: testEmail,
        password: '1234'
      })

    expect(response.status).toBe(400)
    expect(response.body.error).toEqual('`email` already in use')
  })

  it('should validade email format', async () => {
    const response = await request(app)
      .post('/user/register')
      .send({
        name: 'foo bar',
        email: 'invalidmail.in',
        password: '1234'
      })

    expect(response.status).toBe(400)
    expect(response.body.error).toEqual('Path `email` is invalid (invalidmail.in).')
  })

  it('Should vaildate name is not empty', async () => {
    const response = await request(app)
      .post('/user/register')
      .send({
        email: 'foo@bar.com.br',
        password: '1234'
      })

    expect(response.status).toBe(400)
    expect(response.body.error).toEqual('Path `name` is required.')
  })

  it('Should vaildate password is not empty', async () => {
    const response = await request(app)
      .post('/user/register')
      .send({
        email: 'foo@bar.com.br',
        name: 'Foo Bar'
      })

    expect(response.status).toBe(400)
    expect(response.body.error).toEqual('Path `password` is required.')
  })
})
