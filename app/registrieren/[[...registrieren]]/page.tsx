import { SignUp } from '@clerk/nextjs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Registrieren',
};

export default function Page() {
	<h2>Registrieren</h2>;
	return <SignUp path="/registrieren" />;
}
