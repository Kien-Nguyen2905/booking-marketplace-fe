export type TOtpCardProps = {
  title: string;
  subtitle?: string;
  otpValue: string;
  handleOtpChange: (value: string) => void;
  error?: string;
  isSubmitting?: boolean;
  handleGoBack?: () => void;
  children?: React.ReactNode;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};
