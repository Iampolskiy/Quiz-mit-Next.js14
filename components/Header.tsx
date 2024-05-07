'use client';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { SignInButton, SignOutButton } from '@clerk/nextjs';

export default function Header() {
	return (
		<>
			{/* <h2>Anmelden</h2> */}

			<header className="site-header">
				<div className="login-logout-button">
					<SignedOut>
						<SignInButton>Anmelden</SignInButton>
					</SignedOut>
					<SignedIn>
						<SignOutButton>Abmelden</SignOutButton>
					</SignedIn>
				</div>
			</header>
		</>
	);
}
