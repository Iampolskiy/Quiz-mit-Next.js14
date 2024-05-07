'use client';
import { toUpperCase } from '@/lib/helpers/helpers';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { SignInButton, SignOutButton } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
export default function Header() {
	const { isSignedIn, user, isLoaded } = useUser();
	console.log(user?.username);

	return (
		<>
			{/* <h2>Anmelden</h2> */}

			<header className="site-header">
				<div className="login-logout-button flex">
					<SignedOut>
						<SignInButton>Sign in</SignInButton>
					</SignedOut>
					<SignedIn>
						<SignOutButton>Sign out</SignOutButton>
					</SignedIn>
					<h4>
						{user?.username
							? ' Username:' + ' ' + toUpperCase(user?.username)
							: 'You need to sign in'}
					</h4>
				</div>
			</header>
		</>
	);
}
