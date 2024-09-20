import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

interface AvatarProps {
  src?: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  if (src) {
    return (
      <Image
        src={src}
        alt="Avatar"
        className="rounded-full"
        height={30} // Use numbers instead of strings
        width={30}  // Use numbers instead of strings
      />
    );
  }
  return <FaUserCircle size={30} />; // Match size with Image height/width
};

export default Avatar;