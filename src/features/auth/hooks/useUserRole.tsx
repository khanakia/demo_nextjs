import { useEffect, useState } from 'react';
import { isLoggedIn } from 'src/features/auth/utils/client'
import { useAuth } from "../stores"
import { Role_Agent, Role_Member, Role_Admin } from "src/features/app/domain"

export type TUserRole = {
  isAdmin?: boolean
  isAgent?: boolean
  isMember?: boolean
  name?: string

  // check if the state already set. For e.g let say we want to craete a layout wrapper and based on role
  // want to allow or disallow the component to render and let say if user is not admin then redirec to home
  // then it will always redirect to home even user is admin because first isAdmin==false so we want to know that
  // set was state already then take action i.e. router.push("/home")
  isLoading?: boolean 
}

const useUserRole = (): TUserRole => {
  const [userRole, setUserRole] = useState<TUserRole>({isLoading: true});
  const { user } = useAuth()

  // Need to change the state otherwise conditional rendering will not work e.g. {userRole.isAdmin ? <Users /> : null}
  useEffect(() => {
    setUserRole({
      isAdmin: user?.role==Role_Admin, 
      isAgent: user?.role==Role_Agent, 
      isMember: user?.role==Role_Member, 
      name: user?.role,
      isLoading: false
    })
    
  }, [userRole.name !== user?.role]);

  return userRole;
};

export default useUserRole