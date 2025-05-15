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
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="flex flex-col items-center">
        <div
          onClick={handleLogin}
          className="w-[250px] h-[250px] rounded-[24px] bg-white items-center justify-center flex cursor-pointer z-50"
        >
          <Image src={TMDB} alt="TMDB Logo" />
        </div>
      </div>
    </div>
  );
};
