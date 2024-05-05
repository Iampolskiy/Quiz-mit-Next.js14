export default function LoginPage() {
	return (
		<>
			<h2>Login Page</h2>
			<form action="">
				<div>
					<label htmlFor="username"> Username</label>
					<input type="text" name="username" />
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input type="password" name="password" />
				</div>
				<div>
					<button type="submit">Login</button>
				</div>
			</form>
		</>
	);
}
