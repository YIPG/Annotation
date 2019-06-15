jest.setTimeout(30000)

const mongoose = require('mongoose')
mongoose.connect('mongodb://mongo:27017/annotation', {
  useNewUrlParser: true,
})
