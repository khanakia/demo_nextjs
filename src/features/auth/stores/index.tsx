import React, { createContext, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import Router, { useRouter } from 'next/router'
import { isLoggedIn, getTokenName, getTokenDecoded } from '../utils/client'
import { Role_Agent, Role_Member, Role_Admin } from "src/features/app/domain"
type User = {
  id: string
  sub: string
  role: string
  name: string
  phone: string
  companyId: string
  exp: number
}

type AuthContextProps = {
  isAuthenticated: boolean, 
  loading: boolean, 
  user?: User, 
  logout: any
  login: Function
}
const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false, 
  loading: false, 
} as any);

export const AuthProvider = ({ children } : any) => {
    const [user, setUser] = useState(undefined)
    const [loading, setLoading] = useState(true) // Prevent Expected server HTML to contain a matching

    useEffect(() => {
      // Load user from cookie
      updateUser()
      setLoading(false)
    }, [])

    const updateUser = () => {
      const user = getTokenDecoded()
      if(user) {
        setUser(user)
      }
    }

    const login = (token: string) => {
      if (!token) return '';
      Cookies.set(getTokenName(), token, {domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN});
      updateUser()
    }

    const logout = () => {
      Cookies.remove(getTokenName(), {domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN});
      setUser(undefined)
    }

    // isLoggedIn() && !loading - we did to prevent SSR match issue Expected server HTML to contain a matching <div> in <div>.
    // so code should execute only on client not on SSR
    return (
      <AuthContext.Provider value={{ isAuthenticated: isLoggedIn() && !loading, loading, user, login, logout }}>
          {children}
      </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

type ProtectRouteProps = {
  bypass?: boolean, 
  allowOnlyRoles?:string[], 
  children: (React.ReactElement|null) 
}
/* 
  bypass - We had the event single page which can be private and public both so we created a new
  param bypass which equals to `isPublic` so if bypass is true then we do not need to authenticate
*/
export const ProtectRoute = ({ bypass,  children, allowOnlyRoles=[] }: ProtectRouteProps) => {
  const { isAuthenticated, loading, user } = useAuth();
  const router = useRouter()
  // If loading or not window that code is executing server side
  if(typeof window == 'undefined' || loading) return null

  if(bypass) return null

  // Run only on client side
  if ((!isAuthenticated &&  window.location.pathname !== '/login')){
    // window.location.pathname = '/login'
    router.push(`/auth/login?redirect=${router.asPath}`)
    return null
  }

  if(allowOnlyRoles.length>0 && allowOnlyRoles.indexOf(user?.role as any) == -1 ) {
    router.push(`/`)
    return null
  }

  return children;
};

// Agent and Member cannot access admin routes if they tries then redirect to /
export const ProtectRouteAdmin = (props: ProtectRouteProps) => {
  let newprops = {...props}
  newprops.allowOnlyRoles = [...newprops.allowOnlyRoles||[], ...[Role_Admin] ]
  return <ProtectRoute {...newprops}  />;
};

export const ProtectRouteAgent = (props: ProtectRouteProps) => {
  let newprops = {...props}
  newprops.allowOnlyRoles = [...newprops.allowOnlyRoles||[], ...[Role_Agent] ]
  return <ProtectRoute {...newprops}  />;
};

export const ProtectRouteMember = (props: ProtectRouteProps) => {
  let newprops = {...props}
  newprops.allowOnlyRoles = [...newprops.allowOnlyRoles||[], ...[Role_Member] ]
  return <ProtectRoute {...newprops}  />;
};

export const ProtectRouteAdminAndAgent = (props: ProtectRouteProps) => {
  let newprops = {...props}
  newprops.allowOnlyRoles = [...newprops.allowOnlyRoles||[], ...[Role_Admin, Role_Agent] ]
  return <ProtectRoute {...newprops}  />;
};

export const PublicOnlyRoute = ({ children }: any) => {
  const { isAuthenticated, loading } = useAuth();

  // If loading or not window that code is executing server side
  if(typeof window == 'undefined' || loading) return null

  // Run only on client side
  if (isAuthenticated &&  window.location.pathname !== '/'){
    window.location.pathname = '/'
    return null
  }
  return children;
};