import {Footer} from './Footer/Footer.jsx'
import {Header} from './Header/Header.jsx'
import { useAuth } from '../../hooks/useAuth.jsx'
import { SidebarAdmin } from './SidebarAdmin/SidebarAdmin.jsx'
import PropTypes from 'prop-types'
import { useMediaQuery } from 'react-responsive'
import { MobileHeader } from './Header/MobileHeader.jsx'
import { SiteNotice } from '../SiteNotice/SiteNotice.jsx'

// Por debajo de este ancho se usa el header con menú desplegable.
const MOBILE_QUERY = '(max-width: 1024px)'

export default function Layout(props) {
  const { user, loadingUser } = useAuth();
  const isMobile = useMediaQuery({ query: MOBILE_QUERY });

  if (loadingUser) {
    return <></>;
  }

  return (
    <>
      <SiteNotice />
      {isMobile ? <MobileHeader /> : <Header />}
      <div className='flex flex-1 pt-6 pb-20'>
        {!isMobile && user?.role.includes('admin') &&
          <SidebarAdmin></SidebarAdmin>
        }
        <main className={isMobile ? 'flex-1 min-h-10vh' : 'flex-1 min-h-10vh mt-4'}>
          {props.children}
        </main>
      </div>
      <Footer></Footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}
