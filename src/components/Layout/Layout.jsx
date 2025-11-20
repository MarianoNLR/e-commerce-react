import {Footer} from './Footer/Footer.jsx'
import {Header} from './Header/Header.jsx'
import { useAuth } from '../../hooks/useAuth.jsx'
import { SidebarAdmin } from './SidebarAdmin/SidebarAdmin.jsx'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { MobileHeader } from './Header/MobileHeader.jsx'

export default function Layout(props) {
  const { user, loadingUser } = useAuth();
  const isMobile = useMediaQuery({ query: '(max-width: 1300px)' });

  if (loadingUser) {
    return <></>;
  }

  return (
    <>
      {isMobile ? (
        <>
          <MobileHeader></MobileHeader>
          <div className='flex flex-1 py-20 mt-4'>
            <main className='flex-1 min-h-10vh'>
              {props.children}
            </main>
          </div>
        </>
      ) 
      : 
      (
      <>
        <Header></Header>
          <div className='flex flex-1 py-20 mt-4'>
            {user?.role.includes('admin') && 
              <SidebarAdmin></SidebarAdmin>
            }
            <main className='flex-1 min-h-10vh '>
              {props.children}
            </main>
          </div>
      </>
      )}
      <Footer></Footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}