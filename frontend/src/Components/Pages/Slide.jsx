import { Link } from "react-router-dom";

const Slide = ({ image, text }) => {
  return (
    <div
      className="w-full bg-center bg-cover h-[38rem]"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="flex items-center justify-center w-full h-full bg-gray-900/70">
        <div className="text-center">
          <h1 className="text-xl md:w-[80%] mx-auto font-semibold text-white lg:text-3xl">
            {text}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Slide;
