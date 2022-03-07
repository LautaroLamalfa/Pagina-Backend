import './HomePage.css';
import { Productos } from '../../Productos/productos';

export const HomePage = () => {
        return (
            <div className="homepage">
                <h2 className='home_title'>Estos son nuestros productos disponibles</h2>

                <div className='homepage_products'>
                    <Productos /> 
                    <Productos /> 
                    <Productos />  
                    <Productos /> 
                    <Productos /> 
                    <Productos /> 
                </div>
            </div>
    )
}
