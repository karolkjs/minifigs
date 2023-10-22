import FigCard from "../FigCard";
import { MiniFig } from "../../types";

interface SummaryProps {
  fig: MiniFig;
  setParts: any;
}

const Summary = ({ fig, setParts }: SummaryProps) => {
  if (!fig.name) return null;

  return (
    <div className="w-[45%] hidden md:block ml-5 h-full">
      <FigCard
        imgUrl={fig.set_img_url}
        name={fig.name}
        numberOfParts={fig.num_parts}
        figId={fig.set_num}
        parts={fig.parts}
        extended={true}
        setParts={setParts}
      />
    </div>
  );
};

export default Summary;
