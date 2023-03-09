import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import { RecoilRoot } from "recoil";
import SIgnUp from "../pages/SIgnUp";
import InfoModal from "./InfoModal";

export default function (props) {
  return (
    <RecoilRoot>
      <>
        <InfoModal />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/sign-up" exact element={<SIgnUp />} />
        </Routes>
      </>
    </RecoilRoot>
  );
}
