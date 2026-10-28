import githubLogo from '../../../assets/logos/github-logo.png'
import linkedinLogo from '../../../assets/logos/linkedin-logo.png'
import './Footer.css'

export function Footer () {
    return (
      <footer className='site-footer'>
        <div className='footer-inner'>
          <p className='footer-credit'>Diseñado y desarrollado por Mariano Lotero Rolón</p>
          <ul className='social-list'>
            <li className='social-list-item github-logo'>
              <a
                className='social-list-item-link'
                href='https://github.com/MarianoNLR'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='GitHub de Mariano Lotero Rolón'
              >
                <img src={githubLogo} alt='' className='social-list-item_image' />
              </a>
            </li>
            <li className='social-list-item'>
              <a
                className='social-list-item-link'
                href='https://www.linkedin.com/in/mariano-lotero-rol%C3%B3n-26011124a/'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='LinkedIn de Mariano Lotero Rolón'
              >
                <img src={linkedinLogo} alt='' className='social-list-item_image' />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    )
}
