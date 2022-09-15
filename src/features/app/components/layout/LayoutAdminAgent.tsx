import { useRouter } from 'next/router'
import { useUserRole, useAuth } from "src/features/auth";
import LayoutDash from "./LayoutDash"

export default function Layout({ children }: {children: React.ReactNode  }): React.ReactElement | null {
  const router = useRouter()
  const userRole = useUserRole()
  
  if(!userRole.isAdmin && !userRole.isAgent && !userRole.isLoading) {
    router.push("/")
    return null
  }
  
  return <LayoutDash>{children}</LayoutDash>;
};