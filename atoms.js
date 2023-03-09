import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

export const metamaskState = atom({
  key: "metamaskState",
  default: null,
});

export const infoMessagesState = atom({
  key: "infoMessagesState",
  default: [],
});
