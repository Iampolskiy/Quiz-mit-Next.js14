'use client';

import ShowQuestion from './ShowQuestion';
import { useEffect, useState } from 'react';
import { toUpperCase } from '../lib/helpers/helpers';
import type {
	Category,
	TriviaCategoriesResponse,
} from '@/types/categorie-types';
import NumberOfQuestSlideBtn from './NumberOfQuestSlideBtn';

export default function SelectCategiries() {
	const [categoryForSlider, setCategoryForSlider] = useState(0);

	const [fetchedCategories, setFetchedCategories] = useState<Category[]>([]);
	const [selectedCategorie, setSelectedCategorie] = useState<Category>();
	const [showCategories, setShowCategories] = useState(false);

	const [questions, setQuestions] = useState<Category[]>([]);
	const [showQuestionNumber, setShowQuestionNumber] = useState(false);
	const [nrOfQuestions, setNrOfQuestions] = useState<number>(3);

	const [disabledButton, setDisabledButton] = useState(false);
	const [difficulty, setDifficulty] = useState('easy');
	const [difficultyLevel, setDifficultyLevel] = useState(1);
	const [quizType, setQuizType] = useState('multiple');
	const [typeLevel, setTypeLevel] = useState(0);
	const [categoryButtonText, setCategoryButtonText] = useState('Random');
	const [visible, setVisible] = useState(true);

	/* fetch Categories */
	async function fetchQuizCategories() {
		try {
			const response = await fetch('https://opentdb.com/api_category.php');
			if (response) {
				console.log('categories fetch OK');
			}
			const jsonData = (await response.json()) as TriviaCategoriesResponse;

			setFetchedCategories(jsonData.trivia_categories);
		} catch (error) {
			console.log(error);
		}
	}
	useEffect(() => {
		fetchQuizCategories();
	}, []);

	async function fetchQuizQuestions() {
		console.log(selectedCategorie);
		const mainUrl = 'https://opentdb.com/api.php?';

		const amountUrl = `amount=${nrOfQuestions}`;
		const codeUrl = `&encode=url3986`;
		const categoryUrl = selectedCategorie?.id
			? `&category=${selectedCategorie.id}`
			: '';

		const difficultUrl =
			difficulty !== undefined ? `&difficulty=${difficulty}` : '';
		const quizTypeUrl = quizType !== 'random' ? `&type=${quizType}` : '';
		const urlString = `${mainUrl}${amountUrl}${categoryUrl}${difficultUrl}${quizTypeUrl}`;
		console.log(urlString);

		try {
			const response = await fetch(urlString);
			if (response) {
				console.log('questions fetch OK');
			}
			const jsonData = (await response.json()) as TriviaCategoriesResponse;
			console.log(jsonData);
			console.log(jsonData.response_code);
			if (jsonData.response_code === 1) {
				console.log(jsonData.response_code);
				alert(
					'Not enough questions available. Pls lower the amount of questions or select a different category.'
				);
				setVisible(true);
			}
			const questions = jsonData.results;
			setQuestions(questions);
		} catch (error) {
			console.log(error);
		}

		setDisabledButton(true);
		setTimeout(() => {
			setDisabledButton(false);
		}, 5000);
	}

	const handleQuestionNumberChange = (
		e: React.ChangeEvent<HTMLSelectElement> | any
	) => {
		const selectedQuestionNumber = parseInt(e.target.value);
		setNrOfQuestions(selectedQuestionNumber);
		console.log(selectedQuestionNumber);
		setShowQuestionNumber(!showQuestionNumber);
	};

	const handleCategoriesChange = (
		e: React.ChangeEvent<HTMLSelectElement> | any
	) => {
		const selectedCatName = e.target.value;
		console.log(e.target.value);
		const category = fetchedCategories.find((c) => c.name === selectedCatName);

		if (!category) {
			return;
		}
		setSelectedCategorie(category);

		setCategoryForSlider(fetchedCategories.indexOf(category));

		setShowCategories(false);
		console.log(categoryForSlider);
		console.log(category);
	};

	const handleDifficultyButton = (e: React.MouseEvent<HTMLButtonElement>) => {
		const difficultyLevelArray = ['random', 'easy', 'medium', 'hard'];
		setDifficultyLevel(difficultyLevel < 3 ? difficultyLevel + 1 : 0);
		setDifficulty(difficultyLevelArray[difficultyLevel + 1]);
	};
	const handleTypeButton = () => {
		const quizTypeArray = ['multiple', 'boolean', 'random'];
		setTypeLevel(typeLevel < 2 ? typeLevel + 1 : 0);
		setQuizType(quizTypeArray[typeLevel]);
	};

	() => setCategoryButtonText(selectedCategorie as any);

	const selectedCat = fetchedCategories[categoryForSlider];
	const changeCategoryUp = () => {
		const nextIndex = categoryForSlider + 1;
		if (nextIndex >= fetchedCategories.length) {
			setCategoryForSlider(0);
			setSelectedCategorie(fetchedCategories[0]);
		} else {
			setCategoryForSlider(nextIndex);
			setSelectedCategorie(fetchedCategories[nextIndex]);
		}
		console.log(categoryForSlider);
	};

	const changeCategoryDown = () => {
		const nextIndex = categoryForSlider - 1;
		if (nextIndex < 0) {
			const lastIndex = fetchedCategories.length - 1;
			setCategoryForSlider(lastIndex);
			setSelectedCategorie(fetchedCategories[lastIndex]);
		} else {
			setCategoryForSlider(nextIndex);
			setSelectedCategorie(fetchedCategories[nextIndex]);
		}
		console.log(categoryForSlider);
	};

	type questionNumbersArray = number[];
	const setNumberOfQuestions = (newValue: number) => {
		setNrOfQuestions(newValue);
	};

	const questionNumbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	console.log(nrOfQuestions);

	if (!nrOfQuestions) {
		setNrOfQuestions(0);
	}

	return (
		<>
			<div className={visible ? 'all' : 'none'}>
				<div className="menuButton_type">
					<button onClick={() => handleTypeButton()}>
						Type {toUpperCase(quizType)}
					</button>
				</div>
				<div className="menuButton_level">
					<button
						onClick={(e) => {
							handleDifficultyButton(e);
						}}
					>
						{toUpperCase(difficulty)}
					</button>
				</div>
				<div className="menuButton_showCat menuButton_number">
					<button className="minusButton" onClick={() => changeCategoryDown()}>
						-
					</button>
					<button onClick={() => setShowCategories(!showCategories)}>
						{selectedCategorie?.name
							? selectedCategorie.name
							: 'Categorie: Random'}
					</button>
					<button className="plusButton" onClick={() => changeCategoryUp()}>
						+
					</button>
				</div>
				{/* <div className="menuButton_number">
					<button
						className="minusButton"
						disabled={nrOfQuestions <= 1}
						onClick={() => setNrOfQuestions(nrOfQuestions - 1)}
					>
						-
					</button>
					<div className="buttonStyle">
						{' '}
						{nrOfQuestions < 2 ? 'Question' : 'Questions'} {nrOfQuestions}
					</div>
					<button
						className="plusButton"
						onClick={() => setNrOfQuestions(nrOfQuestions + 1)}
					>
						+
					</button>
				</div> */}
				{/* ________________________________________________________________________________________ */}
				<NumberOfQuestSlideBtn
					setNumberOfQuestions={setNumberOfQuestions}
					questionNumbersArray={questionNumbersArray}
					nrOfQuestions={nrOfQuestions}
					setShowQuestionNumber={setShowQuestionNumber}
					showQuestionNumber={showQuestionNumber}
				/>
				{/* ________________________________________________________________________________________ */}
				<div className="menuButton_start">
					<button
						className="buttonStyle startQuiz"
						disabled={disabledButton}
						onClick={() => {
							fetchQuizQuestions();
							setVisible(false);
						}}
					>
						Start Quiz
					</button>
				</div>
				{showCategories && (
					<div className="showCategories">
						{fetchedCategories.map(({ name, id }) => {
							return (
								<button
									className="categorieButton"
									key={id}
									onClick={(e) => {
										handleCategoriesChange(e);
									}}
									value={name}
								>
									{name}
								</button>
							);
						})}
						<button
							className="categorieButton"
							onClick={() => {
								setSelectedCategorie(undefined),
									setShowCategories(false); /* !!!!! */
							}}
						>
							Random
						</button>
					</div>
				)}
				{showQuestionNumber && (
					<div className="showCategories">
						{questionNumbersArray.map((nr) => {
							return (
								<button
									className="categorieButton"
									key={nr}
									onClick={(e) => {
										handleQuestionNumberChange(e);
									}}
									value={nr}
								>
									{nr}
								</button>
							);
						})}
						{/* <button
							className="categorieButton"
							onClick={() => {
								setNrOfQuestions(undefined), setShowQuestionNumber(false);
							}}
						>
							Random
						</button> */}
					</div>
				)}
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
			</div>
			<ShowQuestion
				questions={questions}
				/* selectedCategorieID={selectedCategorie.id} */
				nrOfQuestions={nrOfQuestions}
				selectedCategorie={selectedCategorie}
				difficulty={difficulty}
				quizType={quizType}
			/>
		</>
	);
}
