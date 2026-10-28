import PropTypes from 'prop-types'
import './FilterPanelOption.css'
import { NavLink } from 'react-router-dom'

export function FilterPanelOption (props) {
    return (
        <NavLink
            to={props.categoryId ? `/products/${props.categoryId}` : '/'}
            end={!props.categoryId}
            className='filter-chip'
        >
            {props.name}
        </NavLink>
    )
}

FilterPanelOption.propTypes = {
    name: PropTypes.string,
    categoryId: PropTypes.string
}
