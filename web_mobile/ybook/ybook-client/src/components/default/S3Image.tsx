import { DetailedHTMLProps, forwardRef, HTMLAttributes } from "react";
import { useS3Image } from "../../hooks/users/useS3Image";

export const S3Image = forwardRef<
  HTMLImageElement,
  DetailedHTMLProps<HTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
    s3Key: string | null;
    urlOnLoading: string;
    alt?: string;
  }
>(function ({ s3Key, alt, urlOnLoading, ...props }, ref) {
  const imageUrl = useS3Image(s3Key);
  return (
    <img
      ref={ref}
      loading="lazy"
      src={imageUrl ?? urlOnLoading}
      alt={alt}
      role={props.role ?? alt === undefined ? "presentation" : undefined}
      {...props}
    />
  );
});
