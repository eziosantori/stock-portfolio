import React, { useEffect } from 'react'
import { store } from './store';
import { Provider } from 'react-redux';


export const StoreProvider: React.FC = ({children}) => {
    
    return (
    <Provider store={store}>
        {children}
    </Provider>
    )
}

export default StoreProvider
