export const truncateText = (text: string, limit: number): { truncatedText: string; isTruncated: boolean } => {
    if (text.length <= limit) {
      return { truncatedText: text, isTruncated: false };
    }
    return { truncatedText: text.slice(0, limit) + "...", isTruncated: true };
  };
  