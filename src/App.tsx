import type { Component } from 'solid-js';
import { SurrealProvider } from './lib/providers/surrealdb';
import { QueryClientProvider } from '@tanstack/solid-query';
import { tanstackClient } from './lib/query-client';
import { Navbar } from './components/Navbar';
import { AuthProvider } from './lib/providers/auth';

const App: Component = () => {
	return (
		<QueryClientProvider client={tanstackClient}>
			<SurrealProvider
				endpoint='http://127.0.0.1:8000'
				autoConnect
			>
				<AuthProvider>
					<Navbar />
				</AuthProvider>
			</SurrealProvider>
		</QueryClientProvider>
	);
};

export default App;
