import Head from "next/head";
import LayoutDash from "src/features/app/components/layout/LayoutDash";
import { ProtectRouteMember } from 'src/features/auth'
import List from 'src/features/app/components/pages/member/mk/Sessions'

export default function MemberMkSessionsPage() {
  return (
    <ProtectRouteMember>
      <LayoutDash>
        <Head>
          <title>Mk - Play Sessions</title>
        </Head>
        <List />
      </LayoutDash>
    </ProtectRouteMember>
  );
};

