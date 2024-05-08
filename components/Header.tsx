'use client';
import { toUpperCase } from '@/lib/helpers/helpers';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { SignInButton, SignOutButton } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import Link from 'next/link';
export default function Header() {
	const { isSignedIn, user, isLoaded } = useUser();
	const [username, setUsername] = useState('');

	function reload() {
		location.href = '/';
	}

	return (
		<>
			<header className="site-header">
				<div className="login-logout-button ">
					<button onClick={reload}>New Game</button>
					{user?.username ? (
						<div className="usernameSign">
							User:{' ' + toUpperCase(user.username)}
						</div>
					) : (
						username
					)}

					<Link className="button" href="/score">
						Rangliste
					</Link>

					<SignedOut>
						<SignInButton>Sign in</SignInButton>
					</SignedOut>

					<SignedIn>
						<SignOutButton>Sign out</SignOutButton>
					</SignedIn>
				</div>
			</header>
		</>
	);
}
