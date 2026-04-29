import { useEffect, useState } from 'react';
import api from '../../../api.js';
import './OrdersViewPage.css';
import { useNavigate } from 'react-router-dom';
import { PaginationControls } from '../../../components/PaginationControls/PaginationControls.jsx';

export function OrdersViewPage () {
    const [data, setData] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
        // Lógica para obtener las órdenes desde la API
        api.get(`/orders?page=${page}`)
        .then(res => {
            console.log(res.data);
            setData(res.data);
            setLoadingOrders(false);
        })
        .catch(err => {
            console.error(err);
            setLoadingOrders(false);
        });
    }

    fetchOrders();
    }, [page]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS'
        }).format(price);
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('es-AR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    const handleViewMore = (order) => {
        // Lógica para ver más detalles de la orden
        console.log('Ver más detalles de la orden:', order.id);
        navigate(`/moderation/orders/${order.id}`, { state: { order } });
    }

    const handlePageChange = (nextPage) => {
        if (nextPage < 1 || nextPage === page) {
            return;
        }

        setPage(nextPage);
    }

    if (loadingOrders) {
        return <main className="orders-view-page-main">Cargando órdenes...</main>;
    }

    return (
        <main className="orders-view-page-main">
            <h1>Lista de Pedidos</h1>
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Productos</th>
                        <th>Total</th>
                        <th>Estado</th>
                        <th>Fecha de Creación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.orders?.map((order, index) => (
                        <tr key={index} className="order-row">
                            <td className="order-id">{order.id}</td>
                            <td className="order-products-count">{order.items.length} productos</td>
                            <td className="order-total">{formatPrice(order.total)}</td>
                            <td className="order-status">{order.status}</td>
                            <td className="order-date">{formatDate(order.createdAt)}</td>
                            <td className="order-actions">
                                <button 
                                    className="order-view-more-btn"
                                    onClick={() => handleViewMore(order)}
                                >
                                    Ver más
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <PaginationControls
                currentPage={page}
                hasMore={Boolean(data.hasMore)}
                isLoading={loadingOrders}
                onPageChange={handlePageChange}
            />
        </main>
    );
}