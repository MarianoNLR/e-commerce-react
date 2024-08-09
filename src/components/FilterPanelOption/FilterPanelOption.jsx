import PropTypes from 'prop-types'
import './FilterPanelOption.css'
import { Link } from 'react-router-dom'

export function FilterPanelOption (props) {
    return (
        <>
            <Link to={`/products/${props.categoryId}`}>
                <div className='option-wrapper'>
                    <p className='option'>{props.name}</p>
                </div>
            </Link>
        </>
    )
}

FilterPanelOption.propTypes = {
    name: PropTypes.string,
    categoryId: PropTypes.string
}