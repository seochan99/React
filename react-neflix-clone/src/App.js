import './App.css';
import Nav from "./components/Nav";
import Banner from './components/Banner';

function App() {
  return (
    <div className="App" >
      {/* nav컴포넌트 가져오기 */}

      <Nav /> 
      <Banner/>
    </div>
  );
}

export default App;
