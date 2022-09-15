import { useAuth, useUserRole } from "src/features/auth";
import { useRouter } from 'next/router'

export const RoleWrapperAdminAgent = ({children }: {children: (React.ReactElement|null) }) => {
  const router = useRouter()
  const userRole = useUserRole()
  if(!userRole.isAdmin || !userRole.isAgent) {
    router.push("/")
    return null
  }
 
  return children;
};


export const RoleWrapperAdmin = ({  children }: {children: (React.ReactElement|null) }) => {
  const router = useRouter()
  const userRole = useUserRole()
  if(!userRole.isAdmin) {
    router.push("/")
    return null
  }
 
  return children;
};

export const RoleWrapperAgent = ({  children }: {children: (React.ReactElement|null) }) => {
  const router = useRouter()
  const userRole = useUserRole()
  if(!userRole.isAgent) {
    router.push("/")
    return null
  }
 
  return children;
};
