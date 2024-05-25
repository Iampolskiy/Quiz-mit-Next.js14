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
			<table>
				<thead>
					<tr className="score_fieldnames">
						<th className="score_fieldname">Username</th>
						<th className="score_fieldname">Score</th>
						{/* <th className="score_fieldname">Wins</th> */}
						<th className="score_fieldname">Date</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id}>
							<td className="score_value">{user.username}</td>
							<td className="score_value">{user.score}</td>
							{/* <td className="score_value">{user.win}</td> */}
							<td className="score_value">{user.date.toLocaleString()}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
