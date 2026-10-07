import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import locationsRouter from './routes/locations.js'
import eventsRouter from './routes/events.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/locations', locationsRouter)
app.use('/api/events', eventsRouter)

app.get('/', (req, res) => {
  res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">Tampa Craft API</h1>')
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})