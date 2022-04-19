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
				desc={''}
				image={
					'https://i.scdn.co/image/ab67616d0000b273d259c1439da19076da70840c'
				}
			/>
			<button>Add to Pin</button>
		</>
	);
	const dummytable = screen.getByText(/dummytitle/i);
	expect(dummytable).toBeInTheDocument();
});
