'use client';
import { useState } from 'react';
import KidsPartyBook from '@/components/KidsPartyBook';
import KidsPartyHero from '@/components/KidsPartyHero';
import KidsPartyOffers from '@/components/KidsPartyOffers';

export default function KidsParty() {
  const [bookModal, setBookModal] = useState(false);

  return (
    <main className="max-w-6xl mx-auto pb-10 px-4 mt-4 md:px-6 lg:mt-10 bg-neutral-900 text-white">
      <KidsPartyHero />
      <h2 className="font-bold mt-10 text-xl md:text-3xl lg:text-4xl">Book a kids party today!</h2>
      <KidsPartyBook bookModal={bookModal} setBookModal={setBookModal}>
        Book kids party!
      </KidsPartyBook>
      <p className="mt-12 lg:text-xl xl:text-2xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rutrum at nibh rutrum gravida. Pellentesque
        tincidunt nulla et nibh finibus, in vehicula libero iaculis. Nulla facilisi. Class aptent taciti sociosqu ad
        litora torquent per conubia nostra, per inceptos himenaeos. Nam in sapien scelerisque, consequat metus vel,
        egestas dui. Nulla tempus convallis urna. Morbi nec aliquet ante, eu gravida metus. Mauris nec leo eget libero
        euismod efficitur.
      </p>
      <div className="mt-30 flex flex-col gap-15 pt-15 lg:flex-row">
        <KidsPartyOffers
          bookModal={bookModal}
          setBookModal={setBookModal}
          imgPath="/pizzaparty.png"
          width={461}
          height={272}
          title="Pizza Party!"
          description="Book a party where the children will enjoy an amazing experience
with freshly baked pizzas from the best pizzeria in town!"
          listItems={[
            'Pizza',
            'Soda and juice',
            'A special seat for the birthday child',
            'An extraordinary movie experience',
          ]}
          buttonText="Book now!"
        />
        <KidsPartyOffers
          bookModal={bookModal}
          setBookModal={setBookModal}
          imgPath="/glassparty.png"
          width={461}
          height={272}
          title="Ice Cream Party!"
          description="Book a party where the children will get a chilling experience they'll never forget – with ice cream from Sweden's top ice cream experts!"
          listItems={[
            'Ice cream galore',
            'Loads of toppings',
            'A special seat for the birthday child',
            'An extraordinary movie experience',
          ]}
          buttonText="Book now!"
        />
      </div>
      {bookModal && (
        <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-neutral-800 text-white w-[90%] max-w-sm p-6 rounded-2xl shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-white text-2xl hover:text-red-400 transition-colors duration-200"
              onClick={() => setBookModal(false)}
            >
              &times;
            </button>
            <p className="text-lg text-center lg:text-xl">📞 Book your kids party by calling:</p>
            <p className="text-2xl lg:text-3xl font-semibold text-center mt-2">026-290066</p>
          </div>
        </div>
      )}
    </main>
  );
}
