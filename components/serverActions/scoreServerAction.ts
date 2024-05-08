'use server';
import prisma from '@/prisma/db';

export async function gameOver(
	score: number,
	yourWon: string,
	username: any
	/* email: string */
) {
	const newField = await prisma.incorectAnswers.create({
		data: {
			username: username,
			score: score,
			win: yourWon,
			date: new Date(),
		},
	});
	return newField;
}

export async function findUsers() {
	const users = await prisma.incorectAnswers.findMany({
		orderBy: { score: 'desc' },
	});
	return users;
}
