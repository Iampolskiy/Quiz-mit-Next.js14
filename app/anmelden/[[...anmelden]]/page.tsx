import { SignIn } from '@clerk/nextjs';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Anmelden',
};
export default function Page() {
	return (
		<>
			<h2>Anmelden</h2>
			<SignIn path="/anmelden" />;
		</>
	);
}
