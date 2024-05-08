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
			<h1>Score Page</h1>
			<table>
				<thead>
					<tr>
						<th>Username</th>
						<th>Wins</th>
						<th>Score</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>
					{users
						/* .sort((a, b) => b.score - a.score) //  */
						.map((user) => (
							<tr key={user.id}>
								<td>{user.username}</td>
								<td>{user.win}</td>
								<td>{user.score}</td>
								<td>{user.date.toLocaleString()}</td>
							</tr>
						))}
				</tbody>
			</table>
		</>
	);
}
