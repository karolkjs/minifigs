import classNames from "classnames";

import Button from "../Button";
import Loader from "../Loader";

interface ErrorBlockProps {
  errorMessage?: string;
  onClickRetry?: () => void;
  retryLoading?: boolean;
  textColor?: string;
}

const ErrorBlock = ({
  errorMessage,
  onClickRetry,
  retryLoading,
  textColor = "#fff",
}: ErrorBlockProps) => {
  const message = errorMessage ?? "Something went wrong.";
  return (
    <div>
      <div className="error-block flex flex-col items-center justify-center">
        <div className="h-12">
          {retryLoading ? (
            <Loader testId="loader" />
          ) : (
            <p
              className={classNames("mb-5 text-2xl font-medium", {
                [`text-[${textColor}]`]: textColor,
              })}
            >
              {message}
            </p>
          )}
        </div>
        <Button onClick={onClickRetry}>Retry</Button>
      </div>
    </div>
  );
};

export default ErrorBlock;
