//Class to show the aboutMe Card. mostly is imported from MUI

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import '../assets/about-me-profile.png';

export default function AboutMeContent() {
	return (
		<Card sx={{ maxWidth: '350px', marginTop: '50px' }}>
			<CardMedia
				component="img"
				height="500"
				image={require('../assets/about-me-profile.png')}
				alt="me"
			/>
			<CardContent>
				<Typography
					gutterBottom
					variant="h5"
					component="div"
					sx={{ color: 'black' }}
				>
					Kevin
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Hi! My name is Kevin, I just freshly graduate from Binus university
					with Computer Science major. the reason I'm joining Computer Science
					Major because I found coding is very enjoyable and i want to make
					something useful for everyone from coding.
				</Typography>
			</CardContent>
		</Card>
	);
}
