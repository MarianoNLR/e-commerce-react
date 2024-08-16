import githubLogo from '../../../assets/logos/github-logo.png'
import igLogo from '../../../assets/logos/ig-logo.png'
import linkedinLogo from '../../../assets/logos/linkedin-logo.png'
import './Footer.css'

export function Footer () {
    return (
      <footer>
        <div className="footer-wrapper">
          <div className='footer-social-wrapper'>
            <ul className='social-list'>
              <li className='social-list-item'><a className='social-list-item-link' href='https://github.com/MarianoNLR' target='_blank'>
              <img src={githubLogo} alt="" className='social-list-item_image'/></a>
              </li>
              <li className='social-list-item'><a className='social-list-item-link' href='https://www.instagram.com/marianolotero/' target='_blank'>
              <img src={igLogo} alt="" className='social-list-item_image'/>
              </a>
              </li>
              <li className='social-list-item'><a className='social-list-item-link' href='https://www.linkedin.com/in/mariano-lotero-rol%C3%B3n-26011124a/' target='_blank'>
              <img src={linkedinLogo} alt="" className='social-list-item_image'/>
              </a>
              </li>
            </ul>
          </div>
        <span>Designed and Developed by Mariano Lotero Rolón</span>
        </div>
        <div className='footer-info-wrapper'>
            Esta pagina web fue realizada como parte de un proyecto personal.
        </div>
      </footer>
    )
  }