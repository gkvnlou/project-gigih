import './App.css';
import Table from './components/Table.js';
import data from './data/all-data.js';

function App() {

  const PrintTrack = () => {
    const dataList = data.map((_i) => (
      <Table title={_i.album.name} artist={_i.album.artists[0].name} album={_i.name} desc={_i.album.external_urls.spotify} image={_i.album.images[1].url} />
    ));
    return dataList;
  };

  return (
    <div className="App">
      <header>
      </header>
      <body>
        <div></div>
        <div className="container">
            <div className="containerTextarea">
                <h1 className="webTitle">Blue Player</h1>
            </div>
          <p></p>
          <PrintTrack />
          <div className="containerBtn">
            <button className="submitBtn">Select</button>
            <div></div>
          </div>
        </div>
        <script src="src/index.js"></script>
      </body>
    </div>
  );
}

export default App;
