import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Spinner = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10,
      );
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        margin: "24px",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress variant="determinate" value={progress} />
    </div>
  );
};

export default Spinner;
