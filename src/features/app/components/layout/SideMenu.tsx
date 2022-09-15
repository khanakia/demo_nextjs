import { useRouter } from "next/router";
import Link from "next/link";
import { Menu, Layout } from "antd";
import React from "react";
import { useUserRole } from "src/features/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faBars } from "@fortawesome/free-solid-svg-icons";
import { NextAnchor } from "src/features/bite/components"

const menuItems: any = [
  {
    key: "/",
    href: "/",
    label: "Dashboard",
    icon: <FontAwesomeIcon icon={faBars} />,
    // activePaths: ["/", "/websites/[id]"],
    roles: ["admin", "agent", "member"],
  },

  {
    key: "games",
    href: "/games",
    label: "Games",
    icon: <FontAwesomeIcon icon={faBars} />,
    // activePaths: ["/games"],
    roles: ["admin"],
  },

  {
    key: "ledgers",
    href: "/ledgers",
    label: "Ledgers",
    icon: <FontAwesomeIcon icon={faBars} />,
    // activePaths: ["/ledgers"],
    roles: ['admin', 'agent', 'member']
  },

  {
    key: "user_balances",
    href: "/ledgers/ledger_balance_by_childs",
    label: "User Balances",
    icon: <FontAwesomeIcon icon={faBars} />,
    // activePaths: ["/ledgers"],
    roles: ['admin', 'agent']
  },

  {
    key: "me/payment_requests",
    href: "/me/payment_requests",
    label: "My Withdrawals",
    icon: <FontAwesomeIcon icon={faBars} />,
    // activePaths: ["/me/payment_requests"],
    roles: ["agent", "member"],
  },

  {
    key: "payment_requests",
    href: "/payment_requests",
    label: "Payment Requests",
    icon: <FontAwesomeIcon icon={faBars} />,
    // activePaths: ["/payment_requests"],
    roles: ["admin", "agent"],
  },

  {
    key: "payment_methods",
    href: "/payment_methods",
    label: "Payment Methods",
    icon: <FontAwesomeIcon icon={faBars} />,
    // activePaths: ["/payment_methods"],
    roles: ["agent", "member"],
  },

  {
    key: "mk_admin",
    // href: "/mk",
    label: "MK Admin",
    icon: <FontAwesomeIcon icon={faBars} />,
    // activePaths: ["/payment_methods"],
    roles: ["admin"],
    children: [
      {
        label: "Session",
        key: "mk_admin_sessions",
        href: "/admin/mk/sessions",
      },
      {
        label: "Jantri",
        key: "mk_admin_jantri",
        href: "/admin/mk/jantri",
      },
      {
        label: "Agents Total Bet",
        key: "agents_total_bet",
        href: "/admin/mk/session_entries/agents_total_bet",
      },

      {
        label: "Entries",
        key: "mk_admin_entries",
        href: "/admin/mk/session_entries",
      },
      {
        label: "Channels",
        key: "mk_admin_channels",
        href: "/admin/mk/channels",
      },
    ],
  },

  {
    key: "mk_agent",
    href: "/mk",
    label: "MK",
    icon: <FontAwesomeIcon icon={faBars} />,
    // activePaths: ["/payment_methods"],
    roles: ["agent"],
    children: [
      {
        label: "Session",
        key: "mk_agent_sessions",
        href: "/agent/mk/sessions",
      },
      {
        label: "Jantri",
        key: "mk_agent_jantri",
        href: "/agent/mk/jantri",
      },
      {
        label: "Entries",
        key: "mk_agent_entries",
        href: "/agent/mk/session_entries",
      },
      {
        label: "Users Total Bet",
        key: "users_total_bet",
        href: "/agent/mk/session_entries/users_total_bet",
      },
    ],
  },

  {
    key: "mk_member",
    // href: "/mk",
    label: "MK Member",
    icon: <FontAwesomeIcon icon={faBars} />,
    // activePaths: ["/payment_methods"],
    roles: ["member"],
    children: [
      {
        label: "Session",
        key: "mk_member_sessions",
        href: "/member/mk/sessions",
      },
      // {
      //   label: "Jantri",
      //   key: "mk_member_jantri",
      //   href: "/member/mk/jantri",
      // },
      // {
      //   label: "Entries",
      //   key: "mk_member_entries",
      //   href: "/member/mk/session_entries",
      // },
      // {
      //   label: "Channels",
      //   key: "mk_member_channels",
      //   href: "/member/mk/channels",
      // },
    ],
  },
  
];

function findMenuItem(items: any, paths: string[]): any {
  if (!paths) return;
  paths = paths.reverse();
  const sitem = (items || []).find((menuItem: any) => menuItem.key == paths[0]);
  // console.log(sitem, paths)

  paths.shift(); // remove first elem
  if (paths.length > 0 && sitem && sitem.children) {
    return findMenuItem(sitem.children, paths);
  }

  return sitem;
}

const SiderMenu = () => {
  const router = useRouter();
  const userRole = useUserRole();

  // const onClick = (item: any) => {
  //   const sitem = findMenuItem(menuItems, item.keyPath);

  //   // console.log(item)
  //   // const paths = item.keyPath.reverse()

  //   // const sitem = menuItems.find((menuItem: any) => menuItem.key==item.keyPath.reverse()[0])
  //   // console.log(sitem)
  //   if (!sitem || !sitem.href) return;
  //   router.push(sitem.href);
  // };

  let menuItems1 = menuItems.filter((menuItem: any) => {
    return menuItem.roles && menuItem.roles.includes(userRole?.name as any);
  });

  // convert ant menu to anchor tags so we can right click copy links
  menuItems1.map((item: any) => {
    if(typeof item.label !== "string") return item
    item.label=<NextAnchor label={item.label} href={item.href}/>
    (item.children||[]).map((item: any) => {
      if(typeof item.label !== "string") return item
      item.label=<NextAnchor label={item.label} href={item.href}/>
      return item
    })
    return item
  })

  return (
    <div className='mt-3'>
      <Menu
        className='sidebarMenu'
        defaultSelectedKeys={["/payment_methods"]}
        mode='inline'
        items={menuItems1}
        // onClick={onClick}
      />
    </div>
  );
};

export default SiderMenu;
