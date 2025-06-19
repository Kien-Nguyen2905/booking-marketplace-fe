export type TStartRatingProps = {
  rating: number;
  size?: number;
  interactive?: boolean;
  onChange?: (value: number) => void;
  maxRating?: number;
};
