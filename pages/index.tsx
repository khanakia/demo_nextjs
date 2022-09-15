import Head from "next/head";
import LayoutDash from "src/features/app/components/layout/LayoutDash";
import { ProtectRoute } from 'src/features/auth'
import Users from 'src/features/app/components/pages/Users'
import { useAuth, useUserRole } from "src/features/auth";
import PlayGames from "src/features/app/components/pages/Other/PlayGames"

const Dash = () => {
  const userRole = useUserRole();
  return (
    <ProtectRoute>
      <LayoutDash>
        <Head>
          <title>Dashboard</title>
        </Head>
        { userRole.isMember ? <PlayGames /> : null }
        { userRole.isAdmin || userRole.isAgent ? <Users /> : null }
      </LayoutDash>
    </ProtectRoute>
  );
};

export default Dash