"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type ImageWithSkeletonProps = ImageProps & {
  containerClassName?: string;
  fallbackSrc?: ImageProps["src"];
};

const ImageWithSkeleton = ({
  className,
  containerClassName,
  fallbackSrc = "/photo.png",
  fill,
  onLoad,
  onError,
  src,
  ...imageProps
}: ImageWithSkeletonProps) => {
  const [displaySrc, setDisplaySrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFailed, setHasFailed] = useState(false);

  return (
    <span
      className={`image-with-skeleton ${fill ? "image-with-skeleton--fill" : ""} ${containerClassName || ""}`}
      aria-busy={isLoading}
    >
      {isLoading && <span className="image-skeleton" aria-hidden="true" />}
      {hasFailed ? (
        <span className="image-fallback" role="img" aria-label="Image unavailable">
          Image unavailable
        </span>
      ) : (
        <Image
          {...imageProps}
          src={displaySrc}
          fill={fill}
          className={`image-with-skeleton__image ${isLoading ? "image-with-skeleton__image--loading" : ""} ${className || ""}`}
          onLoad={(event) => {
            setIsLoading(false);
            onLoad?.(event);
          }}
          onError={(event) => {
            onError?.(event);
            if (displaySrc !== fallbackSrc) {
              setDisplaySrc(fallbackSrc);
              return;
            }
            setIsLoading(false);
            setHasFailed(true);
          }}
        />
      )}
    </span>
  );
};

export default ImageWithSkeleton;
