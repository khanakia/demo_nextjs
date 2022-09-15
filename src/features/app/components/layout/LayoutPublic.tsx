import cx from 'classnames'
import NavBar from './NavBar'
import Footer from './Footer'

type LayoutProps = {
  center?: boolean
  children?: React.ReactNode
}

const LayoutPublic: React.FC<LayoutProps>  = ({ center, children }) => {

  let classname = cx('layout__main', { 'layout__center': center})

  return (
    <div className="layout">
      <NavBar />
      <main className={classname}>{children}</main>
      <Footer />
    </div>
  )
}

export default LayoutPublic