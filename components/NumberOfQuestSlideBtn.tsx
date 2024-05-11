type Props = {
	questionNumbersArray: number[];
	setNumberOfQuestions: Function;
	nrOfQuestions: number;
};
export default function NumberOfQuestSlideBtn({
	questionNumbersArray,
	setNumberOfQuestions,
	nrOfQuestions,
}: Props) {
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

	console.log({ nrOfQuestions });

	return (
		<div className="menuButton_number">
			<button
				className="minusButton"
				/* disabled={questionNumbersArray <= 1} */
				onClick={() => handleButtonClickMinus()}
			>
				-
			</button>
			<div className="buttonStyle">
				{' '}
				{nrOfQuestions < 2 ? 'Question_comp' : 'Questions_comp'} {nrOfQuestions}
			</div>
			<button className="plusButton" onClick={() => handleButtonClickPlus()}>
				+
			</button>
		</div>
	);
}
