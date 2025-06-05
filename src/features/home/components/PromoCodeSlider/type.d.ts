export type TPromoCode = {
  id: string;
  title: string;
  code: string;
  description: string;
  percentage: number;
};

export type TPromoCodeSliderProps = {
  title?: string;
  className?: string;
  onCopy?: (code: string) => void;
};
