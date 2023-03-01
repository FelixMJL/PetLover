import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const loginClickHandler = () => {
        navigate("/homepage")
    }
    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={loginClickHandler}>Login success</button>
        </div>
    );
};

export default Login;
