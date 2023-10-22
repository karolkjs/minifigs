interface PartProps {
  imgUrl: string;
  name: string;
  partNum: string;
}

const Part = ({ imgUrl, name, partNum }: PartProps) => {
  return (
    <div className="flex items-center my-5">
      <img src={imgUrl} alt={`${name} part`} className="h-[60px] " />
      <div className="flex flex-col items-start text-start ml-4">
        <span className="text-black font-semibold">{name}</span>
        <span className="text-orange font-semibold">{partNum}</span>
      </div>
    </div>
  );
};

export default Part;
