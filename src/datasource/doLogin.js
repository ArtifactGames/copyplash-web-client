import Env from '../config/Env';

export default async function doLogin(password) {
  try {
    const options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ password })
    }
    
    const response = await fetch(`http://${Env.serverAddress}:${Env.serverPort}/lobby-enter`, options)
    const body = await response.json();
    return body.id
  } catch (e) {
    console.log(e);
    return false;
  }
}