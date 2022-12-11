const Pool = require('pg').Pool
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'contactdb',
	password: 'root',
	port: 5432
})


// #Mail de remerciement
// Merci pour l'accueil
// remercier du temps qu'il nous ont accordé
// renouveller sa motivation


const getContacts = (request, response) => {
	pool.query(
		'SELECT * FROM contacts ORDER BY id ASC',
		(error, results) => {
			if (error) {
				throw error
			}
			response.status(200).json(results.rows)
		}
		)
}

const createContact = (request, response) => {
	const { nom, prenom, numero, photo_path, email, data_naiss, adresse } = request.body

	pool.query(
		'INSERT INTO contacts (nom, prenom, numero, photo_path, email, date_naiss, adresse)' + 
		'VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', 
		[nom, prenom, numero, photo_path, email, data_naiss, adresse],
		(error, results) => {
			if (error) {
				throw error
			}
			response.status(201).send(`Contact created with ID: ${results.rows[0].id}`)
		}
	)
}

const updateContact = (request, response) => {
	const id = parseInt(request.params.id)
	const { nom, prenom, numero, photo_path, email, data_naiss, adresse } = request.body

	pool.query(
		'UPDATE contacts SET nom = $1, prenom = $2, numero= $3, photo_path = $4, email = $5, date_naiss = $6, adresse = $7 WHERE id = $8',
		[nom, prenom, numero, photo_path, email, data_naiss, adresse, id],
		(error, results) => {
			if (error) {
				throw error
			}
			response.status(200).send(`Contact updated with id:${id}`)
		}
	)
} 

const getContactById = (request, response) => {
	const id = parseInt(request.params.id)
	
	pool.query(
		'SELECT * FROM contacts WHERE id = $1', 
		[id],
		(error, results) => {
			if (error) {
				throw error
			}
		}, 
		response.status(200).json(results.rows)
	)
}

const deleteContactById = (request, response) => {
	const id = request.params.id

	pool.query(
		'DELETE FROM contacts WHERE id = $1',
		[id],
		(error, results) => {
			if (error) {
				throw error
			}
		},
		response.status(200).send(`Contact deleted with id: ${id}`)
	)
}

const deleteAllContacts = (request, response) => {

	pool.query(
		'DELETE * FROM contacts',
		(error, results) => {
			if (error) {
				throw error
			}
		},
		response.status(200).send('All Contacts deleted')
	)
}

module.exports = {
	getContactById,
	getContacts,
	updateContact,
	createContact,
	deleteContactById,
	deleteAllContacts
}