import type { Component } from 'solid-js';
import { Router, Routes, Route } from "@solidjs/router";
import { SurrealProvider } from './lib/providers/surrealdb';
import { QueryClientProvider } from '@tanstack/solid-query';
import { tanstackClient } from './lib/query-client';
import { Navbar } from './components/Navbar';
import { AuthProvider } from './lib/providers/auth';
import Home from './pages/Home';
import CreatePoll from './pages/CreatePoll';
import VotePoll from './pages/VotePoll';
import PollResults from './pages/PollResults';

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
				<Navbar />
				<Router>
					<Routes>
						<Route path="/" component={Home} />
						<Route path="/create" component={CreatePoll} />
						<Route path="/poll/:id" component={VotePoll} />
						<Route path="/poll/:id/results" component={PollResults} />
					</Routes>
				</Router>
			</SurrealProvider>
		</QueryClientProvider>
	);
};

export default App;
