import Image from 'next/image';

export default function KidsPartyHero() {
  return (
    <section className="max-w-6xl mx-auto">
      <div className="relative">
        <Image className="min-w-full" src="/heroBarnkalasDesktop.png" width={1262} height={342} alt="test" />
        <h1 className="text-nowrap text-2xl md:text-5xl lg:text-6xl absolute z-99 text-white font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-lg">
          Kids party at Kino
        </h1>
      </div>
    </section>
  );
}
