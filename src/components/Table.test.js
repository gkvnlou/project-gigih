//Test for Table class
//This test is testing the Table class to see if the Table is showing a proper data.

import { render, screen } from '@testing-library/react';
import Table from './Table.tsx';
test('table showed up with proper result', () => {
	render(
		<>
			<Table
				key={'dummykey'}
				title={'dummytitle'}
				artist={'dummyartistname'}
				album={'dummyalbumname'}
				duration={1000}
				desc={''}
				image={
					'https://i.scdn.co/image/ab67616d0000b273d259c1439da19076da70840c'
				}
			/>
			<button>Add to Pin</button>
		</>
	);
	const dummytitle = screen.getByText(/dummytitle/i);
	const dummyartist = screen.getByText(/dummyartistname/i);
	const dummyalbum = screen.getByText(/dummyalbumname/i);
	const dummyduration = screen.getByText(/01/i); // duration is in ms, which is converted as 1 second
	expect(dummytitle).toBeInTheDocument();
	expect(dummyartist).toBeInTheDocument();
	expect(dummyalbum).toBeInTheDocument();
	expect(dummyduration).toBeInTheDocument();
});
