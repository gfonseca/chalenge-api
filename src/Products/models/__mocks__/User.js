const User = jest.genMockFromModule('../User')

const create = () => {
  return {
    _id: '5e56d90c72e1013da954dc0a',
    name: 'Foo Bar',
    email: 'foo_bar@gmail.com',
    password: '123456',
    __v: 0
  }
}

User.create = create

module.exports = User
