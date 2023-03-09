import { tokensState } from "../../atoms";
import { useRecoilState } from "recoil";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useLocalStorage } from "react-use";

function AuthRoute({ Render }) {
  const [tokens, setTokens] = useRecoilState(tokensState);
  const [value, setValue] = useLocalStorage("BEEPO_TOKENS", null);

  if (!tokens.accessToken) {
    if (value && value.accessToken) {
      setTokens({ accessToken: value.accessToken });
    } else {
      return <Navigate to="/sign-up" />;
    }
  }

  //   console.log("tokens", tokens);

  // Return a page wide loading indicator if procced is not true yet.
  if (!tokens.accessToken) {
    return (
      <div className="bg-[#E5E5E5] min-h-screen w-full">
        <main className="max-w-xl border-x border-black/10 shadow-xl min-h-screen bg-[#E5E5E5] mx-auto min-w-[100px]">
          <div className="flex flex-row  py-3 justify-center items-center text-[#0E014C] font-bold text-base text-center">
            <p> Loading... </p>
          </div>
        </main>
      </div>
    );
  } else {
    return <Render auth={tokens.accessToken} />;
  }
}

export default function ProtectedRoute(props) {
  //   console.log(props);
  return () => {
    return <AuthRoute {...props} />;
  };
}
