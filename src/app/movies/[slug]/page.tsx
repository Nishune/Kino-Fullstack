import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import MovieLayout from '@/components/movies/movie-details/MovieLayout';

export default async function MovieDetailPage({ params }: { params: { slug: string } }) {
  // Using await params here to silence Next.js warning about params.slug
  const resolvedParams = await params;
  const resolvedHeaders = await headers();
  const host = resolvedHeaders.get('host');
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';

  const res = await fetch(`${protocol}://${host}/api/movies/${resolvedParams.slug}`, {
    cache: 'no-store',
  });

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error('Failed to fetch movie');
  }

  const { movie, screenings } = await res.json();

  return (
    <>
      <MovieLayout movie={movie} screenings={screenings} />
    </>
  );
}