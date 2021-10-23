import React from "react";
import { useAuth0 } from "@auth0/auth0-react";


const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div  class="form-group " id= "Registrar">
      <button type="submit" class="btn btn primary" onClick={() => loginWithRedirect()}>login With</button>{' '}
    </div>
  );
};

export default LoginButton;
