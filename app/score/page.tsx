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
			<h2>Score Page</h2>
			<table>
				<thead>
					<tr>
						<th>Score</th>
						<th>Username</th>
						<th>Wins</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id}>
							<td>{user.score}</td>
							<td>{user.username}</td>
							<td>{user.win}</td>
							<td>{user.date.toLocaleString()}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
