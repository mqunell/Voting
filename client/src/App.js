import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

class App extends Component {
	state = {
		choices: ['first', 'second', 'third'],
		allGames: ['GWYF', 'KTANE', 'JPP', 'RL', 'DST', 'OW', 'AU', 'PP', 'WWMD'],
		selectedGames: []
	}

	selectGame(game) {
		const { selectedGames } = this.state

		if (selectedGames.length >= 3 || selectedGames.includes(game)) return;

		selectedGames.push(game)

		this.setState({ selectedGames })
	}

	submit() {
		const { choices, selectedGames } = this.state

		const postData = {}

		for (let i = 0; i < choices.length; i++) {
			postData[choices[i] + 'Choice'] = selectedGames[i]
		}

		axios.post('/api', postData)
			.then(response => {
				console.log(response)
			})
			.catch(error => {
				console.log(error)
			})
	}

	reset() {
		this.setState({ selectedGames: [] })
	}

	render() {
		const { choices, allGames, selectedGames } = this.state
		const choicesIndex = selectedGames.length

		return (<>
			<h1 style={choicesIndex >= 3 ? { opacity: 0 } : {}}>Select your {choices[choicesIndex]} choice</h1>
			<div className="vote_grid">
				{allGames.map((game) => (

					<div key={game} className={'vote_item c-v' + (selectedGames.includes(game) ? ' vote_item_clicked' : '')} onClick={() => this.selectGame(game)}>
						<p className="vote_item_text">{game}</p>
						<p className="vote_item_number">{selectedGames.indexOf(game) + 1}</p>
					</div>
				))}
			</div>
			<div className="buttons">
				<button type="button" className="btn btn-light" disabled={choicesIndex < 3} onClick={() => this.submit()}>Submit</button>
				<button type="button" className="btn btn-light" onClick={() => this.reset()}>Reset</button>
			</div>
		</>);
	}
}

export default App;
