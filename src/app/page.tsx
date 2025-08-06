import Image from 'next/image';
import { movies, Movie } from '@/data/movies';
import CineRoulette from '@/components/cine-roulette';
import { CommentSection } from '@/components/comment-section';
import { Card, CardContent } from '@/components/ui/card';
import { HorizontalAd } from '@/components/ads/horizontal-ad';
import { VerticalAd } from '@/components/ads/vertical-ad';

function TopRecommendations() {
  const recommendedMovies = movies.slice(0, 10);

  return (
    <section className="w-full max-w-7xl mx-auto py-16 px-4 md:px-6">
      <h2 className="text-4xl font-headline font-black text-center mb-10 text-white tracking-tighter">
        Las más recomendadas
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {recommendedMovies.map((movie) => (
          <Card key={movie.id} className="overflow-hidden group border-2 border-transparent hover:border-accent transition-all duration-300 rounded-xl bg-card/50">
            <CardContent className="p-0">
              <div className="relative">
                <Image
                  src={movie.posterUrl}
                  alt={`Póster de ${movie.title}`}
                  width={400}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="font-bold text-white text-lg leading-tight drop-shadow-lg">{movie.title}</h3>
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
    <div className="flex flex-col min-h-screen bg-background bg-grid-zinc-900/40">
      <header className="py-12">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-headline font-black text-white tracking-tighter uppercase">
            ¿Qué película puedo ver?
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mt-4 font-body max-w-2xl mx-auto">
            Gira la ruleta, desafía al algoritmo y encuentra tu próxima película favorita.
          </p>
        </div>
      </header>
      
      <div className="container mx-auto flex-grow">
        <div className="grid grid-cols-12 gap-8">
          <aside className="hidden lg:block lg:col-span-2">
            <div className="sticky top-8">
              <VerticalAd />
            </div>
          </aside>
          
          <main className="col-span-12 lg:col-span-8">
            <CineRoulette movies={movies} />
            <TopRecommendations />
            <CommentSection />
          </main>

          <aside className="hidden lg:block lg:col-span-2">
            <div className="sticky top-8">
              <VerticalAd />
            </div>
          </aside>
        </div>
      </div>
      
      <footer className="py-8 text-center text-muted-foreground/60">
        <div className="container mx-auto">
          <HorizontalAd />
          <p className="mt-8">Diseñado para amantes del cine.</p>
        </div>
      </footer>
    </div>
  );
}
