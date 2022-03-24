import './App.css';
import Table from './components/Table.js';

function App() {
  return (
    <div className="App">
      <header>
      </header>
      <body>
        <div></div>
        <div className="container">
            <div className="container-textarea">
                <h1>Song Player</h1>
            </div>
          <img src="./logo512.png" className="oreo" alt="Img not found" />
          <p></p>
          <Table title="Title" artist="Artist" album="Album" desc="Description"/>
          <div className="btn">
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
