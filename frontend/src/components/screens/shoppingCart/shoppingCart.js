import './shoppingCart.css';
import CartItem from '../../cart/cartItem';

export const Cart = () => {
        return (
            <div className="shoppingcart">
                <div className="shoppingcart_left">
                    <h2>Tu carrito</h2>

                    <CartItem />
                </div>
                <div className="shoppingcart_right">
                    <div className='shoppingcart_info'>
                        <p>Subtotal (0) items</p>
                        <p>$499.99s</p>
                    </div>
                    <div>
                        <button>Gracias Por Comprar</button>
                    </div>
                </div>
            </div>
    )
}