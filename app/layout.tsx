import '@/css/style.css';
import type { ReactNode } from 'react';
import { Karla, Merriweather } from 'next/font/google';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

const karlaStyles = Karla({
	subsets: ['latin'],
	weight: ['500', '800'],
	style: 'normal',
	display: 'swap',
	variable: '--font-karla',
});

const merriweatherStyles = Merriweather({
	subsets: ['latin'],
	weight: ['300', '400', '700', '900'],
	style: ['italic', 'normal'],
	display: 'swap',
	variable: '--font-merriweather',
});

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="de">
			<body
				className={`${karlaStyles.variable} ${merriweatherStyles.variable}`}
			>
				<div className="site-wrapper">
					<Header />
					<div className="site-content">{children}</div>
					<Footer />
				</div>
			</body>
		</html>
	);
}
