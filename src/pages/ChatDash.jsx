import ProtectedRoute from "../components/ProtectedRoute";

function ChatDash(props) {
  return (
    <div className="bg-[#E5E5E5] min-h-screen w-full">
      <main className="max-w-xl border-x relative border-black/10 shadow-xl min-h-screen bg-[#E5E5E5] mx-auto min-w-[100px]">
        <div className="flex flex-row  py-3 justify-center items-center text-[#0E014C] font-bold text-base text-center">
          <p> Chats </p>
        </div>

        <div className="bg-white rounded-t-[30px] p-4 absolute left-0 right-0 bottom-0    ">
          <p className=" py-4 text-left"> Messages </p>

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
