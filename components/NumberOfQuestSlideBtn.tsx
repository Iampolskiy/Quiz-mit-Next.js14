type Props = {
	questionNumbersArray: number[];
	setNumberOfQuestions: Function;
	nrOfQuestions: any;
	setShowQuestionNumber: Function;
	showQuestionNumber: boolean;
};
export default function NumberOfQuestSlideBtn({
	questionNumbersArray,
	setNumberOfQuestions,
	nrOfQuestions,
	setShowQuestionNumber,
	showQuestionNumber,
}: /* jhgjhg */
Props) {
	/* const [nrInArray, setNrInArray] = useState(0); */
	if (!questionNumbersArray) return;
	const handleButtonClickMinus = () => {
		/* setNrInArray(nrInArray - 1); */
		setNumberOfQuestions(nrOfQuestions - 1);
		if (nrOfQuestions <= 1) {
			setNumberOfQuestions(questionNumbersArray.length);
		}
	};
	const handleButtonClickPlus = () => {
		setNumberOfQuestions(nrOfQuestions + 1);
		if (nrOfQuestions === questionNumbersArray.length) {
			setNumberOfQuestions(1);
		}
	};

	const handleButtonClickBtn = () => {
		return <h2>{nrOfQuestions}</h2>;
	};

	/* const handleCategoriesChange = (
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
		
	};

 */

	return (
		<div className="menuButton_number">
			<button
				className="minusButton"
				/* disabled={questionNumbersArray <= 1} */
				onClick={() => handleButtonClickMinus()}
			>
				-
			</button>
			<button
				onClick={() => setShowQuestionNumber(!showQuestionNumber)}
				className="buttonStyle"
			>
				{' '}
				{nrOfQuestions < 2 ? 'Question' : 'Questions'} {nrOfQuestions}
			</button>
			<button className="plusButton" onClick={() => handleButtonClickPlus()}>
				+
			</button>
		</div>
	);
}
