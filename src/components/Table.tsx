import { FC } from 'react';

export interface TableData {
	image: string;
	title: string;
	artist: string;
	album: string;
}

const Table: FC<TableData> = (props) => {
	return (
		<div className="songCard">
			<table>
				<tr>
					<td className="cardLamp"></td>
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
									{props.artist}
								</td>
							</tr>
							<tr>
								<td colSpan={2} className="cardSubTitleLV2">
									{props.album}
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</div>
	);
};

export default Table;
