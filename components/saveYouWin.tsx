import type { ShowQuestionProps } from '@/types/categorie-types';
import { toUpperCase } from '../lib/helpers/helpers';
import '@animxyz/core';
/* import { useEffect } from 'react'; */
import { gameOver } from './serverActions/scoreServerAction';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import TypeUsername from './TypeUsername';
import { useState } from 'react';

export default function YouWin({
	correctAnswersInRow = 0,
	incorrectAnswers = 0,
	selectedCategorie,
	difficulty,
	quizType,
}: ShowQuestionProps) {
	const { isSignedIn, user, isLoaded } = useUser();
	const [username, setUsername] = useState('');
	function reload() {
		location.reload();
	}

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
		/* const email = user.emailAddresses[0].emailAddress; */

		gameOver(score, youWon, username /* email */);
		/* console.log(user.username);
		console.log(user.emailAddresses[0]?.emailAddress); */

		/* delete BTN */
		console.log(username);
	}
	return (
		<>
			<div className="info-container">
				{/* <div>{!username ? <input type="text" /> : username}</div> */}
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

			{/* className="question xyz-in" xyz="fade up delay-2" */}
			<div className="newGame xyz-in delay-4" xyz="fade up delay-2">
				<button className="newGameBtn" onClick={reload}>
					New Game
				</button>

				{/* {!user?.username ? (
					<>
						<h4>Enter your username</h4>
						<input
							type="text"
							name="username"
							id="username"
							placeholder="Bitte Benutzernamen eingeben"
							onChange={(e) => {
								setUsername(e.target.value);
							}}
						/>
					</>
				) : (
					<div>
						<button onClick={() => handleInsertInDb()}>Add to DB</button>
					</div>
				)} */}

				{username && (
					<button onClick={() => handleInsertInDb()}>Add to DB</button>
				)}
				{user?.username && (
					<button onClick={() => handleInsertInDb()}>
						Add to DBuser.username
					</button>
				)}

				<Link href="/score" className="newGameBtn">
					<div className="button">Rangliste</div>
				</Link>
			</div>
			<div className="info-container2YW">
				<div className="emojiHand"> 👍 {correctAnswersInRow}</div>
				<div className="emojiHand"> 👎 {incorrectAnswers}</div>
				<div>SCORE {score}</div>
			</div>
		</>
	);
}
