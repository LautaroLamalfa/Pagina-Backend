import './ProductPage.css';


export const ProductPage = () => {
        return (
            <div className="productpage">
                <div className='productpage_left'>
                    <div className='left_image'>
                        <img src='https://res.cloudinary.com/dpr3boqjf/image/upload/v1628116993/sample.jpg' 
                            alt='productImage'/>
                    </div>

                    <div className='left_info'>
                        <p className='left_name'> Product 1 </p>    
                        <p> Precio : $499.99 </p>    
                        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                            sunt in culpa qui officia deserunt mollit anim id est laborum. </p>    
                    </div>
                </div>

                <div className='productpage_right'>
                    <div className='right_info'>
                        <p>
                            Price: <span>$499.99</span>
                        </p>
                        <p>
                            Cantidad <span> In stock</span>
                        </p>
                        <p>
                            Cantidad 
                            <select name='' id=''>
                                <option value="1">1</option>   
                                <option value="2">2</option>   
                                <option value="3">3</option>   
                                <option value="4">4</option>   
                            </select>
                        </p>
                        <p>
                            <button type='button'> Agregar al carrito </button>
                        </p>
                    </div>
                </div>
            </div>
    )
}