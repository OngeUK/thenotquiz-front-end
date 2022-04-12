import { IQuestion } from "./../types/question";
import { IState } from "./../types/state";
import { randomiser } from "./randomiser";

export class QuizState implements IState {
	quizId: string;
	data: IQuestion[];
	questions: Generator<IQuestion, void, undefined> | null;
	progress: number;
	score: {
		correct: number;
		total: number;
	};
	globalAverageScore: number;

	constructor(stateData: IStateData) {
		const { quizId, data, globalAverageScore } = stateData;

		this.quizId = quizId;
		this.data = data;
		this.questions = null;
		this.progress = 0;
		this.score = {
			correct: 0,
			total: 0,
		};
		this.globalAverageScore = globalAverageScore;
		this.createGenerator();
		this.randomise().createGenerator();
	}

	get getQuizId() {
		return this.quizId;
	}

	get getData() {
		return this.data;
	}

	get getQuestions() {
		return this.questions;
	}

	get getProgress() {
		return this.progress;
	}

	get getScore() {
		return this.score;
	}

	get getGlobalAverageScore() {
		return this.globalAverageScore;
	}

	incrementScore() {
		const { correct } = this.score;
		this.score = {
			...this.score,
			correct: correct + 1,
		};
		return this;
	}

	incrementTotal() {
		const { total } = this.score;
		this.score = {
			...this.score,
			total: total + 1,
		};
		return this;
	}

	resetScore() {
		this.score = {
			correct: 0,
			total: 0,
		};
		return this;
	}

	incrementProgress() {
		const { progress } = this;
		this.progress = progress + 1;
		return this;
	}

	resetProgress() {
		this.progress = 0;
		return this;
	}

	// Randomise questions order
	randomise() {
		const { data } = this;

		this.data = randomiser(data);
		return this;
	}

	// Use a generator to iterate through the quiz questions
	createGenerator() {
		const { data } = this;

		function* gen(steps: IQuestion[]) {
			while (true) yield* steps;
		}

		this.questions = gen(data);
		return this;
	}
}

export interface IStateData {
	quizId: string;
	data: IQuestion[];
	globalAverageScore: number;
}
