import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

interface CircularProgressProps {
  userScore: number;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  userScore,
}) => {
  return (
    <div className="w-[40px] h-[40px]">
      <CircularProgressbar
        value={userScore}
        text={`${userScore}`}
        styles={buildStyles({
          textSize: "30px",
          textColor: "#0EA5E9",
          pathColor: "#0EA5E9",
          trailColor: "#EDEDED",
          backgroundColor: "#fff",
        })}
        background
        backgroundPadding={6}
      />
    </div>
  );
};
