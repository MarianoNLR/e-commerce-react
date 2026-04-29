import './PaginationControls.css'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import PropTypes from 'prop-types'

export function PaginationControls({
  currentPage,
  hasMore,
  isLoading,
  onPageChange
}) {
  return (
    <nav className='pagination-controls' aria-label='Paginacion de pedidos'>
      <button
        type='button'
        className='pagination-button'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isLoading || currentPage <= 1}
        aria-label='Pagina anterior'
      >
        <FaChevronLeft aria-hidden='true' />
      </button>

      <span className='pagination-page'>Pagina {currentPage}</span>

      <button
        type='button'
        className='pagination-button'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLoading || !hasMore}
        aria-label='Pagina siguiente'
      >
        <FaChevronRight aria-hidden='true' />
      </button>
    </nav>
  )
}

PaginationControls.propTypes = {
  currentPage: PropTypes.number.isRequired,
  hasMore: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onPageChange: PropTypes.func.isRequired
}