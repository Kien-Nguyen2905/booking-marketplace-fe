import { useGetMetricsPartnerDashboardQuery } from '@/queries';
import { format } from 'date-fns';
import { useDebounce } from '@/hooks/useDebounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { parse } from 'date-fns';
import { useAppContext } from '@/context/AppProvider';
const usePartnerDashboardPage = () => {
  const { partnerProfile } = useAppContext();
  const searchParams = useSearchParams();
  console.log(partnerProfile?.hotel?.id?.toString());
  const { data, isLoading: isLoadingExports } =
    useGetMetricsPartnerDashboardQuery(
      partnerProfile?.hotel?.id?.toString() || '',
      searchParams.toString(),
    );

  const isLoading = useDebounce({
    initialValue: isLoadingExports,
    delay: 700,
  });

  const form = useForm<{ dateFrom: Date | null; dateTo: Date | null }>({
    defaultValues: {
      dateFrom: searchParams.get('dateFrom')
        ? parse(searchParams.get('dateFrom') || '', 'dd-MM-yyyy', new Date())
        : null,
      dateTo: searchParams.get('dateTo')
        ? parse(searchParams.get('dateTo') || '', 'dd-MM-yyyy', new Date())
        : null,
    },
  });
  const dateFromValue = form.watch('dateFrom');
  const router = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams.toString());
  const onDateFromChange = (value: Date) => {
    if (!value) return;
    form.setValue('dateFrom', value);
    if (form.getValues('dateTo') && value > form.getValues('dateTo')!) {
      params.delete('dateTo');
      form.setValue('dateTo', null);
    }
    const dateFrom = format(value, 'dd-MM-yyyy').toString();
    params.set('dateFrom', dateFrom);
    router.push(`${pathname}?${params.toString()}`);
  };

  const onDateToChange = (value: Date | null) => {
    if (!value) return;
    form.setValue('dateTo', value);
    const dateTo = format(value, 'dd-MM-yyyy').toString();
    params.set('dateTo', dateTo);
    router.push(`${pathname}?${params.toString()}`);
  };
  const onReset = () => {
    form.reset({
      dateFrom: null,
      dateTo: null,
    });
    params.delete('dateFrom');
    params.delete('dateTo');
    router.push(`${pathname}?${params.toString()}`);
  };
  const metric = data?.data.data;
  return {
    isLoading,
    form,
    onDateFromChange,
    onDateToChange,
    onReset,
    metric,
    dateFromValue,
  };
};
export default usePartnerDashboardPage;
