import {Footer} from './Footer/Footer.jsx'
import {Header} from './Header/Header.jsx'
import { useAuth } from '../../hooks/useAuth.jsx'
import { SidebarAdmin } from './SidebarAdmin/SidebarAdmin.jsx'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

export default function Layout(props) {
  const { user, loadingUser } = useAuth();

  if (loadingUser) {
    return <></>;
  }

  return (
    <>
      <Header></Header>
      <div className='flex flex-1'>
        {user?.role.includes('admin') && 
          <SidebarAdmin></SidebarAdmin>
        }
        <main className='flex-1 min-h-10vh'>
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