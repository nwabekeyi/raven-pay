import './App.css'
import AppRoutes from './routes.jsx';
import { AvatarProvider } from './components/context/avatarContext';
import { CurrencyProvider } from './components/context/currencyContext.jsx';

function App() {
  
  return (
    <>
    <CurrencyProvider>
    <AvatarProvider> 
    <AppRoutes />
    </AvatarProvider> 
    </CurrencyProvider>
    </>
  )
}

export default App
