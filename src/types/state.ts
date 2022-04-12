import { IQuestion } from "./question";

export interface IState {
	getQuizId: string;
	getData: IQuestion[];
	getQuestions: Generator<IQuestion, void, undefined> | null;
	getProgress: number;
	getScore: {
		correct: number;
		total: number;
	};
	getGlobalAverageScore: number;
	incrementScore: () => this;
	incrementTotal: () => this;
	resetScore: () => this;
	incrementProgress: () => this;
	resetProgress: () => this;
	randomise: () => this;
	createGenerator: () => this;
}
