import React from "react";

import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <div class="form-group " type="submit" class="btn btn primary" class="form-group " id= "Registrar">
         <button type="submit" class="btn btn primary"  onClick={() => logout()}>logout</button> {' '}
         
    </div>
  );
};

export default LogoutButton;
