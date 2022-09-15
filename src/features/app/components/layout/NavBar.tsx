import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faPlus, faUser, faSignOut, faQuestionCircle, faRocket } from "@fortawesome/free-solid-svg-icons";
import { useLoggedIn, useAuth } from "src/features/auth";
import Dropdown from "react-bootstrap/Dropdown";
import { Navbar, Nav } from "react-bootstrap";


export const GearComp = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { logout, isAuthenticated, user } = useAuth()

  function handleLogOut(e: any) {
    e.preventDefault();
    logout();
    setMounted(false);
    router.push("/auth/login");
  }

  useEffect(() => {
    setMounted(isAuthenticated);
  }, []);

  return mounted ? (
    <Dropdown>
      <Dropdown.Toggle variant='dark' className='py-0 me-3'>
        <FontAwesomeIcon icon={faCog} />        
      </Dropdown.Toggle>

      <Dropdown.Menu align='end'>
        <Link href={'/me'}>
          <a className='dropdown-item' href='#' >
            <FontAwesomeIcon icon={faUser} className='me-2' />
            Profile
          </a>
        </Link>
        <a className='dropdown-item' href='#' onClick={handleLogOut}>
          <FontAwesomeIcon icon={faSignOut} className='me-2' />
          Sign Out
        </a>
        <hr className='dropdown-divider' />
        <span className='p-2 note'>{user?.phone}</span>
      </Dropdown.Menu>
    </Dropdown>
  ) : null;
};

const LoginButton = () => {
  const mounted = useLoggedIn();
  // console.log(mounted)
  const url = "/auth/login";
  return !mounted ? (
    <a href={url} className='btn btn-primary btn-sm1 mb-2 mb-sm-0'>
      <FontAwesomeIcon icon={faUser} className='me-2' />
      LOGIN or REGISTER
    </a>
  ) : null;
};

const NavBar = () => {
  const router = useRouter();
  //  console.log(router.pathname)
  // const [mounted, setMounted] = useState(false);

  // function handleLogOut(e: any) {
  //   e.preventDefault();
  //   logout();
  //   router.push("/auth/login");
  // }

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  const { user } = useAuth()

  // if (!mounted) return null;

  return (
    <>
      <Navbar expand='lg' bg='light' variant='dark' className={"primary-nav p-0"}>
        <div className='container-fluid navinner'>
          <Link href={'/'}>
            <a className="navbar-brand">
              <img src="/images/logo.png" className="logo" />
            </a>
          </Link>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse className='justify-content-end'>
            <div className="me-2">
              Company: <span className="note">{user?.companyId}</span>
            </div>
            <div className="me-2">
              Role: <span className="note">{user?.role}</span>
            </div>
            <div className="me-2">
              ID: <span className="note">{user?.sub}</span>
            </div>
            <div className="me-2">
              User: <span className="note">{user?.phone}</span>
            </div>
            <GearComp />
          </Navbar.Collapse>
        </div>
      </Navbar>
    </>
  );
};

export default NavBar;
