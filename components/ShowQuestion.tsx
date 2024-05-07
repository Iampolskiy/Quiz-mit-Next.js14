import '@animxyz/core';
import YouWin from './YouWin';
import { useEffect, useState } from 'react';
import { toUpperCase, decodeHtmlEntities } from '../lib/helpers/helpers';

import type { ShowQuestionProps } from '@/types/categorie-types';

export default function ShowQuestion({
	questions,
	nrOfQuestions,
	/* endQuiz, */
	quizType,
	difficulty,
	selectedCategorie,
}: ShowQuestionProps) {
	const [correctAnswersInRow, setCorrectAnswersInRow] = useState<number>(0);
	const [answersArray, setAnswersArray] = useState<string[]>([]);
	const [question, setQuestion] = useState('');
	const [correctAnswer, setCorrectAnswer] = useState('');
	const [buttonsDisabled, setButtonsDisabled] = useState(false);
	const [incorrectAnswers, setIncorrectAnswers] = useState(0);
	const [answerStatus, setAnswerStatus] = useState('');
	const [disableWrongAnswers, setDisableWrongAnswers] = useState(false);

	useEffect(() => {
		if (!questions || !nrOfQuestions) {
			return;
		}
		if (questions.length > 0 && correctAnswersInRow < nrOfQuestions) {
			const incorrectAnswers = questions[correctAnswersInRow].incorrect_answers;
			const question = decodeHtmlEntities(
				questions[correctAnswersInRow].question
			);
			const correctAnswer = decodeHtmlEntities(
				questions[correctAnswersInRow].correct_answer /* + '!!!!' */
			);
			const newAnswersArray = [...incorrectAnswers, correctAnswer].sort(
				() => Math.random() - 0.5
			);
			setCorrectAnswer(correctAnswer);
			setAnswersArray(newAnswersArray);
			setQuestion(question);
		}
		/* sdf */
	}, [questions, correctAnswersInRow]);

	function checkAnswer(e: React.MouseEvent<HTMLButtonElement>) {
		const buttonText = e.currentTarget.textContent;
		if (correctAnswer === buttonText) {
			/* e.currentTarget.disabled = true; */
			/* e.currentTarget.style.backgroundColor = 'green'; */
			e.currentTarget.classList.add('correctAnswer');
			setAnswerStatus('correctAnswer');
			setDisableWrongAnswers(true);
			setTimeout(() => {
				setCorrectAnswersInRow(correctAnswersInRow + 1);
				setAnswersArray([]);
				setDisableWrongAnswers(false);
			}, 2000);
		} else {
			e.currentTarget.classList.add('incorrectAnswer');
			e.currentTarget.disabled = true;
			e.currentTarget.style.backgroundColor = 'red';
			setAnswerStatus('incorrectAnswer');
			setIncorrectAnswers(incorrectAnswers + 1);
			/* setTimeout(() => {}, 2000); */
		}

		/* const rightAnswers = correctAnswersInRow + 1;
		if (rightAnswers === nrOfQuestions) {
			() => setButtonsDisabled(true);
		} */
	}

	const fadeArrayAnswers = [
		'fade up left delay-1',
		'fade up up delay-2',
		'fade up up delay-3',
		'fade down right delay-4',
	];

	const score = correctAnswersInRow - incorrectAnswers;

	return (
		<>
			{correctAnswersInRow === nrOfQuestions ? (
				<YouWin
					correctAnswersInRow={correctAnswersInRow}
					incorrectAnswers={incorrectAnswers}
					selectedCategorie={selectedCategorie}
					difficulty={difficulty}
					quizType={quizType}
					score={score}
				/>
			) : (
				<div>
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
					<div className="info-container2">
						<div className="emojiHand"> 👍 {correctAnswersInRow}</div>
						<div className="emojiHand"> 👎 {incorrectAnswers}</div>
						<div>score {correctAnswersInRow - incorrectAnswers}</div>
						<div>
							questions {questions && questions.length - correctAnswersInRow}
						</div>
					</div>
					<div className="question xyz-in" xyz="fade up delay-2">
						{question}
					</div>
					<div className="answer_wrapper">
						{answersArray.map((answer, index) => (
							<button
								className=" answers xyz-in"
								xyz={fadeArrayAnswers[index]} //fade up left delay-1
								/* disabled={correctAnswersInRow === nrOfQuestions} */
								onClick={checkAnswer}
								key={answer}
								disabled={disableWrongAnswers}
							>
								<div>{decodeHtmlEntities(answer)}</div>
							</button>
						))}
					</div>
				</div>
			)}
		</>
	);
}
