import './productos.css'
import { Link } from 'react-router-dom'

export const Productos = () => {
    return (
        <div className='productos'>
            <img src='https://res.cloudinary.com/dpr3boqjf/image/upload/v1628116993/sample.jpg' alt='producto'/>

            <div className='productos_info'>
                <p className='info_name'>Product 1</p>   

                <p className='info_precio' >$499.99</p>

                <Link to={`/product/${1111}`} className='info_boton'>Mas detalle</Link>
            </div>
        </div>
    )
}