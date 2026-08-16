"use client";

import { useState } from "react";
import Image from "next/image";

const BlurImage = ({
  src,
  alt,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`
          object-cover transition-all duration-700 ease-in-out
          ${
            isLoading
              ? "scale-110 blur-xl grayscale opacity-0"
              : // Membuat awal-awal agak gelap lalu dihover baru terang
                // : "scale-100 blur-0 grayscale-0 opacity-80 group-hover:opacity-100"
                "scale-100 blur-0 grayscale-0 opacity-100"
          }
        `}
        onLoad={() => setLoading(false)}
        priority={priority}
      />
    </div>
  );
};

export default BlurImage;
