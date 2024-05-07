'use server';
import prisma from '@/prisma/db';

export async function gameOver(score: number, yourWon: string) {
	const newField = await prisma.incorectAnswers.create({
		data: {
			username: 'alex',
			score: score,
			win: yourWon,
			date: new Date(),
		},
	});
	return newField;
}

export async function findUsers() {
	const users = await prisma.incorectAnswers.findMany({
		orderBy: { date: 'desc' },
	});
	return users;
}
