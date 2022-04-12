import { QuizState } from "./../utils/quizState";

const mockQuestionsData = [
	{ h: "Lorum", s: "Lorem ipsum dolor sit amet", e: "consectetur adipiscing elit", a: 0 },
	{ h: "Eiusmod ", s: "Tempor incididunt ut labore", e: "Et dolore magna aliqua", a: 2000 },
	{ h: "Ut enim ad", s: "Minim veniam quis nostrud ", e: "exercitation ullamco laboris", a: 0 },
	{ h: "Nisi ut aliquip ", s: "Ex ea commodo consequat", e: "Duis aute irure dolor", a: 1995 },
	{ h: "Reprehenderit", s: "In voluptate velit esse", e: "Cillum dolore eu fugiat nulla pariatur", a: 0 },
];
const average = 80;
const testState = new QuizState({ quizId: "mock", data: mockQuestionsData, globalAverageScore: average });

test("getData returns mockQuestionsData", () => {
	expect(testState.getData).toBe(mockQuestionsData);
});

test("Increment progress - getProgress should return 1", () => {
	testState.incrementProgress();
	expect(testState.getProgress).toBe(1);
});

test("Reset progress - getProgress should return 0", () => {
	testState.resetProgress();
	expect(testState.getProgress).toBe(0);
});

test("Increment score - getScore should return 1", () => {
	testState.incrementScore();
	expect(testState.getScore.correct).toBe(1);
});

test("Reset score - getScore should return 0", () => {
	testState.resetScore();
	expect(testState.getScore.correct).toBe(0);
});

test("Increment total - getTotal should return 1", () => {
	testState.incrementTotal();
	expect(testState.getScore.total).toBe(1);
});

test("Reset score - getTotal should return 0", () => {
	testState.resetScore();
	expect(testState.getScore.total).toBe(0);
});
