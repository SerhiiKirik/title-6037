import { Suspense } from 'react';
import { SuccessPage } from '@/pages/success';

const SuccessPageWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SuccessPage />
  </Suspense>
);

export default SuccessPageWrapper;
