"use client";

import { useState } from "react";
import Image from "next/image";

const BlurImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className={`
          object-cover transition-all duration-700 ease-in-out
          ${
            isLoading
              ? "scale-110 blur-xl grayscale opacity-0"
              : "scale-100 blur-0 grayscale-0 opacity-80 group-hover:opacity-100"
          }
        `}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};

export default BlurImage;
