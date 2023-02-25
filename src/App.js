import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ContentContainer from "./components/ContentContainer/ContentContainer";

const App = () => {
  return (
    <div className="app">
        <Header />
        <ContentContainer />
        <Footer />
    </div>
  );
}

export default App;
