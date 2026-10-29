import { useEffect, useState } from 'react';
import api from '../../../api.js';
import { useNavigate } from 'react-router-dom';
import { OrderStatusBadge } from '../../../components/OrderStatusBadge/OrderStatusBadge.jsx';
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
        navigate(`/moderation/orders/${order.id}`, { state: { order } });
    }

    const handlePageChange = (nextPage) => {
        if (nextPage < 1 || nextPage === page) {
            return;
        }

        setPage(nextPage);
    }

    if (loadingOrders) {
        return <section className="admin-page admin-page-status" role="status">Cargando órdenes…</section>;
    }

    return (
        <section className="admin-page">
            <h1>Pedidos</h1>
            <div className="admin-table-wrapper">
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Productos</th>
                        <th>Total</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                        <th className="is-actions">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.orders?.map((order, index) => (
                        <tr key={order.id ?? index}>
                            <td className="order-id">{order.id}</td>
                            <td>{order.items.length} {order.items.length === 1 ? 'producto' : 'productos'}</td>
                            <td className="is-numeric">{formatPrice(order.total)}</td>
                            <td><OrderStatusBadge status={order.status} /></td>
                            <td>{formatDate(order.createdAt)}</td>
                            <td className="is-actions">
                                <button 
                                    type="button"
                                    className="btn btn-secondary btn-sm"
                                    onClick={() => handleViewMore(order)}
                                >
                                    Ver más
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <PaginationControls
                currentPage={page}
                hasMore={Boolean(data.hasMore)}
                isLoading={loadingOrders}
                onPageChange={handlePageChange}
            />
        </section>
    );
}