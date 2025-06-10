import {
  CouponType,
  CreateCouponBodyType,
  UpdateCouponBodyType,
} from '@/models/coupon.model';

export type TCouponViewProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCoupon: CouponType | null;
  form: any;
  handleSubmit: (values: CreateCouponBodyType | UpdateCouponBodyType) => void;
  isSubmitting: boolean;
  handleDelete: () => void;
  isSubmittingDelete: boolean;
};
