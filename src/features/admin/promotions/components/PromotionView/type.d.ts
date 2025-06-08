import {
  CreatePromotionBodyType,
  UpdatePromotionBodyType,
} from '@/models/promotion.model';

export type TPromotionViewProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPromotion: GetPromotionResType | null;
  form: any;
  handleSubmit: (
    values: CreatePromotionBodyType | UpdatePromotionBodyType,
  ) => void;
  isSubmitting: boolean;
  handleDelete: () => void;
  isSubmittingDelete: boolean;
};
