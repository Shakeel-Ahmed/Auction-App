export const checkLogin = () => {
    const userToken = localStorage.getItem('token');
    const userName = localStorage.getItem('name');

    if(userToken && userName) return true;
    else return false;
}