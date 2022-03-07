import "../cart/cartItem.css"
import { Link } from "react-router-dom"
const CartItem = () => {
    <div className= "cartitem">
        <div className="cartitem_image">
        <img 
            src='https://res.cloudinary.com/dpr3boqjf/image/upload/v1628116993/sample.jpg' 
            alt='productImage'/>
        </div> 

        <Link to={`/product/${1111}`} className="cartitem_name">
            <p>Product 1</p>
        </Link>   

        <p className="cartitem_price">$499.99</p>

        <select className="cartitem_select">
            <option value="1">1</option>   
            <option value="2">2</option>   
            <option value="3">3</option>   
            <option value="4">4</option>   
        </select>

        <button className="cartitem__deleteBtn">
            <i className="fas fa-trash"></i>    
        </button>
    </div>
}

export default CartItem