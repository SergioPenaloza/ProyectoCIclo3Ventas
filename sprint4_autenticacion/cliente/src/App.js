import './App.css';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

function App() {
  //** async es para trabajar con promesas, transforma la función en promesa */
  const responseGoogle = async (resp) => {
      console.log(resp);
      try {
        //** Debido al async se utiliza el await, el await es para que la ejecución de una
        // promesa se ejecute de forma asincrona */
        const { data } = await axios({
          method: 'POST',
          url: 'http://localhost:4000/api/auth/google/login',
          headers: {
            'Authorization': `Bearer ${resp.tokenId}`
          }
        });
        console.log(data);

      } catch (error) {
        console.log(error.toJSON());
        console.log(error.response.data);
      }
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_IDOAUTH}
      buttonText="Iniciar Sesión"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
}

export default App;