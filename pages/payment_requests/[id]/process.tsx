import Head from "next/head";
import LayoutDash from "src/features/app/components/layout/LayoutDash";
import { ProtectRoute } from 'src/features/auth'
import ProcessPaymentRequest from 'src/features/app/components/pages/PaymentRequests/Process'

const ProcessPaymentRequestPage = () => {
  return (
    <ProtectRoute>
      <LayoutDash>
        <Head>
          <title>Process Payment Request</title>
        </Head>
        <ProcessPaymentRequest />
      </LayoutDash>
    </ProtectRoute>
  );
};

export default ProcessPaymentRequestPage