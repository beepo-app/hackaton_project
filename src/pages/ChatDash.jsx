import ProtectedRoute from "../components/ProtectedRoute";
import { useState } from "react";

function ChatDash(props) {
  const [showAddForm, setShowAddForm] = useState(false);
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
                  className="w-[70%] text-white focus:border-white appearance-none outline-none text-base  px-4 py-3  bg-inherit hover:bg-[#C4C4C4]/10 border-b-2 border-[#C4C4C4]"
                />
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

          <div className="space-y-6 overflow-y-scroll max-h-[75vh]">
            {[1, 2, 3, 4, 5, 1, 1, 1, 1, 1, 1, 11, , 1].map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex hover:bg-gray-200 rounded-[30px]  p-3 flex-row justify-between items-center w-full"
                >
                  <div className="flex flex-row justify-center items-center">
                    <div className="bg-[#C4C4C4] rounded-full h-12 w-12"></div>
                    <div className="flex flex-col justify-center items-start ml-4">
                      <p className="text-black  text-base"> Name </p>
                      <p className="text-[#0E014C]  text-sm"> Last message </p>
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
