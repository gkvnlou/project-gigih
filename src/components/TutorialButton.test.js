import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TutorialButton from './TutorialButton.js';

test('Tutorial is functional', () => {
	render(
		<>
			<TutorialButton />
		</>
	);
	userEvent.click(screen.getByText(/TUTORIAL/i));
	const tutorialContent = screen.getByText(
		/1. Search your favorite song in the search bar, and then press Search/i
	);
	expect(tutorialContent).toBeInTheDocument();
});
