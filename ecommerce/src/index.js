import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

import App from './App';


import {LoginPage,NewPassword,ResetPassword} from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import ShoppingCart from './Components/ShoppingCartFolder/ShoppingCart';
import SingleProductPage from './Components/SingleProductPage';

import Home from './pages/Home';
import WishList from './Components/ShoppingCartFolder/wishList';

import ShippingDetails from './Components/shippingDetails/ShippingDetails';
import PageNotFound from './Components/PageNotFound';

import {Provider} from "react-redux"

import {store} from "./ReduxToolkit/Store";
import ViewOrders from './Features/OrderHistory/ViewOrders';


import OrderConfirmed from './Components/OrderConfirmed/OrderConfirmed';
import AboutMe from './Components/AboutMe/AboutMe';
import AdminWork from './Features/admin/AdminWork';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   
      <Provider store={store}>

            <Router>
            {/* <App /> */}
                <Routes>

                    <Route path='/' element={<Home />}/>
                    <Route path="/loginpage" element={ <LoginPage /> } />
                    <Route path="/registerpage" element={ <RegisterPage /> } />
                    {/* <Route path="/RegisterToRoot" element={<Navigate replace to="/" />} /> */}
                    <Route  path='/singleproductpage/:id' element={ <SingleProductPage /> }  />

                    <Route path='/shoppingcart'   element={ <ShoppingCart />  }  />
                
                    <Route path='/vieworders' element={ <ViewOrders /> } /> 
                   
                
                    <Route path='/wishlist' element={ <WishList /> }   />

                    <Route path='/shippingDetails' element={ <ShippingDetails /> } />
                    

                    <Route path='/orderConfirmed/:orderId' element={ <OrderConfirmed /> } />

                    <Route path='/aboutMe' element={ <AboutMe /> }    />

                    <Route path='/admin' element={ <AdminWork /> } />
                    <Route path='*' element={ <PageNotFound /> } />
                    <Route path="/resetPassword" element={<ResetPassword />} />
                    <Route path="/newPassword/:email" element={<NewPassword/>}   />
                    
                </Routes>
            </Router>
       
      </Provider>

  </React.StrictMode>
);


