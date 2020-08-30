const express = require('express')
const cors = require('cors')  // Allows AJAX requests to skip the same-origin policy
const path = require('path')


// Create the Express app and add middleware
const app = express()
app.use(cors())
app.use(express.json())  // Enable JSON parsing


// Require the routes file and forward "<root url>/api" requests
const apiRouter = require('./apiRouter')
app.use('/api', apiRouter)


// Build and serve /client
app.use(express.static('client/build'))
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'))
})


// Start the Express server
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server listening on port ${port}...`))
