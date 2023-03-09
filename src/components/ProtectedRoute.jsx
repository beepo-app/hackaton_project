import { tokensState } from "../../atoms";
import { useRecoilState } from "recoil";
import { Navigate } from "react-router-dom";

export default function (props) {
  const [tokens, setTokens] = useRecoilState(tokensState);

  if (!tokens.accessToken) return <Navigate to="/sign-up" />;

  return props.children;
}
