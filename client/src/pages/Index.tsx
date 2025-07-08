
import { useState } from "react";
import Hero from "../components/Hero";
import ReservationForm from "../components/ReservationForm";
import Confirmation from "../components/Confirmation";

interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: Date | undefined;
  time: string;
  guests: string;
  specialRequests: string;
}

type ViewState = 'hero' | 'form' | 'confirmation';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewState>('hero');
  const [reservationData, setReservationData] = useState<ReservationData | null>(null);

  const handleReserveClick = () => {
    setCurrentView('form');
  };

  const handleFormSubmit = (data: ReservationData) => {
    setReservationData(data);
    setCurrentView('confirmation');
  };

  const handleBackToHero = () => {
    setCurrentView('hero');
  };

  const handleNewReservation = () => {
    setReservationData(null);
    setCurrentView('hero');
  };

  if (currentView === 'hero') {
    return <Hero onReserveClick={handleReserveClick} />;
  }

  if (currentView === 'form') {
    return <ReservationForm onSubmit={handleFormSubmit} onBack={handleBackToHero} />;
  }

  if (currentView === 'confirmation' && reservationData) {
    return <Confirmation reservationData={reservationData} onNewReservation={handleNewReservation} />;
  }

  return <Hero onReserveClick={handleReserveClick} />;
};

export default Index;
