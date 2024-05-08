import '@animxyz/core';
import type { ShowQuestionProps } from '@/types/categorie-types';
import { toUpperCase } from '../lib/helpers/helpers';
/* import { useEffect } from 'react'; */
import { gameOver } from './serverActions/scoreServerAction';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';

export default function YouWin({
	correctAnswersInRow = 0,
	incorrectAnswers = 0,
	selectedCategorie,
	difficulty,
	quizType,
}: ShowQuestionProps) {
	const [disable, setDisable] = useState(false);
	const { isSignedIn, user, isLoaded } = useUser();
	const [username, setUsername] = useState('');

	console.log(user?.username);

	let youWon: string;
	const score = correctAnswersInRow - incorrectAnswers;
	if (score > 0) {
		youWon = 'gewonnen';
	} else if (score === 0) {
		youWon = 'unentschienen';
	} else {
		youWon = 'verloren';
	}

	function handleInsertInDb() {
		gameOver(score, youWon, user?.username ?? username);
		setDisable(true);
	}
	return (
		<>
			<div className="info-container">
				<div>
					{selectedCategorie?.name
						? 'Category:' + selectedCategorie.name
						: 'Category: Random'}
				</div>
				<div>
					{difficulty
						? 'Difficulty:' + ' ' + toUpperCase(difficulty)
						: ' Difficulty: Random'}
				</div>
				<div>
					{quizType
						? 'Quiz Type:' + ' ' + toUpperCase(quizType)
						: 'Type: Random'}
				</div>
			</div>
			<div className="wonLost">
				{score > 0 ? (
					<h1 className="xyz-in" xyz="fade up">
						{' '}
						You won 💃🕺{' '}
					</h1>
				) : score === 0 ? (
					<h1 className="xyz-in" xyz="fade up">
						{' '}
						Its a draw 🤨
					</h1>
				) : (
					<h1 className="xyz-in" xyz="fade up">
						{' '}
						You lost 👎{' '}
					</h1>
				)}
			</div>
			<div className="result">
				<div
					className="scoreNumber  xyz-in  delay-2"
					xyz="fade up"
				>{`Your score is ${score}.`}</div>
				<div
					className="mistakesNumber xyz-in  delay-4"
					xyz="fade up"
				>{`You answered ${correctAnswersInRow} questions correctly and you made ${incorrectAnswers} mistakes in total.`}</div>
			</div>
			{!user?.username ? (
				<div className="usernameInput">
					<label htmlFor="username">
						Please enter your username to be included in the rankings
					</label>
					<input
						className="usernameInputField"
						type="text"
						name="username"
						id="username"
						placeholder="Username"
						onChange={(e) => {
							setUsername(e.target.value);
						}}
					/>
				</div>
			) : (
				<button
					disabled={disable}
					className="centered"
					onClick={() => handleInsertInDb()}
				>
					Add to Scorelist
				</button>
			)}

			{username && (
				<button
					className="centered"
					disabled={disable}
					onClick={() => handleInsertInDb()}
				>
					Add to Scorelist
				</button>
			)}

			<div className="info-container2YW">
				<div className="emojiHand"> 👍 {correctAnswersInRow}</div>
				<div className="emojiHand"> 👎 {incorrectAnswers}</div>
				<div>SCORE {score}</div>
			</div>
		</>
	);
}
