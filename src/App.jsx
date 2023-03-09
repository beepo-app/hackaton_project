import Logo from "./assets/logo.webp";
import InfoModal from "./components/InfoModal";
import { Buffer } from "buffer";
window.Buffer = Buffer;

function App() {
  return (
    <div className="bg-[#E5E5E5] min-h-screen w-full">
      <main className="max-w-xl border-x border-black/10 shadow-xl min-h-screen bg-[#E5E5E5] mx-auto min-w-[100px]">
        <InfoModal />
        <div className="flex flex-col justify-center items-center min-h-screen">
          <img
            src={Logo}
            height={200}
            width={"200"}
            alt="Beepo Logo"
            className="object-contain w-[150px] h-[150px] lg:w-[200px] lg:h-[200px]"
          />
        </div>
      </main>
    </div>
  );
}

export default App;
