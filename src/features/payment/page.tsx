'use client';
import { PREFIX_CONTENT_ORDER } from '@/constants';
import { usePaymentPage } from '@/features/payment/hooks';
import Image from 'next/image';
import { useMemo } from 'react';

const PaymentPage = () => {
  const { order, timeRemaining, formattedTime } = usePaymentPage();

  // Determine timer color based on remaining time
  const timerColor = useMemo(() => {
    if (timeRemaining === null) return 'text-textGrey';
    if (timeRemaining <= 60) return 'text-red-600';
    if (timeRemaining <= 300) return 'text-amber-500';
    return 'text-blue-600';
  }, [timeRemaining]);
  return (
    <div className="container mx-auto flex items-center justify-center h-[700px]">
      <div className="p-6 text-center bg-white rounded-lg shadow-lg relative">
        {/* Countdown Timer */}
        <div className="absolute top-3 right-3 flex flex-col items-end">
          <div className={`text-lg font-medium ${timerColor}`}>
            {formattedTime()}
          </div>
        </div>
        <h1 className="mb-4 text-2xl font-bold text-primary">
          QR Code Payment
        </h1>
        <p className="mb-6 text-darkGrey">
          Scan the QR code below to make a payment.
        </p>
        <div className="inline-block p-4 bg-white border border-gray-200 rounded-lg">
          <Image
            src={`https://qr.sepay.vn/img?acc=0704590124&bank=MBBank&amount=${order?.totalPrice}&des=${PREFIX_CONTENT_ORDER.PAY}${order?.id}`}
            alt="QR Code"
            className="object-cover w-64 h-64"
            width={256}
            height={256}
          />
        </div>
        <p className="mt-4 text-sm text-textGrey">
          Bank: MBBank | Account: 0704590124
        </p>
        <p className="mt-1 text-sm text-textGrey">NGUYEN TRUNG KIEN</p>

        <div className="mt-6">
          <p className="text-sm text-red-600">
            Your payment will automatically cancel after 20 minutes if not
            completed
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
