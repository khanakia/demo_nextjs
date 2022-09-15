import { useRouter } from "next/router";
import Link from "next/link";
import { Menu, Layout } from "antd";
import React from "react";
import { useUserRole } from "src/features/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faBars } from "@fortawesome/free-solid-svg-icons";

const Anchor = (props: {label: string, href: string, target?: string, rel?: string}) => {
  const { label, href, target="_self", rel="" } = props
  if(!href) {
    // console.log("href not defined ", label)
    return <>{label}</>
  }
  return (
    <Link href={href}>
      <a target={target} rel={rel}>
        {label}
      </a>
    </Link>
  )
}

export default Anchor