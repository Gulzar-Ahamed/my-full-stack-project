

import {Avatar, Badge, Button, Input, Menu, Tooltip,Drawer, Space, Modal, message} from 'antd'
import {  ShoppingCartOutlined,SearchOutlined } from '@ant-design/icons';
import logo from './logo.png'
import '../projectStyling/NavigationBar.css'
import '../projectStyling/RegisterPage.css'

import { Link, Navigate } from 'react-router-dom';

import wishList from '../icons/wishList.png'
import signup from '../icons/signup.png'
import { useEffect,useState } from 'react';
import { userSignOut } from '../Features/signUpSignInFeature/SignUpSignIn';
import {useDispatch} from 'react-redux'
import hamburger from "../icons/hamburger32px.png"
import { useSelector } from 'react-redux';
import { userSignInAccount } from '../Features/signUpSignInFeature/SignUpSignIn';
import { storeBySearchValue } from "../Features/dataFromServer/LoadDataServer"
import axios from 'axios';

import { getProductsData } from '../Features/dataFromServer/LoadDataServer';
function NavigationBar(props)
{
    //  i dont know why the error shows here.. 24th jan 2024
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue,setSearchValue]=useState("");
 
//      let count= useSelector((state)=>  state.loadDataServer.dataCount)
// console.log(count);
// console.log('this is count value of data loaded in redux');
     

      const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  // Function to handle screen width changes
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768); // Define the width at which the hamburger should appear
  };

  
  const onCancel = () => {
     setIsMobile(false);
  }

  const onCancelFun = async() =>{
    setIsModalOpen(false);
  //  await setSearchValue("");
  dispatch(getProductsData()) 
  // on 3th feb i have addded it.

  }
  const showModal = () =>{
    setIsModalOpen(true);
    console.log(' i am calling');
  }

const search = async() => {

  console.log(`search button clicked ${searchValue}`);

    if (searchValue !==""||searchValue !==undefined) {
     
      let searchQuery= searchValue.trim().toLowerCase();
      console.log(searchQuery);
      console.log(searchQuery.length); 
  //this is a correct searchValue that makes lowercase letter and also trims the front and back whitespaces

      console.log('this is search query value')

        try {
        const response=  await axios.get(`http://localhost:4000/search?category=${searchQuery}`)
            console.log(response);
            console.log('this is response value'); 


            console.log(response.data);
            console.log('this is response.data value of search'); 

            await dispatch( storeBySearchValue(response.data.searchData) );
            // the above is to get and store the redux of search value it's wroking prartically
            // it gives search value but the problem is 
            // try to make close the search container automatically when i search operation completely..

            message.success(<span className='custom-message'>{` ${response.data.searchData.length}  products found`}</span>)
            setIsModalOpen(false);

          }
         catch (error) {
            console.log(error);
          message.error(<span className='custom-message'>{error.response.data.message}</span> )

        }
       

    } else {
      message.error("Please type product to search")
    }
  
}

const getSearchValue = (value) => {
  setSearchValue(value);
}

  useEffect(() => {
    handleResize(); // Initial check for screen width
    window.addEventListener('resize', handleResize); // Listen for screen width changes
    return () => {
      window.removeEventListener('resize', handleResize); // Remove the listener when the component is unmounted
    };
  }, []);

// why can't we use useEffect hook here to get the user data and oters 
// try it once 

// but the problem is that when i refresh the page all state user information is gone that's still exist 

           const user= useSelector(state =>state.signInSignUp?.user || { })
           console.log(user);
           console.log("i'm above user  state in navigation bar component.. ");
          //  hide it for while how use it on 27th jan 2024.
          
           const dispatch=  useDispatch();

    //  need to work out with.
      async function signOutFunction() {
          try {
             
                      dispatch( userSignOut());

                      // console.log("user successfully sign out   "+ (authenticationObject?.currentUser?.email || "no user") )


                 } 
              catch(error){
                console.log(error);
                console.log('this is an error sign out function..');
              }
              
          
       }


    return (
        <>
           {isMobile ? (

        <div style={{ display: "flex", alignItems: "center" ,justifyContent:"space-between"}}>
            <img src={logo} alt="company logo" className="navbar-logo" />

            

            <SearchOutlined onClick={showModal} style={{fontSize:"1.7rem",color:"black",position:"relative",left:"9%"}} />
              <img src={hamburger} style={{fontSize:"1.9rem",marginRight:"12px"}}  onClick={showDrawer} className="hamburger-button" alt="hambuer" />
          
              <Modal 
             footer={[
              <Button
                key="cancel"
                onClick={onCancelFun}
                style={{ height: '3rem',fontFamily:"sans-serif", width: '6rem',fontWeight:900 }}
              >
                Cancel
              </Button>,
              <Button
                key="Search"
                type="primary"
                onClick={search} // Replace onOkFunction with your actual function
                style={{ height: '3rem', fontFamily:"sans-serif",width: '6rem',fontWeight:900 }}
              >
                Search
              </Button>,
            ]}

             open={isModalOpen}
             onCancel={onCancelFun}
            title="Search Products" 
            >
              <Input
              onChange={(e) => { getSearchValue(e.target.value) }}
                allowClear
                size="large"
                style={{
                  borderRadius: '25px',
                  height: '3.5rem',
                  textAlign: 'left',
                  fontSize: '1.2rem',
                  padding: '0.5rem',
                    }}
                prefix={<SearchOutlined style={{ fontSize: '1.5rem', marginRight: '8px' }} />}
                 placeholder='Type To Search....'
             />
              </Modal>

        </div>
      ) : (
        // Render your normal menu for larger screens
            <Menu 
            style={{overflowX:"auto",overflowY:"hidden",border:"2px solid lightgrey"}}
            className="NavBarContainer"
                mode='horizontal'  
            >

               <div
               className='developerContainer'
     
                >
            <Menu.Item key={1} className="search-item"> 

                   
               <Link to={"/aboutMe"} ><span style={{fontSize:"1.0rem",fontWeight:"700",textDecoration:"none"}}>About Me.</span></Link> 
            </Menu.Item>   
            </div>

            <div className='logoContainer'>
                  <Menu.Item
                  //   prefix='EN' 
                  key={2} className="logo-item">     
                    <img src={logo} alt="company logo" className="navbar-logo" />  
                    {/* <Input.Search size='small' className='searchbar'/>    */}
                  </Menu.Item>
              </div>
             
            
            <div className='iconContainer'>
                <Tooltip title="signUp" placement='bottom'>
                    <Menu.Item key={3}> 
                      
                        <Link to="/registerpage">
                          
                              <img src={signup} alt="user sign up" />
                          
                        </Link>
                    </Menu.Item>
              </Tooltip>

          <Modal 
             footer={[
                  <Button
                    key="cancel"
                    onClick={onCancelFun}
                    style={{ height: '3rem',fontFamily:"sans-serif", width: '6rem',fontWeight:900 }}
                  >
                    Cancel
                  </Button>,
                  <Button
                    key="Search"
                    type="primary"
                    onClick={search} // Replace onOkFunction with your actual function
                    style={{ height: '3rem', fontFamily:"sans-serif",width: '6rem',fontWeight:900 }}
                  >
                    Search
                  </Button>,
            ]}

            open={isModalOpen}
            onCancel={onCancelFun}
            title="Search Products" 
            >
              <Input
                onChange={ (e)=>{getSearchValue(e.target.value)} }
                allowClear
                size="large"
                style={{
                  borderRadius: '25px',
                  height: '3.5rem',
                  textAlign: 'left',
                  fontSize: '1.2rem',
                  padding: '0.5rem',
                    }}
                prefix={<SearchOutlined style={{ fontSize: '1.5rem', marginRight: '8px' }} />}
                 placeholder='Type To Search....'
             />
              </Modal>
                    <Menu.Item>
                    <SearchOutlined onClick={showModal} style={{fontSize:"1.6rem"} }/>
                    </Menu.Item>


                      <Menu.Item>

                        <Link to={"/vieworders"} >
                            <div>
                              View Orders.
                                {/* Order History. */}

                            </div>
                        </Link>   
                      </Menu.Item>

                      <Menu.Item style={{ marginBottom: "12px" }} key={4}>
    {
        user.isUserActive ? (
        /* if user exists, it won't be null */
        <Tooltip title={(user.email !== "" ? user.email : "no User")} placement="bottom">
            {
                /* checking userPhoto whether he used google authentication or not  if yes, then we can see userPhoto.  */
                user.userPhoto !== null && user.userPhoto !== undefined ? (
                    <>
                        <Space size={10}>
                            <Avatar
                                src={<img src={user.userPhoto} referrerPolicy="no-referrer" alt="myphoto" />}
                            />
                            <span>User Avatar</span>
                        </Space>
                    </>
                ) :
                <Avatar style={{ backgroundColor: "black", color: "white" }} >
                       {user.name && user.name.length > 0 ? user.name[0].toUpperCase() : ""}
                       { console.log(user.name +'this is the name from user data') }
                </Avatar>

            }
        </Tooltip>
        ) : (
            // Render an empty Avatar when the user is not logged in
            <Tooltip title="No user">
                {console.log(user + " tool tip user")}
                <Avatar size={33} />
            </Tooltip>
        )
    }
</Menu.Item>

                 {  user.isUserActive ? (  
                    <Menu.Item key={5}>                                
                        <Button type='primary' onClick={signOutFunction}>
                        
                        <span style={{fontSize:"1rem",fontWeight:"800",letterSpacing:"0.1rem"}}>
                             Log Out    
                        </span>
                        
                        </Button>
                    </Menu.Item>
                 ):null
                 }      

                  <Link to="/wishlist">
                      <Menu.Item key={6} style={{paddingTop:"5px"}} >
                          <Badge count={
                            // user.wishList i think here the problem comes from because the value is null
                            ( user.wishList !== undefined && user.wishList !== null ? user.wishList.length:0)
                            
                            }>
                                <Tooltip title="My WishList">
                                  <img src={wishList} alt="wish list"/>
                                </Tooltip>  
                            </Badge>
                      </Menu.Item>
                  </Link>

                      <Link to="/shoppingcart">
                      <Menu.Item  key={7}>
                          <Badge count={
                            // user.shoppingCartList
                            (user.shoppingCartList !==undefined && user.shoppingCartList !==null ?user.shoppingCartList.length: 0)

                            }>
                              <Tooltip title="shoppingCart" placement='bottom'>
                                  <Badge count={
                                    // user.shoppingCartList
                                    (user.shoppingCartList!==undefined && user.shoppingCartList !==null ? user.shoppingCartList.length:0)
                                    } size="small"><ShoppingCartOutlined style={{fontSize:"1.7rem"}} /> </Badge>  
                            </Tooltip>
                        </Badge>
                      </Menu.Item>
                    </Link>
            
            
            </div>
            
            </Menu> 
      )}       
   
           {/*this is for drawer menu items  */}


           <Drawer
          //  bodyStyle={{  height: '80vh' }}
        title="Welcome !!..."
        placement="right"
        closable={true}
        onClose={onClose}
        open={drawerVisible}
        className="drawer-menu"
           >

        <Menu
          style={{ height:"auto",overflowX: 'auto', overflowY: 'hidden', border: '2px solid lightgrey'  }}
          // mode="vertical"
        >
          {/* Drawer Menu items for mobile view */}
          
          
            <Menu.Item key={1} className="search-item"> 

                   
               <Link to={"/aboutMe"} ><span style={{fontSize:"1.0rem",fontWeight:"700",textDecoration:"none"}}>About Me.</span></Link> 
            </Menu.Item>   

              <Tooltip title="signUp" placement='bottom'>
                    <Menu.Item key={3}> 
                      
                      <Link to="/registerpage">

                          <Space direction='horizontal' size={10}>
                              <img src={signup} alt="user sign up" />
                              <span>SignUp</span>
                          </Space>  
                      </Link>
                    
                    
                    </Menu.Item>
              </Tooltip>

                    <Menu.Item style={{marginBottom:"12px",padding:"0px 12px"}} key={4}>

                       { user.isUserActive ? (
                        /* if user is exist it wont be null */
                            <Tooltip title={(user.email!==""? user.email: "no User")} placement="bottom">
                                 
                                    {
                                      /* checking userPhoto whether he used google authentication or not  if yes, then we can see userPhoto.  */
                                        user.userPhoto!==null && user.userPhoto!==undefined ?(
                                           <>
                                            <Space size={10}>
                                                <Avatar 
                                            src={<img src={user.userPhoto} referrerPolicy="no-referrer" alt="myphoto" />}
                                                /> 
                                                <span>User Avatar</span>
                                            </Space>     
                                          </>
                                         ):(
                                                <Avatar style={{backgroundColor:"black",color:"white"}} >
                                                
                                                {user.name[0].toUpperCase()}
                                                </Avatar> 
                                         )
                                   }
                            </Tooltip>
                            
                        ) : (
                              // Render an empty Avatar when user is not logged in
                           <Tooltip title="No user"> 
                           {console.log(user+" tool tip user")}
                             <Avatar size={33} />
                             </Tooltip>

                           
                           )
                    }
                    
                    </Menu.Item>
                    
                    

                  <Link to="/wishlist">
                    <Menu.Item key={6} style={{height:"auto",paddingTop:"9px",paddingLeft:"12px"}} >
                       <Space size={10}>
                          <Badge count={
                            // user.wishList
                            ( user.wishList !== undefined && user.wishList !==null? user.wishList.length:0)
                            
                            }>
                                <Tooltip title="My WishList">
                                      <img style={{height:"auto"}} src={wishList} alt="wish list"/>
                                </Tooltip>     
                          </Badge>

                          <span>WishList</span>
                        </Space>   
                    </Menu.Item>
                  </Link>

                      <Link to="/shoppingcart">
                      <Menu.Item style={{height:"auto",paddingLeft:"9px", paddingTop:"12px"}} key={7}>
                        <Space size={10}>
                            <Badge count={
                              
                              (user.shoppingCartList !==undefined && user.shoppingCartList !==null ?user.shoppingCartList.length: 0)

                              }>
                                <Tooltip title="shoppingCart" placement='bottom'>
                                    <Badge count={
                                      // user.shoppingCartList
                                      (user.shoppingCartList!==undefined && user.shoppingCartList !==null ? user.shoppingCartList.length:0)
                                      } size="small"><ShoppingCartOutlined style={{fontSize:"1.7rem"}} /> </Badge>  
                              </Tooltip>
                          </Badge>
                         
                          <span>Shopping Cart</span>
                      </Space>  
                    
                      </Menu.Item>
                    </Link>

                    <Menu.Item>
                        <Link to={"/vieworders"} >
                            <div>
                              View Orders.
                                {/* Order History. */}

                            </div>
                        </Link>   
                  </Menu.Item>
            
                    {  user.isUserActive ? (  
                    <Menu.Item key={5}>                                
                        <Button type='primary' onClick={signOutFunction}>
                        
                        <span style={{fontSize:"1rem",fontWeight:"800",letterSpacing:"0.1rem"}}>
                             Log Out    
                        </span>
                        
                        </Button>
                    </Menu.Item>
                 ):null
                 }  


                  
           </Menu>
      </Drawer>
    </>
  );
}

export default NavigationBar;



