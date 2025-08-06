"use client";

import { useState, useMemo, useEffect, useCallback } from 'react';
import Image from 'next/image';
import type { Movie } from '@/data/movies';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { NetflixIcon } from './icons/netflix-icon';
import { PrimeVideoIcon } from './icons/prime-video-icon';
import { DisneyPlusIcon } from './icons/disney-plus-icon';
import { HboMaxIcon } from './icons/hbo-max-icon';
import { PlayIcon } from './icons/play-icon';

const platformIcons: { [key: string]: React.ReactNode } = {
  netflix: <NetflixIcon className="h-8 w-auto" />,
  prime: <PrimeVideoIcon className="h-8 w-auto" />,
  disney: <DisneyPlusIcon className="h-8 w-auto" />,
  hbo: <HboMaxIcon className="h-8 w-auto" />,
};

type EraFilter = 'all' | 'old' | 'future';

export default function CineRoulette({ movies }: { movies: Movie[] }) {
  const [genre, setGenre] = useState('all');
  const [era, setEra] = useState<EraFilter>('all');
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinningMovie, setSpinningMovie] = useState<Movie | null>(null);
  const [resultMovie, setResultMovie] = useState<Movie | null>(null);
  const [isResultOpen, setIsResultOpen] = useState(false);

  const genres = useMemo(() => ['all', ...Array.from(new Set(movies.flatMap(m => m.genres)))], [movies]);

  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      const genreMatch = genre === 'all' || movie.genres.includes(genre);
      const eraMatch = era === 'all' ||
        (era === 'old' && movie.releaseYear < 2000) ||
        (era === 'future' && movie.releaseYear === 2025);
      return genreMatch && eraMatch;
    });
  }, [movies, genre, era]);
  
  useEffect(() => {
    if (!spinningMovie && filteredMovies.length > 0) {
      setSpinningMovie(filteredMovies[0]);
    }
     if (filteredMovies.length > 0 && spinningMovie && !filteredMovies.find(m => m.id === spinningMovie.id)) {
      setSpinningMovie(filteredMovies[0]);
    }
    if(filteredMovies.length === 0){
      setSpinningMovie(null);
    }
  }, [filteredMovies, spinningMovie]);

  const handleSpin = useCallback(() => {
    if (isSpinning || filteredMovies.length === 0) return;
    setIsSpinning(true);

    let spinDuration = 3000;
    let intervalTime = 75;
    const startTime = Date.now();

    const spinInterval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const randomIndex = Math.floor(Math.random() * filteredMovies.length);
      setSpinningMovie(filteredMovies[randomIndex]);

      if (elapsedTime >= spinDuration) {
        clearInterval(spinInterval);
        const finalMovie = filteredMovies[Math.floor(Math.random() * filteredMovies.length)];
        setResultMovie(finalMovie);
        setIsSpinning(false);
        setIsResultOpen(true);
      }
    }, intervalTime);
  }, [isSpinning, filteredMovies]);

  const handleSpinAgain = () => {
    setIsResultOpen(false);
    // Use a timeout to allow the dialog to close before starting the next spin
    setTimeout(() => {
        handleSpin();
    }, 300);
  }

  const currentMovieToDisplay = isSpinning ? spinningMovie : (resultMovie || filteredMovies[0] || null);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="p-6 bg-card/80 backdrop-blur-sm shadow-2xl">
            <h3 className="text-2xl font-headline font-bold mb-4 text-primary">Filtros</h3>
            <div className="space-y-6">
              <div>
                <Label htmlFor="genre-select" className="text-lg font-semibold font-body">Género</Label>
                <Select value={genre} onValueChange={setGenre}>
                  <SelectTrigger id="genre-select" className="w-full mt-2 capitalize">
                    <SelectValue placeholder="Selecciona un género" />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map(g => <SelectItem key={g} value={g} className="capitalize">{g === 'all' ? 'Todos' : g}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div>
                <Label className="text-lg font-semibold font-body">Época</Label>
                <RadioGroup value={era} onValueChange={(value) => setEra(value as EraFilter)} className="mt-2 space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="era-all" />
                    <Label htmlFor="era-all">Todas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="old" id="era-old" />
                    <Label htmlFor="era-old">Clásicas (antes del 2000)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="future" id="era-future" />
                    <Label htmlFor="era-future">Próximamente (2025)</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </Card>
        </div>
        <div className="lg:col-span-2 flex flex-col items-center justify-center space-y-6">
          <Card className={`w-full max-w-md aspect-[2/3] relative overflow-hidden shadow-2xl transition-all duration-300 ${isSpinning ? 'shadow-primary/50 shadow-[0_0_35px_10px_var(--tw-shadow-color)]' : ''}`}>
             {currentMovieToDisplay ? (
                <Image
                    src={currentMovieToDisplay.posterUrl}
                    alt={currentMovieToDisplay.title}
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint="movie poster"
                />
             ) : (
                <div className="w-full h-full bg-card flex flex-col items-center justify-center text-center p-4">
                    <p className="text-muted-foreground">No hay películas que coincidan con los filtros seleccionados.</p>
                </div>
             )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              {currentMovieToDisplay && (
                <div className="absolute bottom-0 left-0 p-6">
                    <h2 className="text-3xl font-bold text-white drop-shadow-lg font-headline">{currentMovieToDisplay.title}</h2>
                    <p className="text-white/80">{currentMovieToDisplay.releaseYear}</p>
                </div>
              )}
          </Card>
          <Button onClick={handleSpin} disabled={isSpinning || filteredMovies.length === 0} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-8 px-12 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-200">
            {isSpinning ? 'Girando...' : '¡Girar la Ruleta!'}
          </Button>
        </div>
      </div>

      {resultMovie && (
        <Dialog open={isResultOpen} onOpenChange={setIsResultOpen}>
          <DialogContent className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-0 p-0">
            <div className="relative aspect-[2/3]">
              <Image src={resultMovie.posterUrl} alt={resultMovie.title} fill className="object-cover rounded-l-lg" data-ai-hint="movie poster"/>
            </div>
            <div className="flex flex-col p-6">
                <DialogHeader>
                    <DialogTitle className="font-headline text-4xl text-primary mb-2">{resultMovie.title}</DialogTitle>
                    <DialogDescription className="space-x-2">
                        <span>{resultMovie.releaseYear}</span>
                        <span>&bull;</span>
                        <span className="capitalize">{resultMovie.genres.join(', ')}</span>
                    </DialogDescription>
                </DialogHeader>
                <div className="my-4 flex-grow relative rounded-lg overflow-hidden">
                    <iframe
                        className="w-full h-full aspect-video"
                        src={resultMovie.trailerUrl}
                        title={`Trailer de ${resultMovie.title}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                     <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none">
                        <PlayIcon className="w-16 h-16 text-white/70" />
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-lg mb-2">Dónde ver</h4>
                    <div className="flex items-center gap-4">
                        {resultMovie.streamingOn.map(p => <div key={p}>{platformIcons[p]}</div>)}
                    </div>
                </div>
                <Button onClick={handleSpinAgain} className="mt-6 w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                    Girar de nuevo
                </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
