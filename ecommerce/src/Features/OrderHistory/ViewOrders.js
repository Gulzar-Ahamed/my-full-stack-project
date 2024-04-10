import React from 'react';
import { Table, Image, Tag, Button } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment'; // Import moment library
import './ViewOrders.css';

function ViewOrders() {
  const currentUserInfo = useSelector((state) => state.signInSignUp.user);
  const today = moment(); // Current date
  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    // Ensure month and day have two digits
    const formattedMonth = month.padStart(2, '0');
    const formattedDay = day.padStart(2, '0');
    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  const columns = [
    {
      title: <span className='table-header'>Order Id</span>,
      dataIndex: 'orderId',
      key: 'orderId',
      fixed: 'left',
      width: 100,
      render: (text) => <span className='text-content'>{text}</span>,
    },
    {
      title: <span className='table-header'>Product Id</span>,
      dataIndex: 'productId',
      key: 'productId',
      render: (text) => <span className='text-content'>{text}</span>,
    },
    {
      title: <span className='table-header'>Product Image</span>,
      dataIndex: 'image',
      key: 'image',
      render: (imageUrl) => <Image style={{ height: '230px', width: '250px' }} src={imageUrl} alt='Product Image' />,
    },
    {
      title: <span className='table-header'>Customer Name</span>,
      dataIndex: 'customerName',
      key: 'customerName',
      render: (text) => <span className='text-content'>{text}</span>,
    },
    {
      title: <span className='table-header'>No.of Products</span>,
      dataIndex: 'productCount',
      key: 'productCount',
      render: (text) => <span className='text-content'>{text}</span>,
    },
    {
      title: <span className='table-header'>Per Piece</span>,
      dataIndex: 'actualPrice',
      key: 'actualPrice',
      render: (text) => <span className='text-content'>&#x20b9;{text}</span>,
    },
    {
      title: <span className='table-header'>Total</span>,
      dataIndex: 'total',
      key: 'total',
      render: (text) => <span className='text-content'>&#x20b9;{text}</span>,
    },
    {
      title: <span className='table-header'>Ordered At</span>,
      dataIndex: 'orderedAt',
      key: 'orderedAt',
      render: (text) => <span className='text-content'>{text}</span>,
    },
    {
      title: <span className='table-header'>Delivery Date</span>,
      dataIndex: 'deliveryDate',
      key: 'deliveryDate',
      render: (text) => <span className='text-content'>{text}</span>,
    },
    {
      title: <span className='table-header'>Status</span>,
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <Tag color={text.color} style={{ fontWeight: 'bold' }}>
          {text.label}
        </Tag>
      ),
    },
    {
      title: <span className='table-header'>Product Information</span>,
      dataIndex: 'title',
      key: 'title',
      render: (text) => <span className='text-content'>{text}</span>,
    },
  ];

  const dataSource = currentUserInfo.shoppingCartList.map((product, index) => {
    const formattedOrderedDate = formatDate(product.orderedAt);
    const formattedDeliveryDate = formatDate(product.deliveryDate);

    const orderedDate = moment(formattedOrderedDate, 'DD/MM/YYYY', true);
    const deliveryDate = moment(formattedDeliveryDate, 'DD/MM/YYYY', true);

    console.log('orderedDate:', orderedDate.format('DD/MM/YYYY'));
    console.log('deliveryDate:', deliveryDate.format('DD/MM/YYYY'));

    if (!orderedDate.isValid() || !deliveryDate.isValid()) {
      console.error('Invalid date format for product at index', index);
      return null; // Skip this entry if dates are invalid
    }

    const dayDifference = today.diff(orderedDate, 'days');
    console.log('dayDifference:', dayDifference); // Log the day difference for debugging

    let statusContent;
    let statusColor;

    if (dayDifference === 0) {
      statusContent = 'Order Placed';
      statusColor = 'blue';

      
    }else if(dayDifference === 1) {
      statusContent = 'Processing';
      statusColor = '#CE5A67';   
    } 
    else if (dayDifference >= 2 && dayDifference <= 3) {
      statusContent = 'Product Shipped';
      statusColor = 'magenta';
    } else if (dayDifference === 4) {
      statusContent = 'Out for Delivery';
      statusColor = 'orange';
    } else {
      const isDelivered = today.isSameOrAfter(deliveryDate, 'day');
      console.log(isDelivered);
      console.log('above shows whehter the delivery delivered or not');
      statusContent = isDelivered ? 'Delivered' : 'Pending';
      statusColor = isDelivered ? 'green' : 'blue';
    }

    return {
      key: index.toString(),
      orderId: `Order ${index + 1}`,
      productId: product.id,
      image: product.image[0], // Display the first image, modify this if you want a different image
      title: product.title,
      customerName: currentUserInfo.name,
      productCount: product.actualTotal / product.actualPrice,
      actualPrice: product.actualPrice,
      total: product.actualTotal,
      orderedAt: formattedOrderedDate,
      deliveryDate: formattedDeliveryDate,
      dayDifference: dayDifference, // Add dayDifference to dataSource for displaying it in the table
      status: {
        label: statusContent,
        color: statusColor,
      },
    };
  }).filter(entry => entry !== null); // Filter out null entries
  return (
    <>
      <div className='wrapper'>
        <div className='header-container'>
          <h1>Order History..</h1>
          <Link to={'/'}>
            <Button type='primary' style={{ marginTop: '20px' }}>
              Back to Home page
            </Button>
          </Link>
        </div>
        <div className='body-container'>
          <Table
            responsive={['xs']}
            pagination={{
              position: ['bottomCenter'],
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '50'],
            }}
            dataSource={dataSource}
            columns={columns}
          />
        </div>
      </div>
    </>
  );
}

export default ViewOrders;
