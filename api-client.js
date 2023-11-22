// Network Call Code
import URL from '../utils/constant.js';
async function makeNetworkCall(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Some problem in API call', error);
        throw error; // Rethrow the error to be caught in the calling function
    }
}
export default makeNetworkCall;
// below code will result into call back hell
// function makeNetworkCall(){
//     const promise = fetch(URL); //assign to thread
//     console.log('Promise is',promise);
//     promise.then(response=>{
//         console.log('response is', response);
//         const promise2 = response.json(); //Deserialization (JSON to Object)
//         promise2.then(data=>console.log('Data is',data))
//         .catch(e=>console.log('JSON parse Error', e ))
//     }).catch(err=>{
//         console.log('Error is', err);
//     })
// }