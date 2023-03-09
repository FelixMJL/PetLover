import {Routes, Route} from "react-router-dom";
import "./App.css";
import Login from "./views/Login";
import HomePage from "./views/HomePage";
import Profile from "./views/Profile";
import SignUp from "./views/SignUp";
import Connect from "./views/Connect";
import Following from "./views/Following";


const App = () => {
    return (
        <div className="app">
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/homepage" element={<HomePage />} />
                    <Route path="/homepage/following" element={<Following />} />
                    <Route path="/profile/:id" element={<Profile />} />
                    <Route path="/connect" element={<Connect />} />
                </Routes>
        </div>
    );
}

export default App;
