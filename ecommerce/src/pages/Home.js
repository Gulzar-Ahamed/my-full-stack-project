import React, { useEffect } from 'react'
import Announcement from '../Components/Announcement.js'
import NavigationBar from '../Components/NavigationBar.js'
import SliderCarousel from '../Components/SliderCarousel.js'

import Products from '../Components/productFolder/Products.js';
import { useDispatch } from 'react-redux'
import NewsLetter from '../Components/NewsLetter.js';

import Footer from '../Components/Footer.js';



import { getProductsData } from '../Features/dataFromServer/LoadDataServer'


function Home() {
 const dispatch= useDispatch();

 useEffect(
    ()=>{
        // .. start from here. on 13th jan
        // i have configured the backend od only i need to call the api to get the product information using axios and store the data in redux toolkit just we did earlier
                // const getProductsData=()=>{
                  // try {
                  //      const response= axios.get("http://localhost:4000/getproducts",(req,res)=>{
                  //               console.log(response);
                  //               console.log("this is response from server");
                  //               console.log(response.data);
                  //               console.log('this is response data from server');
                  //          }
                  //    )
                  // } catch (error)  
                  // }                    
                console.log("this is useeffect before calling getporudcct data");
                //  problem resolved this wasn't worked out because i haven't use dispatch function to call this function which is a procedure    
                dispatch(getProductsData()) 
      },[])



    return (
        <>
             <Announcement />
            <NavigationBar  />       
            <SliderCarousel /> 
            
            {/* <Categories /> */}
            {/* will think about this later but for now we don't want.. */}
            
            <Products />
       
            <NewsLetter />
        
           <Footer />
        </>
    )
}

export default Home
