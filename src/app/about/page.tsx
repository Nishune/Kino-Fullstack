import AboutCard from '@/components/about/AboutCard';
import AboutHero from '@/components/about/AboutHero';
import InfoModal from '@/components/InfoModal';

export default function About() {
  return (
    <main className="max-w-6xl mx-auto pb-10 px-4 mt-4 md:px-6 lg:mt-10 text-white">
      <AboutHero />
      <h2 className="text-xl my-5">About KINO Sandviken</h2>
      <div className="flex flex-col gap-8 sm:flex-row">
        <div>
          <AboutCard
            title="About the company"
            description="Since 2023, Kino Bio has been the city’s cinema for film lovers. Here, classic charm meets modern technology in our state-of-the-art theaters. We screen everything from blockbusters to indie favorites, offering a unique movie experience for everyone. Come and experience the world of film with us – your story begins here!"
          />

          <AboutCard
            title="Experience Hot Tub Cinema at Kino Bio"
            description="At Kino Bio, we take the movie experience to the next level with our exclusive Hot Tub Cinema. Relax in a warm hot tub while enjoying the latest films on a grand screen. It's perfect for a luxurious movie night with friends or a romantic evening. Combine relaxation and entertainment in a way you've never experienced before!"
          />
        </div>
        <div>
          <AboutCard
            title="We Make the Movie Experience Better"
            description="At Kino Bio, our promise is to always deliver a movie experience beyond the ordinary. We strive to create memorable moments and first-class entertainment that make every visit unique and unforgettable."
          />

          <AboutCard
            title="Our Website and App"
            description="You can easily download Kino’s app from the App Store or Google Play."
          />
        </div>
      </div>

      <InfoModal
        display={[
          { day: 'Saturday', date: '10/05', hours: '14:30 - 21:00' },
          { day: 'Sunday', date: '11/05', hours: '14:30 - 21:00' },
          { day: 'Monday', date: '12/05', hours: '14:30 - 20:00' },
          { day: 'Tuesday', date: '13/05', hours: '14:30 - 21:30' },
          { day: 'Wednesday', date: '14/05', hours: 'Closed' },
          { day: 'Thursday', date: '15/05', hours: '14:30 - 21:00' },
          { day: 'Friday', date: '16/05', hours: '14:00 - 22:00' },
        ]}
      />
    </main>
  );
}
