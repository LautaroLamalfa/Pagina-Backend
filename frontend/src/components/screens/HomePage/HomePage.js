import './HomePage.css';
import { Productos } from '../../Productos/productos';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { getProducts as listaDeProd } from '../../../redux/actions/productActions';
export const HomePage = () => {

    const dispatch = useDispatch()

    const getProducts = useSelector(state => state.getProducts)
    // const {products, loading, error} = getProducts;

    useEffect(() => {
        dispatch(listaDeProd())
    }, [dispatch])

        return (
            <div className="homepage">
                <h2 className='home_title'>Estos son nuestros productos disponibles</h2>

                <div className='homepage_products'>
                  {/* {loading ? <h2>Cargando...</h2> : error ? <h2>{error}</h2> : products.map(product => ( */}
                      <Productos />
                {/*    ))} */}
                </div>
            </div>
    )
}
