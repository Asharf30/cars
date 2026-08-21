"use client";

import Image, { type ImageProps } from "next/image";
import { useState, useEffect } from "react";

type ImageWithSkeletonProps = ImageProps & {
  containerClassName?: string;
  fallbackSrc?: ImageProps["src"];
  fallbackClassName?: string;
  fallbackComponent?: React.ReactNode;
};

const ImageWithSkeleton = ({
  className,
  containerClassName,
  fallbackSrc = "/car-logo (3).svg",
  fallbackClassName,
  fallbackComponent,
  fill,
  onLoad,
  onError,
  src,
  alt,
  ...imageProps
}: ImageWithSkeletonProps) => {
  const [displaySrc, setDisplaySrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFailed, setHasFailed] = useState(false);

  // Sync displaySrc if src prop changes
  useEffect(() => {
    setDisplaySrc(src);
    setIsLoading(true);
    setHasFailed(false);
  }, [src]);
  
  const isShowingFallback = displaySrc === fallbackSrc;
  const activeClassName = isShowingFallback && fallbackClassName ? fallbackClassName : className;

  return (
    <span
      className={`image-with-skeleton ${fill ? "image-with-skeleton--fill" : ""} ${containerClassName || ""}`}
      aria-busy={isLoading}
    >
      {isLoading && <span className="image-skeleton" aria-hidden="true" />}
      {hasFailed ? (
        fallbackComponent ? (
          fallbackComponent
        ) : (
          <span className="image-fallback" role="img" aria-label="Image unavailable">
            Image unavailable
          </span>
        )
      ) : (
        <Image
          {...imageProps}
          src={displaySrc}
          alt={alt}
          fill={fill}
          className={`image-with-skeleton__image ${isLoading ? "image-with-skeleton__image--loading" : ""} ${activeClassName || ""}`}
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
