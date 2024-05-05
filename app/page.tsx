import type { Metadata } from 'next';
import SelectCategiries from '@/components/SelectCategories';

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
