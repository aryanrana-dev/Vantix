import LandingPage from './landing-page/LandingPage';
import TerminalLayout from './terminal/TerminalLayout';
import HoldingsLayout from './dashboard/HoldingsLayout';
import OrdersPageLayout from './orders/OrdersPageLayout';
import Signup from './Authentication/signup';
import OnboardingPage from './Authentication/OnboardingPage';
import Login from './Authentication/Login';
import { AccountManagerProvider } from './AccountManager';
import { AuthContextProvider } from './AuthHandler';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={
          <AuthContextProvider>
            <AccountManagerProvider>
              <Routes>
                <Route path="/terminal" element={<TerminalLayout />} />
                <Route path="/portfolio" element={<HoldingsLayout />} />
                <Route path="/orders" element={<OrdersPageLayout />} />
              </Routes>
            </AccountManagerProvider>
          </AuthContextProvider>} />
      </Routes>
    </Router>
  );
}

export default App;
