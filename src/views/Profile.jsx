import {useNavigate} from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const btnClickHandler = () => {
        navigate(-1)
    }
    return (
        <div>
            <h1>This is Personal Page</h1>
            <button onClick={btnClickHandler}>Back to Previous Page</button>
        </div>
    );
};

export default Profile;
