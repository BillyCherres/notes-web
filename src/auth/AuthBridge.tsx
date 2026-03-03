import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { setTokenGetter } from "./token";

export default function AuthBridge() {
  const { getAccessTokenSilently } = useAuth0();

  React.useEffect(() => {
    setTokenGetter(() =>
      getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      })
    );
  }, [getAccessTokenSilently]);

  return null;
}