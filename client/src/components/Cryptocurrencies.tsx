import React, { useState, useEffect } from 'react';

import { Card, Row, Col, Input } from 'antd'

import { useGetCryptosQuery } from '../services/cryptoApi';
import { Link } from 'react-router-dom';
import millify from 'millify';


interface CryptocurrenciesProps {
  simplified: boolean
}

const Cryptocurrencies = ({ simplified }: CryptocurrenciesProps) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count)
  const [cryptos, setCryptos] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins?.filter((crypto: any) => (crypto?.name).toLowerCase().includes(searchTerm.toLowerCase()));
    setCryptos(filteredData);
  }, [cryptosList, searchTerm])

  if (isFetching) return <> Loading... </>

  return (<>
    {!simplified && (<div className='search-crypto'>
      <Input placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)} />
    </div>)}

    <Row gutter={[32, 32]} className='crypto-card-container'>
      {cryptos?.map((crypto: any) =>
        <Col xs={24} sm={12} lg={6} className='crypto-card' key={crypto.uuid}>
          <Link to={`/crypto/${crypto.uuid}`}>
            <Card title={`${crypto.rank}. ${crypto.name}`}
              extra={<img className="crypto-image" src={crypto.iconUrl} />}
              hoverable
            >
              <p>Price: {millify(crypto.price)}</p>
              <p>Market Cap: {millify(crypto.marketCap)}</p>
              <p>Daily Change: {millify(crypto.change)}</p>
            </Card>
          </Link>
        </Col>
      )}
    </Row>
  </>);
};

export default Cryptocurrencies;
