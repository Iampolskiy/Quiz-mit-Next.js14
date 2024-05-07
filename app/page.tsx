import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SelectCategiries from '@/components/SelectCategories';
import { SignInButton } from '@clerk/nextjs';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Quiz',
};

export default function quiz() {
	return (
		<>
			<div className="marginTop">
				<SelectCategiries />
			</div>
		</>
	);
}
