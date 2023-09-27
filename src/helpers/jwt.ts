// const token = ():string =>{
//     return localStorage.getItem('token');
// }
//
// const userName: () => string = () => {
//     return localStorage.getItem('token');
// }

const jwt = (type:string):string => {
    return localStorage.getItem(type);
}

export default jwt;