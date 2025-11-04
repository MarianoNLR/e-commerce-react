import { Sidebar, Menu, MenuItem } from "react-pro-sidebar"
import { FaClipboardList, FaArrowLeft, FaArrowRight, FaPlus, FaBox } from "react-icons/fa"
import { useState } from "react";
import { Link } from "react-router-dom";
import "./SidebarAdmin.css"

export function SidebarAdmin() {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Sidebar className="admin-layout-sidebar-container" collapsed={collapsed} backgroundColor="transparent" style={{border: "none"}}>
            <Menu>
                <MenuItem className="sidebar-option-button" icon={collapsed ? <FaArrowRight /> : <FaArrowLeft />} onClick={() => setCollapsed(!collapsed)}>Admin Panel</MenuItem>
                <MenuItem className="sidebar-option-button" icon={<FaPlus />} component={<Link to="/moderation/add_product" />}>Agregar Producto</MenuItem>
                <MenuItem className="sidebar-option-button" icon={<FaClipboardList />} component={<Link to="/moderation/orders" />}>Ver Órdenes</MenuItem>
                <MenuItem className="sidebar-option-button" icon={<FaBox />} component={<Link to="/moderation/stock" />}>Ver Stock</MenuItem>
            </Menu>
        </Sidebar>
    )
}