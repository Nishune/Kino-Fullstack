import Image from 'next/image';
import KidsPartyBook from './KidsPartyBook';
import { Dispatch, SetStateAction } from 'react';

export default function KidsPartyOffers({
  imgPath,
  title,
  description,
  listItems,
  width,
  height,
  buttonText,
  bookModal,
  setBookModal,
}: {
  imgPath: string;
  title: string;
  description: string;
  listItems: string[];
  width: number;
  height: number;
  buttonText: string;
  bookModal: boolean;
  setBookModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      <article className="relative text-black">
        <Image className="mx-auto relative z-10 -mb-20" src={imgPath} alt={title} width={width} height={height} />
        <div className="bg-white max-w-[500px] mx-auto p-6 pt-24 rounded-2xl shadow-lg relative z-0">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="mb-4">{description}</p>
          <ul className="list-disc list-inside mb-4">
            {Array.isArray(listItems) && listItems.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
          <div className="text-white">
            <KidsPartyBook bookModal={bookModal} setBookModal={setBookModal}>
              {buttonText}
            </KidsPartyBook>
          </div>
        </div>
      </article>
    </>
  );
}
