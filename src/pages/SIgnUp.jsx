import Logo from "../assets/logo.webp";
import metaMaskaLogo from "../assets/metamask-fox.svg";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { metamaskState, infoMessagesState } from "../../atoms";

async function connectToWeb3Provider() {
  if (!window.ethereum) return null;

  const provider = new ethers.BrowserProvider(window.ethereum);

  await provider.send("eth_requestAccounts", []);

  const signer = provider.getSigner();

  return { provider, signer };
}

function SignUpProfile(props) {
  const [fetching, setFetching] = useState(false);
  const [displayName, setDisplayName] = useState("");

  function handleNameChange(e) {
    setDisplayName(e.target.value);
  }

  function createProfile() {}

  return (
    <div className="bg-[#E5E5E5] min-h-screen w-full">
      <main className=" relative max-w-xl border-x border-black/10 shadow-xl min-h-screen bg-[#E5E5E5] mx-auto min-w-[100px]">
        <div className="flex flex-row  py-3 justify-center items-center text-[#0E014C] font-bold text-base text-center">
          <p> Create your account </p>
        </div>

        <div className="flex flex-row mt-12  justify-center items-center text-[#0E014C] font-bold text-base text-center">
          <div className="min-w-[120px] min-h-[120px] rounded-full bg-[#C4C4C4] ">
            {" "}
          </div>
        </div>

        <div className="flex flex-col space-y-4 items-center mt-12">
          <label
            htmlFor="displayName"
            className="text-[#0E014C]  text-base text-left"
          >
            Display Name
          </label>
          <input
            type="text"
            id="displayName"
            inputMode="text"
            value={displayName}
            onChange={handleNameChange}
            placeholder=""
            className="w-[70%] text-[#0E014C] focus:border-[#0E014C] appearance-none outline-none text-base  px-4 py-3  bg-inherit hover:bg-[#C4C4C4]/10 border-b-2 border-[#C4C4C4]"
          />
        </div>

        <div className="text-center  space-y-4 flex flex-col pb-4 absolute left-0 right-0 bottom-12 justify-center items-center w-full ">
          <button
            onClick={createProfile}
            disabled={displayName.length < 1}
            className="items-center justify-center space-x-4 flex  text-[#0E014C] disabled:opacity-40 font-bold w-[70%] text-center px-4 py-3 rounded-[50px] bg-inherit hover:bg-[#0E014C]/10 border border-[#0E014C]"
          >
            <span> Continue </span>

            {fetching ? (
              <span className="animate-spin rounded-full w-4 h-4 inline-block border-t-2 border-b-2 border-r-2 border-[#0E014C]"></span>
            ) : (
              <img src={Logo} height="20" width="20" alt="logo" />
            )}
          </button>
        </div>
      </main>
    </div>
  );
}

export default function (props) {
  const [fetchingprovider, setFetchingProvider] = useState(false);

  const [MetaMaskState, setMetaMaskState] = useRecoilState(metamaskState);
  const [infoModal, setInfoModal] = useRecoilState(infoMessagesState);

  async function connectMetaMask() {
    if (fetchingprovider) return;
    // if (metamaskState) return;

    setFetchingProvider(true);
    const result = await connectToWeb3Provider();

    if (result) {
      setMetaMaskState(result);
      console.log("MetaMask connected");
      //   setInfoModal([...infoModal, "MetaMask connected"]);
    } else {
      console.log("Please install metamask");
      setInfoModal([...infoModal, "Please install MetaMask and try again! "]);
    }
    setFetchingProvider(false);
  }

  if (MetaMaskState) return <SignUpProfile {...props} />;

  return (
    <div className="bg-[#E5E5E5] min-h-screen w-full">
      <main className=" relative max-w-xl border-x border-black/10 shadow-xl min-h-screen bg-[#E5E5E5] mx-auto min-w-[100px]">
        <div className="flex flex-col justify-center items-center min-h-screen">
          <img
            src={Logo}
            height={200}
            width={"200"}
            alt="Beepo Logo"
            className="object-contain w-[150px] h-[150px] lg:w-[200px] lg:h-[200px]"
          />
        </div>

        <div className="text-center  space-y-4 flex flex-col pb-4 absolute left-0 right-0 bottom-12 justify-center items-center w-full ">
          <button
            onClick={connectMetaMask}
            disabled={fetchingprovider}
            className="items-center justify-center space-x-4 flex disabled:opacity-40 flex-row hover:bg-opacity-90 text-white font-bold w-[70%] text-center px-4 py-3 rounded-[50px] bg-[#FF9C34]"
          >
            <span> Create Account </span>

            {fetchingprovider ? (
              <span className="animate-spin rounded-full w-4 h-4 inline-block border-t-2 border-b-2 border-r-2 border-[#0E014C]"></span>
            ) : (
              <img
                src={metaMaskaLogo}
                height="20"
                width="20"
                alt="Metamask logo"
              />
            )}
          </button>
          <p className="text-black/60 "> Already have an account?</p>

          <button
            disabled={fetchingprovider}
            className="items-center justify-center space-x-4 flex  text-[#0E014C] disabled:opacity-40 font-bold w-[70%] text-center px-4 py-3 rounded-[50px] bg-inherit hover:bg-[#0E014C]/10 border border-[#0E014C]"
          >
            <span>Log In </span>

            {fetchingprovider ? (
              <span className="animate-spin rounded-full w-4 h-4 inline-block border-t-2 border-b-2 border-r-2 border-[#0E014C]"></span>
            ) : (
              <img
                src={metaMaskaLogo}
                height="20"
                width="20"
                alt="Metamask logo"
              />
            )}
          </button>
        </div>
      </main>
    </div>
  );
}
