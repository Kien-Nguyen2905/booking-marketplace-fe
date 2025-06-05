export type TLocationSelectorProps = {
  onChange: (location: LocationType) => void;
};
export type LocationType = {
  id: number;
  name: string;
  code: number;
};
