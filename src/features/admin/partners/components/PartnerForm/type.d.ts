import { PartnerType, UpdatePartnerByAdminBodyType } from '@/models';

export type TPartnerFormProps = {
  partner?: PartnerType;
  open: boolean;
  onClose: () => void;
  form: any;
  onSubmit: (value: UpdatePartnerByAdminBodyType) => void;
  isSubmitting: boolean;
};
