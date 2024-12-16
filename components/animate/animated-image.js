import { motion } from "framer-motion";
import Image from "next/image";

const AnimatedImage = ({ src, alt, width, height, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }} // Start fully transparent
      animate={{ opacity: 1 }} // Fade in to fully visible
      exit={{ opacity: 0 }} // Fade out to fully transparent
      transition={{ duration: 2 }} // Adjust the duration for smooth transitions
      style={{ display: "inline-block" }} // Optional: Prevent layout shift
      className={className}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{ objectFit: "cover" }} // Optional: Customize image fit
        priority // Optional: Improves performance for critical images
      />
    </motion.div>
  );
};

export default AnimatedImage;
