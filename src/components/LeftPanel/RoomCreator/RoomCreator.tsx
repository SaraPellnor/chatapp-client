import { useRef, useState } from "react";
import { useSocket } from "../../../Context/SocketContext/SocketContext";
import "./RoomCreator.css";
// skapar rum och uppdaterar currentRoom och kör därmed useEffect i SocketContext
const RoomCreator = () => {
  const { setCurrentRoom } = useSocket();
  const [value, setValue] = useState("");
  const modalRef = useRef<HTMLDialogElement | null>(null);
  // sätter currentRoom om inputfält inte är en tom ""
  const createRoom = () => {
    if (value == "") {
      modalRef?.current?.showModal();
      return;
    }
    setCurrentRoom(value);
    // Tömmer inputfältet
    setValue("");
  };

  const enterKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key == "Enter") {
      createRoom();
    }
  };

  const handleCloseDialog = () => {
    modalRef?.current?.close();
  };

  return (
    <div className="roomCreator">
      <dialog ref={modalRef}>
        <div>Milda Mathilda! Ge mig ett rumsnamn, beach!</div>
        <button onClick={handleCloseDialog}>Stäng</button>
      </dialog>
      <input
        value={value}
        onKeyDown={(e) => enterKey(e)}
        onChange={(e) => setValue(e.target.value)}
        placeholder="skapa rum"
        type="text"
      />
      <button onClick={createRoom}>+</button>
    </div>
  );
};

export default RoomCreator;
