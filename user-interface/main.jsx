import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import Block from './Block/Block.jsx'
// import Wallet from './Wallet/wallet.jsx'
// import Navigation from './/Navigate.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <Block /> */}
    {/* <Wallet /> */}
    {/* <Navigation></Navigation> */}

  </StrictMode>
)
