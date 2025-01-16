import Surreal from "surrealdb";
import { PollQuestion } from "~/types/pollQuestion";
import { POLL_QUESTION_TABLE } from "../tables";

export async function* createPollQuestions(
	db: Surreal,
	data: string[]
): AsyncGenerator<PollQuestion> {
	for await (const question of data) {
		yield await db.create<PollQuestion, Pick<PollQuestion, "question">>(
			POLL_QUESTION_TABLE,
			{ question }
		).then(([question]) => question);
	}
}