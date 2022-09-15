import Head from "next/head";
import LayoutDash from "src/features/app/components/layout/LayoutDash";
import { ProtectRouteMember } from 'src/features/auth'
import JantriPage from 'src/features/app/components/pages/member/mk/Sessions/JantriPage'

export default function AdminMkSessionDeclarePage() {
  return (
    <ProtectRouteMember>
      <LayoutDash>
        <Head>
          <title>MK - Jantri Session</title>
        </Head>
        <JantriPage />
      </LayoutDash>
    </ProtectRouteMember>
  );
};