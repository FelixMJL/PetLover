import "./Follow.css";

const Follow = () => {
    return (
        <div className="follow">
            <button className="follow__item follow__recommend follow__recommend-active">Recommend for you</button>
            <button className="follow__item ">Following</button>
        </div>
    );
};

export default Follow;
