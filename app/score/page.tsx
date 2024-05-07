import { findUsers } from '@/components/serverActions/scoreServerAction';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Score',
};

export default async function ScorePage() {
	const users = await findUsers();
	console.log(users);

	return (
		<>
			<div>Score Page</div>
			<p>{}</p>
			{users.map((user) => (
				<div key={user.id}>
					<p>Username: {user.username} </p>
					<p>Won: {user.win}</p>
					<p>Score: {user.score}</p>
					<p>Date: {user.date.toLocaleString()}</p>
				</div>
			))}
		</>
	);
}
