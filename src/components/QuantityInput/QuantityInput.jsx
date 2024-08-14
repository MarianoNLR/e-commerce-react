import { useState } from "react";
import './QuantityInput.css'

export function QuantityInput ({ quantity, setQuantity, stock }) {
    

    const handleSubQuantity = (e) => {
        e.preventDefault()
        setQuantity(prev => {
            const newQuantity = prev - 1
            return newQuantity > 1 ? newQuantity : 1
        })
    }

    const handleAddQuantity = (e) => {
        e.preventDefault()
        setQuantity(prev => {
            const newQuantity = prev + 1
            return newQuantity <= stock ? newQuantity : prev
        })
    }

    return (
        <>
            <div className="quantity-input-wrapper">
                <span className="quantity-title">Cantidad: </span> 
                <div className="quantity-input-controls-wrapper">
                <input type="button" className="quantity-input subtract" value="-" onClick={(e) => handleSubQuantity(e)} />
                <span className="quantity-output">{quantity}</span>
                <input type="button" className="quantity-input add" value="+" onClick={(e) => handleAddQuantity(e)}/>
                </div>
            </div>
        </>
    )
}