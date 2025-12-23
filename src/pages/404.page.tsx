import img from "../assets/common/404.json"
import Lottie from "lottie-react";
const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Lottie animationData={img} loop={true} className="w-2/3 h-2/3" />

      </div>
  );
}
export default NotFound;