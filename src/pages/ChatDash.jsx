import ProtectedRoute from "../components/ProtectedRoute";
import { useState } from "react";
import { Client } from "@xmtp/xmtp-js";
import { Wallet } from "ethers";
import { Buffer } from "buffer";
import { metamaskState } from "../../atoms";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { connectToWeb3Provider } from "./SIgnUp";

function SingleChat({ chat: mainChat, xmtp }) {
  const [msg, setMsg] = useState("");
  const [lMsgs, setLMsgs] = useState(mainChat.messages);

  useEffect(() => {
    const e = async () => {
      for await (const message of await mainChat.convo.streamMessages()) {
        console.log(`[${message.senderAddress}]: ${message.content}`);
        setLMsgs([...lMsgs, message]);
      }
    };

    e();
  });

  function handleMsg(e) {
    setMsg(e.target.value);
  }

  async function sendMsg() {
    if (!msg) {
      alert("Type ina message!");

      return;
    }

    await mainChat.convo.send(msg);

    alert("Message sent!");
  }

  return (
    <div className="bg-[#E5E5E5] min-h-screen w-full">
      <main className="max-w-xl border-x relative border-black/10 shadow-xl min-h-screen bg-[#E5E5E5] mx-auto min-w-[100px]">
        <div className="flex flex-row  py-3 justify-center items-center text-[#0E014C] font-bold text-base text-center">
          <p> User -{mainChat.peerAddress} </p>
        </div>

        <div className="bg-white rounded-t-[30px]  p-4 absolute left-0 right-0 bottom-0    ">
          <div className="flex flex-row justify-between items-center">
            <p className=" py-4 text-left"> Messages </p>
          </div>

          {/* Chat map  */}

          <div className="space-y-6 overflow-y-scroll min-h-[74vh] max-h-[75vh]">
            <div className="flex flex-row justify-between space-x-4 items-center absolute bottom-4 left-0 right-0 px-4">
              <input
                type="text"
                id="msg"
                inputMode="text"
                value={msg}
                onChange={handleMsg}
                placeholder=""
                className="w-[70%] text-black focus:border-black appearance-none outline-none text-base  px-4 py-3  bg-inherit hover:bg-[#C4C4C4]/10 border-2  rounded-[50px] border-[#C4C4C4]"
              />

              <button className="bg-black block w-[25%] px-4 py-4 text-white text-center rounded-lg ">
                {" "}
                Send{" "}
              </button>
            </div>

            {lMsgs.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex hover:bg-gray-200 rounded-[30px]  p-3 flex-row justify-between items-center w-full"
                >
                  <div className="flex flex-row justify-center items-center">
                    <div className="bg-[#C4C4C4] rounded-full h-12 w-12"></div>
                    <div className="flex flex-col justify-center items-start ml-4">
                      <p className="text-[#0E014C]  text-sm">{item.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

function ChatDash(props) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [metamask, setMetamask] = useRecoilState(metamaskState);
  const [xmtp, setXmtp] = useState(null);
  const [chats, setChats] = useState([]);
  const [faddr, setFAddr] = useState("");

  const [mainChat, setMainChat] = useState(null);

  useEffect(() => {
    if (xmtp) return;
    if (!metamask) return;
    const tId = setTimeout(async () => {
      const xmtp = await Client.create(metamask.signer);
      setXmtp(xmtp);
    }, 2000);

    return () => {
      clearTimeout(tId);
    };
  }, [metamask]);

  async function addConvo() {
    if (!xmtp) {
      alert("XMTP not connected!");
    }
    try {
      const conversation = await xmtp.conversations.newConversation(faddr);
      const messages = await conversation.messages();

      console.log(messages);

      const convo = {
        peerAddress: faddr,
        messages: messages,
        convo: conversation,
      };

      setChats([...chats, convo]);
    } catch (err) {
      console.log(err);
      alert(err);
    }

    setShowAddForm(false);
  }

  function handleAddr(e) {
    setFAddr(e.target.value);
  }

  if (mainChat) {
    return <SingleChat xmtp={xmtp} chat={mainChat} />;
  }

  return (
    <div className="bg-[#E5E5E5] min-h-screen w-full">
      <main className="max-w-xl border-x relative border-black/10 shadow-xl min-h-screen bg-[#E5E5E5] mx-auto min-w-[100px]">
        {/* Add Form  */}

        {showAddForm && (
          <div className="fixed max-w-md w-[90%] mx-auto left-0 right-0 top-[10vh] z-20  flex flex-col justify-center items-center">
            <div className="bg-[#0E014C] backdrop-filter backdrop-blur-lg p-6 rounded-lg overflow-y-auto max-h-[50vh] w-full max-w-[90%] space-y-6">
              <div className="flex flex-row justify-between items-center">
                <span className="text-lg font-bold text-white">
                  {" "}
                  Add a friend{" "}
                </span>
                <span
                  onClick={() => setShowAddForm(false)}
                  className="text-white/80 cursor-pointer hover:text-white transition-colors"
                >
                  Close
                </span>
              </div>

              <div className="flex flex-col space-y-4 items-center mt-12">
                <label
                  htmlFor="address"
                  className="text-white  text-base text-left"
                >
                  Friend's wallet address
                </label>
                <input
                  type="text"
                  id="address"
                  inputMode="text"
                  placeholder="Address"
                  value={faddr}
                  onChange={handleAddr}
                  className="w-[70%] text-white focus:border-white appearance-none outline-none text-base  px-4 py-3  bg-inherit hover:bg-[#C4C4C4]/10 border-b-2 border-[#C4C4C4]"
                />
              </div>

              <div className="text-center  space-y-4 flex flex-col pb-4  justify-center items-center w-full ">
                <button
                  onClick={addConvo}
                  disabled={faddr.length < 11}
                  className="items-center justify-center space-x-4 flex disabled:opacity-40 flex-row hover:bg-opacity-90 text-white font-bold w-[70%] text-center px-4 py-3 rounded-[50px] bg-[#FF9C34]"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-row  py-3 justify-center items-center text-[#0E014C] font-bold text-base text-center">
          <p> Chats </p>
        </div>

        <div className="bg-white rounded-t-[30px] p-4 absolute left-0 right-0 bottom-0    ">
          <div className="flex flex-row justify-between items-center">
            <p className=" py-4 text-left"> Messages </p>
            <p
              onClick={() => setShowAddForm(true)}
              className=" py-4 text-3xl px-4  hover:text-black/80 cursor-pointer"
            >
              {" "}
              +{" "}
            </p>
          </div>

          {/* Chat map  */}

          <div className="space-y-6 overflow-y-scroll min-h-[74vh] max-h-[75vh]">
            {!(metamask && metamask.signer && xmtp) && (
              <div className="text-center  space-y-4 flex flex-col pb-4 mt-12 justify-center items-center w-full ">
                <button
                  onClick={async () =>
                    setMetamask(await connectToWeb3Provider())
                  }
                  className="items-center justify-center space-x-4 flex disabled:opacity-40 flex-row hover:bg-opacity-90 text-white font-bold w-[70%] text-center px-4 py-3 rounded-[50px] bg-[#FF9C34]"
                >
                  <span> Connect Metmask</span>
                  {!xmtp && metamask && (
                    <span className="animate-spin rounded-full w-4 h-4 inline-block border-t-2 border-b-2 border-r-2 border-[#0E014C]"></span>
                  )}
                </button>
              </div>
            )}

            {chats.length === 0 && (
              <div className="flex flex-col justify-center items-center mt-16">
                <p className="text-[#0E014C] text-base"> No chats yet </p>
                <p
                  onClick={() => setShowAddForm(true)}
                  className="cursor-pointer p-4 text-[#0E014C] text-sm"
                >
                  {" "}
                  Add a friend to start chatting{" "}
                </p>
              </div>
            )}

            {chats.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setMainChat(item)}
                  className="flex hover:bg-gray-200 rounded-[30px]  p-3 flex-row justify-between items-center w-full"
                >
                  <div className="flex flex-row justify-center items-center">
                    <div className="bg-[#C4C4C4] rounded-full h-12 w-12"></div>
                    <div className="flex flex-col justify-center items-start ml-4">
                      <p className="text-black  text-base">
                        {" "}
                        {item.peerAddress}{" "}
                      </p>

                      {item.messages.length > 0 && (
                        <p className="text-[#0E014C]  text-sm">
                          {" "}
                          {item.messages[item.messages.length - 1]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProtectedRoute({
  Render: ChatDash,
});
