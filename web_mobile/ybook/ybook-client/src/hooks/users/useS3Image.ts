import { useQuery } from "@tanstack/react-query";

const USE_AVATAR_KEY = (s3key: string) => [`/s3upload/image?s3key=${s3key}`];

export function useS3Image(s3key: string | null) {
  const { data } = useQuery<{ url: string }>([USE_AVATAR_KEY(s3key ?? "")], {
    enabled: typeof s3key === "string",
  });
  return data?.url;
}
