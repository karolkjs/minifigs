const Loader = ({testId} : {testId?: string}) => {
  return (
    <div className="flex justify-center items-center" data-testid={testId}>
      <div className="relative inline-flex">
        <div className="w-8 h-8 bg-sky-blue rounded-full"></div>
        <div className="w-8 h-8 bg-sky-blue rounded-full absolute top-0 left-0 animate-ping"></div>
        <div className="w-8 h-8 bg-sky-blue rounded-full absolute top-0 left-0 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loader;
