import './App.css';
import { StoreProvider } from './context/StoreContext';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <Home />
      </StoreProvider>
    </div>
  );
}

export default App;
