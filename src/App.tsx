import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { CategoryBar } from './components/CategoryBar';
import { Footer } from './components/Footer';
import { PincodeModal } from './components/PincodeModal';
import { CompareModal } from './components/CompareModal';
import { ToastContainer } from './components/ToastContainer';
import { DarkSignInModal } from './components/DarkSignInModal';

// Views
import { HomeView } from './views/HomeView';
import { CategoryView } from './views/CategoryView';
import { QuickDeliveryView } from './views/QuickDeliveryView';
import { RefurbishedView } from './views/RefurbishedView';
import { ServicesView } from './views/ServicesView';
import { ProductDetailView } from './views/ProductDetailView';
import { CartView } from './views/CartView';
import { CheckoutView } from './views/CheckoutView';
import { OrderConfirmationView } from './views/OrderConfirmationView';
import { MyOrdersView } from './views/MyOrdersView';
import { WishlistView } from './views/WishlistView';
import { BudgetStoreView } from './views/BudgetStoreView';
import { EntryGatewayView } from './views/EntryGatewayView';

const AppContent: React.FC = () => {
  const { currentView, isInGateway } = useApp();
  const [pincodeModalOpen, setPincodeModalOpen] = useState(false);

  // First page is the dark SovereignAuth-inspired Shop & Sign In Gateway
  if (isInGateway) {
    return (
      <div className="min-h-screen bg-[#060812] font-sans selection:bg-cyan-500 selection:text-white">
        <EntryGatewayView />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#070a17] text-slate-100 font-sans selection:bg-cyan-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar onOpenPincodeModal={() => setPincodeModalOpen(true)} />

      {/* Flipkart-Style Iconic Category Navigation Strip (Matching User Screenshot) */}
      <CategoryBar />

      {/* Main View Container */}
      <main className="flex-1 w-full">
        {currentView === 'home' && (
          <HomeView onOpenPincodeModal={() => setPincodeModalOpen(true)} />
        )}
        {currentView === 'category' && <CategoryView />}
        {currentView === 'budget-store' && <BudgetStoreView />}
        {currentView === 'quick-delivery' && (
          <QuickDeliveryView onOpenPincodeModal={() => setPincodeModalOpen(true)} />
        )}
        {currentView === 'refurbished' && <RefurbishedView />}
        {currentView === 'services' && <ServicesView />}
        {currentView === 'product-detail' && <ProductDetailView />}
        {currentView === 'cart' && <CartView />}
        {currentView === 'checkout' && <CheckoutView />}
        {currentView === 'order-confirmation' && <OrderConfirmationView />}
        {currentView === 'my-orders' && <MyOrdersView />}
        {currentView === 'wishlist' && <WishlistView />}
      </main>

      {/* Global Modals & Overlays */}
      <PincodeModal
        isOpen={pincodeModalOpen}
        onClose={() => setPincodeModalOpen(false)}
      />
      <CompareModal />
      <DarkSignInModal />
      <ToastContainer />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
