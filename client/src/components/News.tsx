import React from 'react';

import { Select, Typography, Row, Col, Avatar, Card, Input } from 'antd';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import moment from 'moment';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const {Text, Title} = Typography;
const Option = Select;

interface NewsComponentProps {
  simplified: boolean
}


const News = ({simplified} : NewsComponentProps) => {
  const count = simplified ? 6 : 12
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({newsCategoty: 'Cryptocurrency', count})

  console.log('data', cryptoNews)

  if(isFetching) return <>Loading....</>
  if(!cryptoNews.value) return <>Loading....</>

  return <Row gutter={[24, 24]}>
    {!simplified && (
      <Col span={24}>
        <Select>
          
        </Select>
      </Col>
      
    )}
    {cryptoNews.value.map((news: any, i: any) => (
     <Col xs={24} sm={12} lg={8} key={i}>
     <Card hoverable className="news-card">
       <a href={news.url} target="_blank" rel="noreferrer">
         <div className="news-image-container">
           <Title className="news-title" level={4}>{news.name}</Title>
           <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="" />
         </div>
         <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
         <div className="provider-container">
           <div>
             <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
             <Text className="provider-name">{news.provider[0]?.name}</Text>
           </div>
           <Text>{moment(news.datePublished).startOf('s').fromNow()}</Text>
         </div>
       </a>
     </Card>
   </Col>
    ))}

  </Row>;
};

export default News;
