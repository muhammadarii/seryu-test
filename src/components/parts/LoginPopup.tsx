import Image from "next/image";
import TMDB from "@/assets/images/TMDB.png";
import { FetchLogin } from "@/lib/AuthApi";

export const LoginPopup = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const handleLogin = async () => {
    await FetchLogin();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div
          onClick={handleLogin}
          className="w-[250px] h-[250px] rounded-[24px] bg-white items-center justify-center flex cursor-pointer"
        >
          <Image src={TMDB} alt="TMDB Logo" />
        </div>
        <button
          onClick={onClose}
          className="text-sm text-gray-400 hover:underline mt-2"
        >
          Close
        </button>
      </div>
    </div>
  );
};
