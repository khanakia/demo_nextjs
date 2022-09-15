import cx from "classnames";
import Link from "next/link";

type LayoutProps = {
  center?: boolean;
  children?: React.ReactNode;
};
const LayoutAuth: React.FC<LayoutProps> = ({ center, children }) => {
  let classname = cx("layout__main", { layout__center: center });

  return (
    <div className='layout'>
      <div className='auth-wrapper auth-cover'>
        <div className='auth-inner row m-0'>
          <Link href='/'>
            <a className='brand-logo'>
                <img className='img-fluid' src='/images/logo.png' alt='Login' />
            </a>
          </Link>
{/* 
          <div className='d-none d-lg-flex col-lg-8 align-items-center p-5'>
            <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
              <img className='img-fluid' src='/images/login-v2.svg' alt='Login' />
            </div>
          </div> */}

          <div className='d-flex align-items-center auth-bg p-lg-5'>
            <div className='col-12 col-sm-8 col-md-6 col-lg-4 px-xl-2 mx-auto'>
              
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutAuth;
