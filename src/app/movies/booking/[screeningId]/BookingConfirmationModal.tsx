'use client';

import { useState, useCallback, useRef } from 'react';
import Button from '@/components/Button';
import Step1BookingModal from './Step1BookingModal';
import Step2BookingModal from './Step2BookingModal';
import Step3BookingModal from './Step3BookingModal';
import Step4BookingModal from './Step4BookingModal';
import { useRouter } from 'next/navigation';
import { BookingConfirmationModalProps, UserInfo, PaymentMethod } from './types/Booking.types';

// MUI-imports for vg assignment.
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { kinoTheme } from '@/app/muiTheme';

export default function BookingConfirmationModal({
  isOpen,
  onClose,
  reservationId,
  movieTitle,
  screeningTime,
  seats,
  totalPrice,
  ticketSummary,
}: BookingConfirmationModalProps) {
  const mouseDownOnOverlay = useRef(false);
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: '',
    phoneNumber: '',
    name: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [step2Error, setStep2Error] = useState<string>('');

  const deleteReservation = useCallback(async (): Promise<boolean> => {
    if (!reservationId || bookingId || isDeleting) {
      return false;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/reservations/${reservationId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        console.error('Failed to delete reservation:', await response.text());
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error deleting reservation:', error);
      return false;
    } finally {
      setIsDeleting(false);
    }
  }, [reservationId, bookingId, isDeleting]);

  const handleClose = async () => {
    let deleted = false;

    if (currentStep < 4) {
      deleted = await deleteReservation();
    }

    onClose(deleted);
  };

  const formatScreeningTime = (timeString: string) => {
    const date = new Date(timeString);
    return new Intl.DateTimeFormat('sv-SE', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  };

  const handleGoToNextStep = () => {
    setCurrentStep(prev => prev + 1);
  };
  const handleGoToPreviousStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleUserInfoUpdate = useCallback(
    (name: string, value: string) => {
      setUserInfo(prev => ({
        ...prev,
        [name]: value,
      }));
      if (step2Error) {
        setStep2Error('');
      }
    },
    [step2Error]
  );

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setPaymentMethod(method);
  };

  const handleConfirmBooking = async () => {
    if (!reservationId) {
      setBookingError('Missing reservation ID');
      return;
    }

    setIsSubmitting(true);
    setBookingError(null);

    try {
      const response = await fetch(`/api/movies/booking/confirmation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reservationId,
          userInfo,
          paymentMethod,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to confirm booking');
      }

      const { bookingId } = await response.json();
      setBookingId(bookingId);
      handleGoToNextStep();
    } catch (error) {
      console.error('Booking confirmation error:', error);
      setBookingError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Your booking';
      case 2:
        return 'Your information';
      case 3:
        return 'Payment options';
      case 4:
        return 'Booking confirmed';
      default:
        return 'Booking';
    }
  };

  const validateUserInfo = () => {
    const { email, phoneNumber, name } = userInfo;

    if (!name.trim()) return false;
    if (!email.trim() || !email.includes('@')) return false;
    if (!phoneNumber.trim()) return false;

    return true;
  };

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-kino-black/80 backdrop-blur-sm'
      onMouseDownCapture={e => {
        mouseDownOnOverlay.current = e.target === e.currentTarget;
      }}
      onClick={e => {
        if (e.target !== e.currentTarget) return;

        if (!mouseDownOnOverlay.current) return;

        if (currentStep === 4) {
          router.push('/');
        } else {
          handleClose();
        }
      }}>
      {/* Wrapping the booking modal with MUI-THEME for vg assignment. */}
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={kinoTheme}>
          <div className='bg-kino-darkgrey rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto'>
            <div className='mb-6'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className={`text-xl font-bold ${currentStep === 4 ? 'print:hidden' : ''}`}>{getStepTitle()}</h2>
                <button
                  onClick={currentStep === 4 ? () => router.push('/') : handleClose}
                  className='text-kino-white text-4xl hover:text-kino-grey print:hidden'>
                  &times;
                </button>
              </div>

              <div className='flex items-center mb-4 mr-18 ml-18'>
                <div
                  className={`
                    w-9 h-9 rounded-full border-3 border-kino-black flex items-center justify-center text-xs print:hidden
                    ${currentStep >= 1 ? 'bg-kino-darkgreen text-kino-white' : 'bg-kino-white text-kino-black'}
                  `}>
                  1
                </div>
                <div className={`flex-1 h-0.5 ${currentStep > 1 ? 'bg-kino-darkgreen' : 'bg-kino-white'}`} />

                <div
                  className={`
                    w-9 h-9 rounded-full border-kino-black border-3 flex items-center justify-center text-xs print:hidden
                    ${currentStep >= 2 ? 'bg-kino-darkgreen text-kino-white' : 'bg-kino-white text-kino-black'}
                  `}>
                  2
                </div>
                <div className={`flex-1 h-0.5 ${currentStep > 2 ? 'bg-kino-darkgreen' : 'bg-kino-white'}`} />

                <div
                  className={`
                    w-9 h-9 rounded-full border-kino-black border-3 flex items-center justify-center text-xs print:hidden
                    ${currentStep >= 3 ? 'bg-kino-darkgreen text-kino-white' : 'bg-kino-white text-kino-black'}
                  `}>
                  3
                </div>
                <div className={`flex-1 h-0.5 ${currentStep > 3 ? 'bg-kino-darkgreen' : 'bg-kino-white'}`} />

                <div
                  className={`
                    w-9 h-9 rounded-full border-kino-black border-3 flex items-center justify-center text-xs print:hidden
                    ${currentStep >= 4 ? 'bg-kino-darkgreen text-kino-white' : 'bg-kino-white text-kino-black'}
                  `}>
                  4
                </div>
              </div>
            </div>

            <div className='space-y-4 mb-6'>
              {currentStep === 1 && (
                <Step1BookingModal
                  movieTitle={movieTitle}
                  screeningTime={screeningTime}
                  seats={seats}
                  totalPrice={totalPrice}
                  formatScreeningTime={formatScreeningTime}
                  ticketSummary={ticketSummary}
                />
              )}

              {currentStep === 2 && <Step2BookingModal userInfo={userInfo} onInputChange={handleUserInfoUpdate} />}

              {currentStep === 3 && (
                <Step3BookingModal
                  totalPrice={totalPrice}
                  selectedMethod={paymentMethod}
                  onSelectMethod={handlePaymentMethodSelect}
                  error={bookingError}
                />
              )}

              {currentStep === 4 && (
                <Step4BookingModal
                  bookingId={bookingId}
                  movieTitle={movieTitle}
                  screeningTime={screeningTime}
                  seats={seats}
                  totalPrice={totalPrice}
                  userInfo={userInfo}
                  paymentMethod={paymentMethod}
                  formatScreeningTime={formatScreeningTime}
                />
              )}
            </div>

            <div className='flex flex-col gap-3 mr-20 ml-20'>
              {currentStep === 1 && (
                <>
                  <Button variant='primary' type='button' onClick={handleGoToNextStep}>
                    Continue
                  </Button>

                  <Button variant='secondary' type='button' onClick={handleClose}>
                    Back
                  </Button>
                </>
              )}

              {currentStep === 2 && (
                <>
                  {step2Error && <p className='mb-2 text-sm text-kino-red'>{step2Error}</p>}

                  <Button
                    variant='primary'
                    type='button'
                    onClick={() => {
                      const { name, email, phoneNumber } = userInfo;
                      const allEmpty = !name.trim() && !email.trim() && !phoneNumber.trim();

                      if (allEmpty) {
                        setStep2Error('Please fill in all fields to continue');
                        return;
                      }

                      setStep2Error('');

                      if (validateUserInfo()) {
                        handleGoToNextStep();
                      }
                    }}>
                    Continue
                  </Button>
                  <Button variant='secondary' type='button' onClick={handleGoToPreviousStep}>
                    Back
                  </Button>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <Button variant='primary' type='button' onClick={handleConfirmBooking} disabled={isSubmitting}>
                    {isSubmitting ? 'Processing...' : 'Confirm and Pay'}
                  </Button>

                  <Button variant='secondary' type='button' onClick={handleGoToPreviousStep} disabled={isSubmitting}>
                    Back
                  </Button>
                </>
              )}

              {currentStep === 4 && (
                <Button
                  variant='primary'
                  type='button'
                  className='print:hidden'
                  onClick={async () => {
                    await handleClose();
                    router.push('/');
                  }}>
                  Back to Homepage
                </Button>
              )}
            </div>
          </div>
        </ThemeProvider>
      </StyledEngineProvider>
      {/* END of wrap here for MUI-theme VG assignment.*/}
    </div>
  );
}
