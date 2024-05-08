'use client';
import { toUpperCase } from '@/lib/helpers/helpers';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { SignInButton, SignOutButton } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useState } from 'react';
export default function Header() {
	const { isSignedIn, user, isLoaded } = useUser();
	const [username, setUsername] = useState('');

	return (
		<>
			<header className="site-header">
				<div className="login-logout-button ">
					{user?.username
						? 'User: ' + ' ' + toUpperCase(user.username)
						: username}

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
