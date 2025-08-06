import Image from 'next/image';
import { movies, Movie } from '@/data/movies';
import CineRoulette from '@/components/cine-roulette';
import { CommentSection } from '@/components/comment-section';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

function TopRecommendations() {
  const recommendedMovies = movies.slice(0, 10);

  return (
    <section className="w-full max-w-6xl mx-auto py-12 px-4 md:px-6">
      <h2 className="text-3xl font-headline font-bold text-center mb-8 text-primary">Las más recomendadas</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {recommendedMovies.map((movie) => (
          <Card key={movie.id} className="overflow-hidden group border-2 border-transparent hover:border-primary transition-all duration-300">
            <CardContent className="p-0">
              <div className="relative">
                <Image
                  src={movie.posterUrl}
                  alt={`Póster de ${movie.title}`}
                  width={300}
                  height={450}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint="movie poster"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-3">
                  <h3 className="font-bold text-white text-base leading-tight drop-shadow-lg">{movie.title}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="py-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-white">
            ¿Qué película puedo ver?
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mt-2 font-body">
            Gira la ruleta y encuentra tu próxima película favorita.
          </p>
        </div>
      </header>
      <main className="flex-grow">
        <CineRoulette movies={movies} />
        <TopRecommendations />
        <CommentSection />
      </main>
      <footer className="py-6 text-center text-muted-foreground">
        <p>Diseñado para amantes del cine.</p>
      </footer>
    </div>
  );
}
