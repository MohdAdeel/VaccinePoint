import { HelpCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const Widget = () => {
  const [open, setOpen] = useState(false);
  const widgetRef = useRef(null);
  const timerRef = useRef(null);

  const location = useLocation();

  const playSound = (src) => {
    const audio = new Audio(src);
    audio.play().catch(() => {});
  };

  // play sound on open/close
  useEffect(() => {
    if (open) {
      playSound("/PopSound.wav");
    } else {
      playSound("/close.mp3");
    }
  }, [open]);

  useEffect(() => {
    setOpen(false);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setOpen(true);
    }, 10000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [location.pathname]);

  return (
    <div ref={widgetRef} className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#D3979B] text-white shadow-lg hover:bg-[#AB787B] transition"
      >
        <HelpCircle size={40} />
      </button>

      {open && (
        <div className="absolute bottom-16 right-0 w-64 bg-white text-black rounded-2xl shadow-xl p-4">
          <h3 className="font-bold text-xl">Help</h3>
          <div className="text-md">
            If you can't find an appropriate location, please contact the
            Central Booking Team
          </div>
        </div>
      )}
    </div>
  );
};

export default Widget;
