import { RecordId } from "surrealdb";

export type Poll = {
	id: RecordId<"poll">;
	title: string;
	creator: RecordId<"user">;
	closesAt: Date;
}

export type PollPayload = {
	title: string;
	questions: string[];
	closesAt?: Date;
};