import { Sidebar, Menu, MenuItem } from "react-pro-sidebar"
import { FaClipboardList, FaArrowLeft, FaArrowRight, FaPlus, FaBox, FaBoxes, FaList } from "react-icons/fa"
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./SidebarAdmin.css"

export function SidebarAdmin() {
    const [collapsed, setCollapsed] = useState(false);
    const { pathname } = useLocation();
    const isActive = (path) => pathname.startsWith(path);
    const width = collapsed ? "80px" : "250px";
    return (
        <div className="admin-layout-sidebar-spacer" style={{width: width, minWidth: width}}>
            <Sidebar
                className="admin-layout-sidebar-container"
                collapsed={collapsed}
                width={width}
                collapsedWidth="80px"
                backgroundColor="transparent"
                rootStyles={{border: "none", position: "sticky", top: "calc(var(--header-h) + 1rem)", alignSelf: "flex-start"}}
            >
                <Menu>
                    <MenuItem className="sidebar-option-title" icon={collapsed ? <FaArrowRight /> : <FaArrowLeft />} onClick={() => setCollapsed(!collapsed)} aria-label={collapsed ? "Expandir menú" : "Contraer menú"}>Panel de administración</MenuItem>
                    <MenuItem className="sidebar-option-button" active={isActive("/moderation/add_product")} icon={<FaPlus />} component={<Link to="/moderation/add_product" />}>Agregar producto</MenuItem>
                    <MenuItem className="sidebar-option-button" active={isActive("/moderation/orders")} icon={<FaClipboardList />} component={<Link to="/moderation/orders" />}>Pedidos</MenuItem>
                    <MenuItem className="sidebar-option-button" active={isActive("/moderation/stock")} icon={<FaBox />} component={<Link to="/moderation/stock" />}>Stock</MenuItem>
                    <MenuItem className="sidebar-option-button" active={isActive("/moderation/products")} icon={<FaBoxes />} component={<Link to="/moderation/products" />}>Productos</MenuItem>
                    <MenuItem className="sidebar-option-button" active={isActive("/moderation/categories")} icon={<FaList />} component={<Link to="/moderation/categories" />}>Categorías</MenuItem>
                </Menu>
            </Sidebar>
        </div>
    )
}