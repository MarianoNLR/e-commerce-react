import { Sidebar, Menu, MenuItem } from "react-pro-sidebar"
import { FaClipboardList, FaArrowLeft, FaArrowRight, FaPlus, FaBox, FaBoxes, FaList } from "react-icons/fa"
import { useState } from "react";
import { Link } from "react-router-dom";
import "./SidebarAdmin.css"

export function SidebarAdmin() {
    const [collapsed, setCollapsed] = useState(false);
    const width = collapsed ? "80px" : "250px";
    return (
        <div className="admin-layout-sidebar-spacer" style={{width: width, minWidth: width}}>
            <Sidebar
                className="admin-layout-sidebar-container"
                collapsed={collapsed}
                width={width}
                collapsedWidth="80px"
                backgroundColor="transparent"
                rootStyles={{border: "none", position: "sticky", top: "6rem", alignSelf: "flex-start"}}
            >
                <Menu>
                    <MenuItem className="sidebar-option-button" icon={collapsed ? <FaArrowRight /> : <FaArrowLeft />} onClick={() => setCollapsed(!collapsed)}>Admin Panel</MenuItem>
                    <MenuItem className="sidebar-option-button" icon={<FaPlus />} component={<Link to="/moderation/add_product" />}>Agregar Producto</MenuItem>
                    <MenuItem className="sidebar-option-button" icon={<FaClipboardList />} component={<Link to="/moderation/orders" />}>Ver Órdenes</MenuItem>
                    <MenuItem className="sidebar-option-button" icon={<FaBox />} component={<Link to="/moderation/stock" />}>Ver Stock</MenuItem>
                    <MenuItem className="sidebar-option-button" icon={<FaBoxes />} component={<Link to="/moderation/products" />}>Ver Productos</MenuItem>
                    <MenuItem className="sidebar-option-button" icon={<FaList />} component={<Link to="/moderation/categories" />}>Ver Categorias</MenuItem>
                </Menu>
            </Sidebar>
        </div>
    )
}