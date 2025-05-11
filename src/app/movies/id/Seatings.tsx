"use client";
import React, { useState, useEffect } from "react";
import {
  AvailableSeatIcon,
  SelectedSeatIcon,
  DisabledSeatIcon,
  TakenSeatIcon,
} from "./SeatingIcons";
import { Seat, SeatsByRow, CinemaSeatingProps } from "./types/Seatings.types";
import DisableModal from "./DisableModal";
import HandicapSeatHandler from "./HandicapSeatHandler";

const CinemaSeating: React.FC<CinemaSeatingProps> = ({ totalTickets }) => {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await fetch("/api/seats");

        if (!response.ok) {
          throw new Error("Kunde inte hämta säten");
        }

        const data = await response.json();
        console.log("Hämtad data:", data);

        if (Array.isArray(data)) {
          setSeats(data);
        } else if (data.seats && Array.isArray(data.seats)) {
          setSeats(data.seats);
        } else {
          console.error("Ogiltig datastruktur:", data);
        }
      } catch (error) {
        console.error("Fel vid hämtning av säten:", error);
      }
    };

    fetchSeats();
  }, []);

  useEffect(() => {
    if (selectedSeats.length > totalTickets) {
      setSelectedSeats(selectedSeats.slice(0, totalTickets));
    }
  }, [totalTickets, selectedSeats]);

  const seatsByRow: SeatsByRow = seats.reduce((acc: SeatsByRow, seat: Seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {});

  const toggleSeat = (seatId: string, isDisabled: boolean): void => {
    if (isDisabled) {
      return;
    }

    setSelectedSeats((prev) => {
      if (prev.includes(seatId)) {
        return prev.filter((id) => id !== seatId);
      } else {
        // Tillåt endast val om vi inte nått biljettgränsen
        if (prev.length < totalTickets) {
          return [...prev, seatId];
        }
        return prev;
      }
    });
  };

  const isDisabledSeat = (row: number, seatNumber: number): boolean => {
    return row === 6 && [1, 2, 14, 15].includes(seatNumber);
  };

  return (
    <div
      className="flex flex-col items-center p-8 rounded-lg max-w-2xl mx-auto"
      style={{ backgroundColor: "var(--color-kino-darkgrey)" }}
    >
      <div className="w-3/4 h-5 bg-gray-400 rounded mb-12 flex items-center justify-center">
        <span className="text-white text-sm">SCREEEEN</span>
      </div>

      <div className="flex flex-col gap-4">
        {Object.keys(seatsByRow).map((rowNum) => (
          <div key={rowNum} className="flex gap-2 justify-center">
            {seatsByRow[Number(rowNum)]
              .sort((a, b) => a.seatNumber - b.seatNumber)
              .map((seat) => {
                const isDisabled =
                  seat.disabled || isDisabledSeat(seat.row, seat.seatNumber);

                if (isDisabled) {
                  return (
                    <HandicapSeatHandler key={seat._id}>
                      <button
                        className="w-7 h- flex items-center justify-center rounded cursor-pointer bg-[#5A5A5A]"
                        aria-label="Handikappad plats"
                      >
                        <DisabledSeatIcon />
                      </button>
                    </HandicapSeatHandler>
                  );
                }

                const isSelected = selectedSeats.includes(seat._id);
                const isSelectable =
                  selectedSeats.length < totalTickets || isSelected;

                return (
                  <button
                    key={seat._id}
                    onClick={() => toggleSeat(seat._id, false)}
                    className={`w-7 h- flex items-center justify-center rounded ${
                      !isSelectable
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer"
                    } bg-kino-darkgrey text-white hover:bg-[#1a1a1a]`}
                    aria-label={`Säte ${seat.seatNumber}`}
                  >
                    {isSelected ? <SelectedSeatIcon /> : <AvailableSeatIcon />}
                  </button>
                );
              })}
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <div className="flex gap-15 mt-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-kino-darkgrey rounded flex items-center justify-center text-white">
              <AvailableSeatIcon />
            </div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded flex items-center justify-center">
              <SelectedSeatIcon />
            </div>
            <span className="text-sm">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6rounded flex items-center justify-center text-white">
              <TakenSeatIcon />
            </div>
            <span className="text-sm">Taken</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#5A5A5A] rounded flex items-center justify-center text-white">
              <DisabledSeatIcon />
            </div>
            <span className="text-sm">Disabled</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinemaSeating;
