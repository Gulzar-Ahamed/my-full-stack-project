import React from 'react'
import "./ImageCarousel.css"
import { Carousel,Card } from 'antd'
function ImageCarousel( {images} ) {
    return (
      <>
       <Carousel
           autoplay={true}
        //    this speed property is giving good UI effect
           speed={1000}
           className='carouselContainer'
          draggable
    //    style={{backgroundColor:"orange"}} 24/1/2024 the problem is when it becomes large view port its invisible if small it's worknig
          dotPosition='bottom'
         >
       {/* here image is an array  */}
                {images ? (
                    images.map((item, index) => (
                    <div key={index}>
                        {/* <Card className='carousel-card' style={{width:"200px"}}> */}
                        <img className='carousel-image' src={item} alt={index} />
                        {/* </Card> */}
                    </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
      </Carousel>
     </>
    )
}

export default ImageCarousel
