// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import { Col, Row, Typography } from 'antd';

// const { Title } = Typography;

// interface LineChartProps {
//     coinHistory: any
//     currentPrice: string
//     coinName: string
// }


// const LineChart = ({ coinHistory, currentPrice, coinName }: LineChartProps) => {

//     const coinPrice : string[] = [];
//     const coinTimestamp : string[] = [];

//     for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
//         coinPrice.push(coinHistory?.data?.history[i].price);
//       }
    
//       for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
//         coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
//       }

//     // coinHistory?.data?.history?.forEach((coin: any) => {
//     //     coinPrice.push(coin.Price)
//     //     coinTimestamp.push(new Date(coin.timestamp).toLocaleDateString())
//     // })

//     const data = {
//         labels: coinTimestamp,
//         datasets: [
//             {
//                 label: 'Price in USD',
//                 data: coinPrice,
//                 fill: false,
//                 backgroundColor: '#0071bd',
//                 borderColor: ' #0071bd'
//             }
//         ]
//     }

//      const options = {
//         responsive: true,
//         plugins: {
//           legend: {
//             position: 'top' as const,
//           },
//           title: {
//             display: true,
//             text: 'Chart.js Line Chart',
//           },
//         },
//       };

//     // const options : any = {
//     //     scales: {
//     //       yAxes: [
//     //         {
//     //           ticks: {
//     //             beginAtZero: true,
//     //           },
//     //         },
//     //       ],
//     //     },
//     //   };

//     return (<>

//         <Row className='chart-header'>
//             <Title level={2} className="chart-title">{coinName} Price chart</Title>
//             <Col className='price-container'>
//                 <Title level={5} className='price-change'>{coinHistory?.data?.change}</Title>
//                 <Title level={5} className='current-price'>Current {coinName} Price: $ {currentPrice}</Title>
//             </Col>
//         </Row>
//         <Line options={options} data={data}  />

//     </>);
// };

// export default LineChart;



import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';

interface LineChartProps {
  coinHistory: any
  currentPrice: string
  coinName: string
}

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName } : LineChartProps ) => {
  const coinPrice = [];
  const coinTimestamp = [];

  console.log('deeeeet', coinHistory?.data?.history, currentPrice, coinName)

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = coinHistory?.data?.history?.length - 1; i >= 0 ; i -= 1) {
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp * 1000).toLocaleDateString());
  }
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options : any = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
          <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
