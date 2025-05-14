interface MovieDetailProps {
  movie: {
    title: string;
    slug: string;
    ageLimit: number;
    durationMinutes: number;
    genre: string[];
    posterUrl: string;
    description: string;
  };
}

export default function MovieDetail({ movie }: MovieDetailProps) {
  const hours = Math.floor(movie.durationMinutes / 60);
  const minutes = movie.durationMinutes % 60;

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-[color:var(--color-kino-white)] mb-2">
        {movie.title}
      </h1>

      <p className="flex items-center gap-2 text-sm text-[color:var(--color-kino-grey)] mb-4">
        <span className="px-2 py-1 rounded-md border border-[color:var(--color-kino-grey)] text-[color:var(--color-kino-grey)] text-xs font-semibold">
          {movie.ageLimit}+
        </span>
        <span>
          {hours} h {minutes} min
        </span>
        <span>{movie.genre.join(", ")}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-4">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="rounded-4xl w-full md:w-1/2 max-h-[550px]"
        />

        <div className="bg-[color:var(--color-kino-darkgrey)] rounded-4xl p-4 text-lg leading-relaxed md:w-1/2 text-[color:var(--color-kino-white)] max-h-[550px]">
          {movie.description}
        </div>
      </div>
    </div>
  );
}