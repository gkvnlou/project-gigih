//A class that create a cute tutorial button on the top-middle right

import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

export default function TutorialButton() {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'flex-end',
				justifyContent: 'flex-end',
				margin: '20px',
			}}
		>
			<Button aria-describedby={id} variant="contained" onClick={handleClick}>
				<b style={{ marginRight: '10px' }}>TUTORIAL</b>
				<QuestionMarkIcon />
			</Button>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
			>
				<Typography sx={{ p: 2, color: 'black' }}>
					Step by step:
					<br />
					1. Search your favorite song in the search bar, and then press Search
					button.
					<br />
					2. Pin the song you want by pressing the "Add to Pin" button to save
					into Playlist later, or you can change your mind by pressing "Remove
					Pin" button.
					<br />
					3. After you're happy with your pick, press the "CREATE PLAYLIST"
					button.
					<br />
					4. Fill the Playlist Title and Playlist Description, and then press
					"COMMIT CREATING THE PLAYLIST"
					<br />
					You are done! easy as ABC.
				</Typography>
			</Popover>
		</div>
	);
}
