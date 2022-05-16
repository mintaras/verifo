import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Transactions from './pages/transactions/Transactions';
import Transfer from './pages/transfer/Transfer';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Transfer />} />
        <Route path="/transactions/:page" element={<Transactions />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </>
  );
}

export default App;
