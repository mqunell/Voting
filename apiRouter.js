const router = require('express').Router()
const axios = require('axios')


const ipAddresses = []

const totalVotes = {
	firstChoice: [],
	secondChoice: [],
	thirdChoice: []
}


router.route('').post((req, res) => {
	const ip = req.ip
	const votes = req.body

	if (ipAddresses.includes(ip)) {
		res.status(403).send('already voted')
		return;
	}

	//ipAddresses.push(ip)

	for (let key in totalVotes) {
		totalVotes[key].push(votes[key])
	}

	res.status(200).send('ok')
})

router.route('').get((req, res) => {
	['firstChoice', 'secondChoice', 'thirdChoice'].forEach(key => {
		totalVotes[key] = totalVotes[key].sort()
	})

	res.status(200).json({ ipAddresses, totalVotes })
})


module.exports = router
