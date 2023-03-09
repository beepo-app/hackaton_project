import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { infoMessagesState } from "../../atoms";

export default function () {
  const [infoModal, setInfoModal] = useRecoilState(infoMessagesState);

  function closeMe() {
    setInfoModal([]);
  }

  useEffect(() => {
    const timerId = setTimeout(() => {
      setInfoModal([]);
    }, 3000);
    return () => clearTimeout(timerId);
  }, []);

  //   console.log(infoModal);
  if (infoModal.length < 1) return null;

  return (
    <>
      {/* <div className="fixed inset-0    bg-black/30 z-10"></div> */}
      <div className="fixed max-w-md w-[90%] mx-auto left-0 right-0 top-[10vh] z-20  flex flex-col justify-center items-center">
        <div className="bg-black/60 backdrop-filter backdrop-blur-lg p-6 rounded-lg overflow-y-auto max-h-[50vh] w-full max-w-[90%] space-y-6">
          <div className="flex flex-row justify-between items-center">
            <span className="text-xl font-bold text-white">Info</span>
            <span
              onClick={closeMe}
              className="text-white/80 cursor-pointer hover:text-white transition-colors"
            >
              Close
            </span>
          </div>

          <div className="flex flex-col space-y-4">
            {infoModal.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-row items-center space-x-2"
                >
                  <div className="w-2 h-2 rounded-full bg-[#0E014C]"></div>
                  <span className="text-white/80 text-sm">{item}</span>
                </div>
              );
            })}
            {/* <div className="flex flex-row items-center space-x-2">
              <div className="w-4 h-2 rounded-full bg-[#3680FF]"></div>
              <span className="text-white/80 text-sm">
                If you lose your recovery phrase, you will not be able to
                recover your wallet.
              </span>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
