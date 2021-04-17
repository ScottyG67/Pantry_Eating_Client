
const BASE_URL = 'http://localhost:3000'


export function log(message) {
    console.log(message);
  }

export function userLogin(email,password){
  


let reqObj = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  method: "POST",
  body: JSON.stringify({
    user: {
    email: email,
    password: password
    }
  })
}

fetch(`${BASE_URL}/api/v1/login`, reqObj)
  .then(res => res.json())
  .then(data => { 
    return data
  })
  .catch(error => {
    console.log(error)
    alert("there was an error")})
}
