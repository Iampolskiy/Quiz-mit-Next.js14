export type Category = {
	id: number;
	name: string;
	question: string;
	correct_answer: string;
	incorrect_answers: string[];
};

export type Question = {
	id: number;
	question: string;
	correct_answer: string;
	incorrect_answers: string[];
	nrOfQuestions?: number;
	correctAnswersInRow?: number;
};

export type TriviaCategoriesResponse = {
	trivia_categories: Category[];
	response_code: number;
	results: Category[];
};

export type selectedCategorie = String;

export type ShowQuestionProps = {
	questions?: Question[];
	nrOfQuestions?: number;
	selectedCategorie?: Category;
	correctAnswersInRow?: number;
	incorrectAnswers?: number;
	difficulty: string;
	quizType: string;
	score?: number;
};

export type questionNumbersArray = number[];

export type showNumbers = boolean;

/* 
"trivia_categories": [
    {
      "id": 9,
      "name": "General Knowledge"
    },
    {
      "id": 10,
      "name": "Entertainment: Books"
    }, */
