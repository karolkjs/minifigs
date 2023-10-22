import React from "react";
import QuestionMark from "../../assets/question-mark.svg?react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-[100vw] h-[100vh] overflow-y-auto appScrollbarContainer">
      <div className="max-w-[1280px] w-full relative mx-auto p-5 min-h-[100vh] flex items-center justify-center overflow-x-hidden">
        <div className="absolute rotate-45 -z-10 mx-auto">
          <QuestionMark color="#2E2E46" className="max-w-[550px] w-full" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
