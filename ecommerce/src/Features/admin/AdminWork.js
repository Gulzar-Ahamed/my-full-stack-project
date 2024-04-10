import React, { useState,useEffect } from 'react'
import {Form,Button,Input,Flex, Space} from "antd"
import axios from "axios"
import "./AdminWork.css"

function AdminWork() {
   const [addColor,SetAddColor]=useState("");
   const [addColorGroup,SetAddColorGroup]=useState([]);
   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
   // create 3 states for one is to track image URL and 2nd is for storing  purpose and 3rd is for status message storing.
   const [addImage,SetAddImage]=useState("");
   const [addImageGroup,SetAddImageGroup]=useState([]);
   const [showSuccessMessageImage, setShowSuccessMessageImage] = useState(false);
   const [form]=Form.useForm();

   const dataToBackend= (values)=>{
      console.log(values);
      // you should use this json.stringify because if u don't use it throws error so better use it

      const perfectData= {...values,productimage:JSON.stringify(addImageGroup),price:parseInt(values.price),color:JSON.stringify(addColorGroup),discount:parseInt(values.discount) }
      console.log(perfectData);//working as expected good gulzar
      console.log("thisis perfect data");

    
      try {
        const response= axios.post("http://localhost:4000/postProduct",perfectData);
        console.log(response);
        console.log('this is response fromthe backend ');
        form.resetFields();
        SetAddColorGroup([]);// this is  to reset the array value when submitted  otherwise it will be pushed to array from  previous values 
         SetAddImageGroup([]);

      } catch (error) {
         console.log(error);
         console.log("this is errror block while sending data to DB.");
      }       
         console.log('this is value when the form submitted');
   }  

   const errorHandlerFunction=(error)=>{
            console.log(error);
      // console.log(values);
      console.log("this is error handler in form ");
      // console.log(errorFields);
      console.log("error field");
   }

   const addColorFunction = ()=>{
             console.log('this is color value in addColor function before');
            // SetAddColorGroup([addColor,...addColorGroup]);
            SetAddColorGroup(prevColorGroup => [addColor, ...prevColorGroup]);
            // SetAddColorGroup(prevColorGroup => [ ...prevColorGroup,addColor]);
            console.log(addColorGroup);

            console.log('this is color value in addColor function after');
            setShowSuccessMessage(true); // Set the state to show the success message
           
            setTimeout(() => {
               setShowSuccessMessage(false);
            }, 1000);
         }

   const getColorFunction=(colorValue)=>{
            SetAddColor(colorValue);
            console.log(colorValue);
            console.log('color value in getColor function');
   }

    const getImageFunction=(ImageValue)=>{
            SetAddImage(ImageValue);
            console.log(ImageValue);
            console.log('Image value in getImage function');
   }

   const addImageFunction = ()=>{
      // console.log(event.target);
      
      console.log('this is Image value in addImage function before');
            // SetAddImageGroup([addImage,...addImageGroup]);
            SetAddImageGroup(prevImageGroup => [addImage, ...prevImageGroup]);
            //  SetAddImageGroup(prevImageGroup => [ ...prevImageGroup,addImage]);
            console.log(addImageGroup);

            console.log('this is Image value in addImage function after');
            setShowSuccessMessageImage(true); // Set the state to show the success message
           
            setTimeout(() => {
               setShowSuccessMessageImage(false);
            }, 1000);
         }

    return (
       <>
            <div className='parentContainer'>
          
                    {/* <div className='childContainer'> */}
                    <h1 style={{textAlign:"center",color:"white",letterSpacing:"0.2rem"}}>admin product details</h1>
                  <Flex
                      className="childContainer"
                      wrap={true} 
                     justify="center" 
                     align={"middle"}     
                  > 
                        <Form 
                        form={form}
                        onFinish={dataToBackend}
                        onFinishFailed={errorHandlerFunction}
                        scrollToFirstError={true}
                         requiredMark={true}
                        labelCol= { {  xs: { span: 24 }, sm: { span: 5 }, md: { span: 6 }, lg: { span: 8 }  } }
                       wrapperCol= { { xs: { span: 24 }, sm: { span: 18 }, md: { span: 14 }, lg: { span: 12 } } }
                        layout='horizontal'
                        labelWrap={true}
                        style={{width: '100%', height: '100%',color:'black'}}
                            name='adminForm'
                        >
                         
                          <Form.Item 
                          
                          name={"productimage"}
                                rules={
                                       [
                                          {
                                             required: true,
                                             message:"this field is required"
                                          }
                                      ]
                               }
                               label="product image URL"
                          >
                          <div>
                              <Input
                                    name='productimage'
                                    onChange={(event)=>getImageFunction(event.target.value)}
                                    allowClear={true}
                              />    
                                    {
                                          showSuccessMessageImage && (
                                                <div style={{ textAlign: "center", marginTop: "10px", color: "rgb(71, 143, 146)",fontWeight:"bolder",fontFamily:"monospace",fontSize:"1.3rem" }}>
                                                   Image added successfully!
                                                </div>
                                             ) 
                                    }

                                             <Space size={'large'}> 
                                                <Button onClick={()=>addImageFunction()} className='formText'>add Image</Button>                                             
                                             </Space>
                          </div>                  
                          </Form.Item>

                          <Form.Item 
                          name={"price"}
                               rules={
                                       [
                                          {
                                             required: true,
                                             message:"this field is required"
                                          }
                                      ]
                               }
                               label="price"
                          >
                             <Input />    
                          </Form.Item>

                          <Form.Item
                              name={"discount"}
                               rules={
                                       [
                                          {
                                             required: true,
                                             message:"this field is required"
                                          }
                                      ]
                               } 
                               label="discount"
                          >
                             <Input />    
                          </Form.Item>

                          <Form.Item
                              name={"title"}
                               rules={
                                       [
                                          {
                                             required: true,
                                             message:"this field is required"
                                          }
                                      ]
                               } 
                               label="title"
                          >
                             <Input />    
                          </Form.Item>

                          <Form.Item 
                          name={"explaination"}
                              rules={
                                          [
                                             {
                                                required: true,
                                                message:"this field is required"
                                             }
                                       ]
                                 }
                               label="explaination"
                          >
                             <Input />    
                          </Form.Item>

                          
                          <Form.Item 
                                 name={"category"}
                                  rules={
                                       [
                                          {
                                             required: true,
                                             message:"this field is required"
                                          }
                                      ]
                               }
                               label="category"
                          >
                             <Input />    
                          </Form.Item>

                          <Form.Item 
                          
                          name={"color"}
                                  rules={
                                       [
                                          {
                                             required: true,
                                             message:"this field is required"
                                          }
                                      ]
                               }
                               label="color"
                          > 
                              <div>
                                    <Input 
                                        allowClear
                                        name='color'
                                         onChange={(event)=>getColorFunction(event.target.value)}
                                     />
                                    
                                          {
                                       showSuccessMessage && (
                                          <div style={{ textAlign: "center", marginTop: "10px", color: "rgb(71, 143, 146)",fontWeight:"bolder",fontFamily:"monospace",fontSize:"1.3rem" }}>
                                          Color added successfully!
                                          </div>
                                          ) }

                                          <Space size={'large'}> 
                                             <Button onClick={()=>addColorFunction()} className='formText'>add color</Button>
                                             {/* <Button className='formText'>done</Button> */}
                                          </Space>
                               </div>  
                          </Form.Item>

                           <Form.Item  style={{display:"flex",justifyContent:"center"}}>
                                 <Button className='formText formWider' htmlType='submit'> submit !</Button>
                           </Form.Item>
                        </Form>
                    {/* </div> */}
                    </Flex>   
            </div>
       </>
    )
}

export default AdminWork
