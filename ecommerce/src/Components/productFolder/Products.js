import React, { useEffect, useState } from 'react'
import Product from './Product'

import  "../../projectStyling/Products.css"
import {Row,Col, Spin} from "antd"

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
function Products() { 
           
            const productsData= useSelector( state => state.loadDataServer||[] )

            
            console.log(productsData);
            console.log('this is the data from mysql and backend response');
            //  the problem was i was not call the correct splice name to that is the reason.

            console.log(productsData.status);
            console.log('this is productData.status value');
            // console.log(" if products is shown then redux state data is successfully loaded");
            // console.log(productsData);

           
    return (
        <div className='ProductsContainer'>
        <h2 style={{textAlign:"center",fontFamily:"sans-serif"}}>OUR PRODUCTS</h2>
        {/* we have to give unique key for our indivial array item for react 
         we can do this my 2 stuff
         1. one is by giving the index of array directly 
         2. Giving your own data*/}
         
            <Row
              gutter={[20,35]}
              className='GridRowStyling'
             >
                        
                {
                        productsData.status === 'pending' ? (
                            <Spin size='large'></Spin>
                        )
                            : (
                            productsData.data.map((productData) => (
                            <Col className='GridColumn' key={productData.id}>
                                <Product data={productData} />
                            </Col>
                            ))
                            )
                }
 
           </Row>
        </div>
    )
}

export default Products;
