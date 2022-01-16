const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const sg = require('@sendgrid/mail')
const app = express()
const port = 3000

sg.setApiKey(process.env.API_KEY)

const jsonParser = bodyParser.json()

app.use(cors())

app.use((req, res, next) => {
  try {
    console.log(`${req.method} ${req.url}`)
  } catch {}
  next()
})

app.post('/request', jsonParser, async (req, res) => {
  console.log(JSON.stringify(req.body))
  await sg.send(req.body)

  try {
    console.log(`Sent email for ${req.body.subject}`)
  } catch {}

  res.writeHead(200, {'Content-Type': 'text/html'})
  res.end('thanks')
})

app.listen(port, () => {
  console.log('Jellyfin Request Backend running')
})
