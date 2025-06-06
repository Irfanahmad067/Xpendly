const express = require('express')
const dbConnect = require('./dbConnect')
const userRoutes = require('./routes/userRoutes')
const transactionRoutes = require('./routes/transactionRoutes')
const path = require('path')
const app = express()
app.use(express.json())
const port = process.env.PORT || 5000

app.use('/api/users/', userRoutes)
app.use('/api/transactions/', transactionRoutes)


app.listen(port, () => {
  console.log(`Server are running on port ${port}`)
})