import React, { useState } from 'react';
import { getTicker } from './api/gfinance'

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
  return (
    <div className="App">
       <Button type="primary" onClick={getTickerClick}>Button</Button>
       {message}
    </div>
  );
}

export default App;
