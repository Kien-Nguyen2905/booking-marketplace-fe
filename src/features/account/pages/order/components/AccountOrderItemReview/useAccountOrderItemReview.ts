import { handleErrorApi } from '@/lib/helper';
import { showToast } from '@/lib/toast';
import {
  CreateReviewBodySchema,
  CreateReviewBodyType,
  OrderType,
} from '@/models';
import { useCreateReviewMutation } from '@/queries';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useCallback, useEffect } from 'react';

export const useAccountOrderItemReview = (
  onOpenChange: (open: boolean) => void,
  selectedOrder: OrderType,
) => {
  const { mutateAsync: createReview, isPending: isSubmitting } =
    useCreateReviewMutation();
  const form = useForm<CreateReviewBodyType>({
    resolver: zodResolver(CreateReviewBodySchema),
    defaultValues: {
      title: '',
      content: '',
      rating: 0,
      orderId: selectedOrder.id,
      hotelId: selectedOrder.hotelId,
    },
  });

  const handleRatingChange = useCallback(
    (value: number) => {
      // Ensure rating is an integer between 0 and 5
      const rating = Math.min(Math.max(Math.round(value), 0), 5);
      form.setValue('rating', rating);
    },
    [form],
  );

  const handleCreateReview = async (values: CreateReviewBodyType) => {
    try {
      const { data } = await createReview(values);
      if (data.data.id) {
        showToast({
          type: 'success',
          message: 'Review created successfully',
        });
        onOpenChange(false);
      }
    } catch (error) {
      handleErrorApi({ error });
    }
  };

  useEffect(() => {
    if (!selectedOrder) return;
    form.reset({
      title: '',
      content: '',
      rating: 0,
      orderId: selectedOrder.id,
      hotelId: selectedOrder.hotelId,
    });
  }, [selectedOrder, form]);

  return { form, handleCreateReview, handleRatingChange, isSubmitting };
};
