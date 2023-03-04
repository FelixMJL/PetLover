export const getUserData = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const config = {
        headers: {Authorization: `Bearer ${userData.token}`}
    }
    return {id:userData.id, config}
}