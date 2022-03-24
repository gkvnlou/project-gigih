const Table = (props) => {
    return(
        <table>
            <tr>
              <td>
                Song Title
              </td>
              <td>
                <div>{props.title}</div>
              </td>
            </tr>
            <tr>
              <td>
                Song Artist
              </td>
              <td>
                {props.artist}
              </td>
            </tr>
            <tr>
              <td>
                Song Album
                <div></div>
              </td>
              <td>
                {props.album}
              </td>
            </tr>
            <tr>
                <td>
                  Song Description
                  <div></div>
                </td>
                <td>
                  <div>{props.desc}</div>
                </td>
              </tr>
          </table>
    );
};

export default Table;