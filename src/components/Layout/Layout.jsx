import {Footer} from './Footer/Footer.jsx'
import {Header} from './Header/Header.jsx'
import PropTypes from 'prop-types'

export default function Layout(props) {
  return (
    <>
      <Header></Header>
      {props.children}
      <Footer></Footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}