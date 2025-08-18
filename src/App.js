import logo from './logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This code is made by <a
            className="App-link"
            href="https://www.linkedin.com/in/cavalcante-filipe/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Filipe Cavalcante
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
