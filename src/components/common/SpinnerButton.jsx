import { ClipLoader, FadeLoader, PulseLoader } from "react-spinners";

const SpinnerButton = (props) => {
  const {
    title = "button",
    className = "",
    action = () => {},
    type = "button",
    loading = false,
    isDisable = false,
  } = props;
  return (
    <button
      onClick={action}
      disabled={loading || isDisable}
      type={type}
      className={className}
    >
      {loading ? (
        <span className="h-[20px] flex justify-center items-center">
          <ClipLoader color="#ffff" size={24} />
        </span>
      ) : (
        <span className="h-[20px] flex justify-center items-center">
          {title}
        </span>
      )}
    </button>
  );
};

export default SpinnerButton;
