import NavBar, { GearComp } from "./NavBar";
import Footer from "./Footer";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./LayoutDash.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faRocket, faBars } from "@fortawesome/free-solid-svg-icons";
import cx from "classnames";
import { useUserRole } from "src/features/auth";
import SideMenu from "./SideMenu"

const menuItems = [
  {
    href: "/",
    title: "Dashboard",
    icon: faGlobe,
    activePaths: ["/", "/websites/[id]"],
  },

  {
    href: "/games",
    title: "Games",
    icon: faBars,
    activePaths: ["/games"],
    roles: ['admin']
  },

  // {
  //   href: "/games",
  //   title: "Agent Games",
  //   icon: faBars,
  //   activePaths: ["/games"],
  //   roles: ['agent']
  // },

  // {
  //   href: "/users",
  //   title: "Users",
  //   icon: faBars,
  //   activePaths: ["/users"],
  //   roles: ['agent', 'member']
  // },

  {
    href: "/ledgers",
    title: "Ledgers",
    icon: faBars,
    activePaths: ["/ledgers"],
    // roles: ['agent', 'member']
  },

  // {
  //   href: "/wallet_transfer",
  //   title: "Wallet Transfer",
  //   icon: faBars,
  //   activePaths: ["/Transfer"],
  //   roles: ['agent', 'admin']
  // },

  {
    href: "/me/payment_requests",
    title: "My Withdrawals",
    icon: faBars,
    activePaths: ["/me/payment_requests"],
    roles: ['agent', 'member']
  },

  {
    href: "/payment_requests",
    title: "Payment Requests",
    icon: faBars,
    activePaths: ["/payment_requests"],
    roles: ['admin', 'agent']
  },

  {
    href: "/payment_methods",
    title: "Payment Methods",
    icon: faBars,
    activePaths: ["/payment_methods"],
    roles: ['agent', 'member']
  },

  // {
  //   href: "/billing/subscriptions",
  //   title: 'Subscriptions',
  //   icon: faRocket,
  //   activePaths: [ '/billing/subscriptions']
  // },

  // {
  //   href: "/profile",
  //   title: 'Edit Profile'
  // }
];

const LayoutDash = ({ children } : any) => {
  // const router = useRouter();
  // const userRole = useUserRole()
  return (
    <main className={styles.LayoutMain}>
      <NavBar />
      <div className={styles.contentSection}>
        <div className={styles.Sider}>
          {/* <Link href={'/'}>
              <a className="navbar-brand ps-3 pt-3 d-block">
                <img alt="logo" src="/images/logo.png" className="logo" />
              </a>
            </Link> */}
          <SideMenu />
          {/* <ul className={styles.Menu}>
            {menuItems.map((item, i) => {
              const isActive = item.activePaths.indexOf(router.pathname) !== -1;
              const classname = cx({ active: isActive });
              if(item.roles && !item.roles.includes(userRole?.name as any)) return null
              return (
                <li key={i} className={classname}>
                  <Link href={item.href}>
                    <a aria-current='page'>
                      <span>
                        <FontAwesomeIcon icon={item.icon} className='me-3' />
                        {item.title}
                      </span>
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul> */}
        </div>
        <div className={styles.Content}>{children}</div>
      </div>
    </main>
  );
};

export default LayoutDash;
