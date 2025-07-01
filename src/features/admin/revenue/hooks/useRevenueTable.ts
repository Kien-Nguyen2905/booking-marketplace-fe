import { useForm } from 'react-hook-form';
import { format, parse } from 'date-fns';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useExportPartnerRevenueQuery } from '@/queries';
import ExcelJS from 'exceljs';
import { showToast } from '@/lib/toast';
import { revenueColumns } from '@/features/admin/revenue/components/RevenueTable/RevenueColumn';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { formatCurrency } from '@/lib/utils';

export const useRevenueTable = () => {
  const searchParams = useSearchParams();
  const { data, isLoading } = useExportPartnerRevenueQuery(
    searchParams.toString(),
  );

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
  const exportsData = data?.data?.data;

  const handleExportExcel = async () => {
    if (!exportsData) return;
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Doanh thu Đối tác');
      worksheet.columns = [
        { header: 'Tên đối tác', key: 'partnerName', width: 15 },
        { header: 'Tên khách sạn', key: 'hotelName', width: 15 },
        { header: 'Số tài khoản', key: 'accountNumber', width: 15 },
        { header: 'Tên ngân hàng', key: 'bankAccount', width: 15 },
        { header: 'Tên chủ tài khoản', key: 'bankName', width: 15 },
        { header: 'Tổng giá trị đơn', key: 'totalOrderValue', width: 15 },
        {
          header: 'Tổng thanh toán qua nền tảng',
          key: 'totalBankingPayment',
          width: 25,
        },
        {
          header: 'Tổng thanh toán tại khách sạn',
          key: 'totalHotelPayment',
          width: 25,
        },
        { header: 'Lợi nhuận', key: 'platformProfit', width: 15 },
        { header: 'Lợi nhuận đối tác', key: 'partnerProfit', width: 15 },
        { header: 'Số tiền cần chuyển', key: 'transferAmount', width: 15 },
        { header: 'Hành động', key: 'transferAction', width: 15 },
        { header: 'Ngày bắt đầu', key: 'startDate', width: 15 },
        { header: 'Ngày kết thúc', key: 'endDate', width: 15 },
      ];

      exportsData.forEach((item) => {
        const transferAction =
          item.transferAmount > 0
            ? 'Sàn chuyển cho đối tác'
            : item.transferAmount < 0
            ? 'Đối tác trả nợ sàn'
            : 'Không cần chuyển khoản';

        const row = worksheet.addRow({
          partnerName: item.partnerName,
          hotelName: item.hotelName,
          accountNumber: item.accountNumber,
          bankName: item.bankName,
          bankAccount: item.bankAccount,
          totalOrderValue: formatCurrency(item.totalOrderValue),
          totalBankingPayment: formatCurrency(item.totalBankingPayment),
          totalHotelPayment: formatCurrency(item.totalHotelPayment),
          platformProfit: formatCurrency(item.platformProfit),
          partnerProfit: formatCurrency(item.partnerProfit),
          transferAmount: formatCurrency(item.transferAmount),
          transferAction,
          startDate: format(item.startDate, 'dd-MM-yyyy'),
          endDate: format(item.endDate, 'dd-MM-yyyy'),
        });

        row.eachCell((cell) => {
          cell.alignment = { horizontal: 'right' };
        });
      });

      // Định dạng hàng tiêu đề
      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).alignment = {
        horizontal: 'right',
      };

      // Tạo buffer và tải file
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'exported_file.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      showToast({
        type: 'error',
        message: (error as Error)?.message || 'Failed to export file',
      });
    }
  };

  const table = useReactTable({
    data: exportsData || [],
    columns: revenueColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return {
    form,
    dateFromValue,
    onDateFromChange,
    onDateToChange,
    onReset,
    exportsData,
    isLoading,
    handleExportExcel,
    table,
  };
};
