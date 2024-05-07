import '@/css/style.css';
import type { ReactNode } from 'react';
import { Karla, Merriweather } from 'next/font/google';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ClerkProvider } from '@clerk/nextjs';

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
		<ClerkProvider>
			<html lang="de">
				<body
					className={`${karlaStyles.variable} ${merriweatherStyles.variable}`}
				>
					<Header />
					<div className="site-wrapper">
						<div className="site-content">{children}</div>
					</div>
					<Footer />
				</body>
			</html>
		</ClerkProvider>
	);
}
