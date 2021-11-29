import React, { useState } from 'react';
import { getTicker } from './api/gfinance'
import { getPortfolio } from './api/portfolio'

import { Button } from 'antd';
import './App.less';

function App() {
  const [message, setMessage] = useState()
  const getTickerClick = async () => {
    try {
      var m = await getTicker();
      setMessage(m.message);
    } catch (error) {
      console.log(error);
    }
  }
  const getPortfolioClick = async () => {
    try {
      var m = await getPortfolio();
      // setMessage(m.message);
      console.log(m);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
       <Button type="primary" onClick={getTickerClick}>Button</Button>
       <Button type="default" onClick={getPortfolioClick}>Airt</Button>
       {message}
    </div>
  );
}

export default App;
