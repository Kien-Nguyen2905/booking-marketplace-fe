import { showToast } from '@/lib/toast';
import { useRef, useState } from 'react';

export const usePromoCodeSlider = () => {
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  // @ts-ignore
  const [_swiper, setSwiper] = useState<any>(null);
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  const onCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCodeId(id);

      // Reset copy status after 2 seconds
      setTimeout(() => {
        setCopiedCodeId(null);
      }, 2000);

      // Call the onCopy callback if provided
      showToast({
        type: 'success',
        message: `Code ${code} copied to clipboard!`,
      });
    });
  };

  return {
    copiedCodeId,
    isBeginning,
    isEnd,
    navigationPrevRef,
    navigationNextRef,
    paginationRef,
    onCopyCode,
    setIsBeginning,
    setIsEnd,
    setSwiper,
  };
};
