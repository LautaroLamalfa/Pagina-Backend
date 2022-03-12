import './Routes.css';
import {BrowserRouter as Router,  Switch,  Route} from "react-router-dom";
import { NavBar } from './components/navBar/navBar';
import {HomePage} from './components/screens/HomePage/HomePage';
import {ProductPage} from './components/screens/ProductPage/ProductPage';
import {Cart} from './components/screens/shoppingCart/shoppingCart';

const Routes = () => {
  return (
    <Router>
        <main className="routes">
             <NavBar />
                <Switch>
                    <Route exact path="/">
                      <HomePage/>
                    </Route>
                    <Route path="/product/:id">
                      <ProductPage/>
                    </Route>
                    <Route path="/shoppingcart" component={Cart}/>
                </Switch>
		</main>
    </Router>
  );
}

export default Routes