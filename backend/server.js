const express = require('express')
const dbConnect = require('./dbConnect')
const userRoutes = require('./routes/userRoutes')
const transactionRoutes = require('./routes/transactionRoutes')
const path = require('path')
const cors = require('cors')
const app = express()
app.use(express.json())
const port = process.env.PORT || 5000

// Allow requests from http://localhost:3000
app.use(
  cors({
    origin: ["http://localhost:3000", "https://xpendly-g5ol.vercel.app/"],
    credentials: true, // only needed if you're using cookies/auth headers
  })
);

app.use('/api/users/', userRoutes)
app.use('/api/transactions/', transactionRoutes)

app.get('/', (req, res) => {
  res.send({
    activeStatus: 'true',
    error:false,
  })
})


app.listen(port, () => {
  console.log(`Server are running on port ${port}`)
})