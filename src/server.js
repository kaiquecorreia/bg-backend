const app = require('./app')
app.listen(process.env.PORT || 3389, () => {
  console.log('Express Running')
})
