//The test for SpotifyFindUserData, i'm testing it using MSW to simulate the API fetching

import { render, screen } from '@testing-library/react';
import SpotifyFindUserData, {
	SPOTIFY_USERDATA_ENDPOINT,
} from './SpotifyFindUserData.js';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

const todoResponse = rest.get(SPOTIFY_USERDATA_ENDPOINT, (req, res, ctx) => {
	return res(
		ctx.json({
			id: 'nfcu894378rt903478t9473jht8h',
		})
	);
});

const handlers = [todoResponse];

const server = new setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('It should return the proper API response', async () => {
	render(<SpotifyFindUserData />);
	const dummySongTitle = await screen.findByText(
		/nfcu894378rt903478t9473jht8h/i
	);
	expect(dummySongTitle).toBeVisible();
});
