//Class that used to print a Pinned Track that, this class is identical from the Table, just different at styling

import { FC } from 'react';
import { TableData } from './Table';

const TablePin: FC<TableData> = (props) => {
	const s = Math.floor((props.duration / 1000) % 60); // duration is in ms, which is converted as 1 second per 1000ms
	const m = Math.floor(props.duration / 1000 / 60);
	return (
		<div className="songCardPinned">
			<table>
				<tr>
					<td>
						<img className="songPicture" src={props.image} alt="not found" />
					</td>
					<td className="cardContent">
						<table className="songList">
							<tr>
								<td colSpan={2} className="cardTitle">
									{props.title}
								</td>
							</tr>
							<tr>
								<td colSpan={2} className="cardSubTitleLV1">
									Artist: <i>{props.artist}</i>
								</td>
							</tr>
							<tr>
								<td colSpan={2} className="cardSubTitleLV2">
									Duration:{' '}
									<i>
										{m}:{s < 10 ? '0' + s : s}
									</i>
								</td>
							</tr>
							<tr>
								<td colSpan={2} className="cardSubTitleLV3">
									Album: <i>{props.album}</i>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</div>
	);
};

export default TablePin;
