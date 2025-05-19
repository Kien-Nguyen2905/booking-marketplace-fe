'use client';
import { Loading } from '@/components';
import { ROUTES } from '@/constants';
import { showToast } from '@/lib/toast';
import { useUrlOauthQuery } from '@/queries';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const GooglePage = () => {
  const router = useRouter();
  const { data, error } = useUrlOauthQuery();
  const url = data?.data.data.url;
  if (error) {
    router.push(ROUTES.HOME);
    showToast({
      type: 'error',
      message: error.message,
    });
  }
  useEffect(() => {
    if (url) {
      router.push(url);
    } else {
    }
  }, [router, url]);

  return <Loading></Loading>;
};

export default GooglePage;
