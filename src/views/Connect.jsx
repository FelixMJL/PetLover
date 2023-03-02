import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import ConnectUsers from '../components/Connect/ConnectUsers';

const Connect = () => {
    const navigate = useNavigate();
    const btnClickHandler = () => {
    navigate(-1);
    }

    return (
    <div className="connect">
        <div>
            <button onClick={btnClickHandler}>btn</button>
            Connect
        </div>
        <div>
            <h1>Suggested for you</h1>
        </div>
        
        <ConnectUsers />

        <Footer />
    </div>
    );
}

export default Connect;