const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const db = require('./queries')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
	response.json({'info': 'Node.js, Express, and Postgres API'})
})

app.get('/contacts', db.getContacts)
app.get('/contacts/:id', db.getContactById)
app.post('/contacts', db.createContact)
app.put('/contacts/:id', db.updateContact)
app.delete('/contacts/:id', db.deleteContactById)
app.delete('/contacts', db.deleteAllContacts)


app.listen(port, () => {
	console.log(`App running on port ${port}.`)
})