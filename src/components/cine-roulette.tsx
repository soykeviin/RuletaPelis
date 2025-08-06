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
  netflix: <NetflixIcon className="h-6 w-auto" />,
  prime: <PrimeVideoIcon className="h-6 w-auto" />,
  disney: <DisneyPlusIcon className="h-5 w-auto" />,
  hbo: <HboMaxIcon className="h-6 w-auto text-white" />,
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
        (era === 'future' && movie.releaseYear >= 2025);
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
  const showFutureMoviesFilter = useMemo(() => movies.some(m => m.releaseYear >= 2025), [movies]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1">
          <Card className="p-6 bg-card/60 backdrop-blur-sm shadow-2xl rounded-2xl border-white/10">
            <h3 className="text-2xl font-headline font-bold mb-6 text-white tracking-tight">Filtros</h3>
            <div className="space-y-6">
              <div>
                <Label htmlFor="genre-select" className="text-lg font-semibold font-body text-white/80">Género</Label>
                <Select value={genre} onValueChange={setGenre}>
                  <SelectTrigger id="genre-select" className="w-full mt-2 capitalize bg-black/30 border-white/20 h-12 text-base">
                    <SelectValue placeholder="Selecciona un género" />
                  </SelectTrigger>
                  <SelectContent className='bg-secondary/90 backdrop-blur-xl border-white/20'>
                    {genres.map(g => <SelectItem key={g} value={g} className="capitalize text-base focus:bg-primary/50">{g === 'all' ? 'Todos' : g}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Separator className="bg-white/10" />
              <div>
                <Label className="text-lg font-semibold font-body text-white/80">Época</Label>
                <RadioGroup value={era} onValueChange={(value) => setEra(value as EraFilter)} className="mt-3 space-y-3">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="all" id="era-all" className="border-white/40 h-5 w-5" />
                    <Label htmlFor="era-all" className='text-base'>Todas</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="old" id="era-old" className="border-white/40 h-5 w-5" />
                    <Label htmlFor="era-old" className='text-base'>Clásicas (antes del 2000)</Label>
                  </div>
                  {showFutureMoviesFilter && (
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="future" id="era-future" className="border-white/40 h-5 w-5" />
                      <Label htmlFor="era-future" className='text-base'>Próximamente (2025+)</Label>
                    </div>
                  )}
                </RadioGroup>
              </div>
            </div>
          </Card>
        </div>
        <div className="lg:col-span-2 flex flex-col items-center justify-center space-y-8">
          <Card className={`w-full max-w-[280px] aspect-[2/3] relative overflow-hidden shadow-2xl transition-all duration-300 rounded-2xl bg-card/50 ${isSpinning ? 'shadow-primary/50 shadow-[0_0_55px_15px_var(--tw-shadow-color)]' : 'shadow-black/50'}`}>
             {currentMovieToDisplay ? (
                <Image
                    src={currentMovieToDisplay.posterUrl}
                    alt={currentMovieToDisplay.title}
                    fill
                    className="object-cover"
                    priority
                />
             ) : (
                <div className="w-full h-full bg-card/80 flex flex-col items-center justify-center text-center p-4 rounded-2xl">
                    <p className="text-muted-foreground text-lg">No hay películas que coincidan con los filtros.</p>
                </div>
             )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              {currentMovieToDisplay && (
                <div className="absolute bottom-0 left-0 p-6">
                    <h2 className="text-4xl font-bold text-white drop-shadow-lg font-headline tracking-tight">{currentMovieToDisplay.title}</h2>
                    <p className="text-white/80 text-lg">{currentMovieToDisplay.releaseYear}</p>
                </div>
              )}
          </Card>
          <Button onClick={handleSpin} disabled={isSpinning || filteredMovies.length === 0} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-xl py-8 px-14 rounded-full shadow-lg shadow-accent/30 transform hover:scale-105 transition-transform duration-200">
            {isSpinning ? 'Girando...' : 'Girar'}
          </Button>
        </div>
      </div>

      {resultMovie && (
        <Dialog open={isResultOpen} onOpenChange={setIsResultOpen}>
          <DialogContent 
            className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-0 p-0 bg-card border-white/10 rounded-2xl"
            showCloseButtonOnMobile={true}
          >
            <div className="relative aspect-[2/3] rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none overflow-hidden">
              <Image src={resultMovie.posterUrl} alt={resultMovie.title} fill className="object-cover" />
            </div>
            <div className="flex flex-col p-8">
                <DialogHeader>
                    <DialogTitle className="font-headline text-4xl md:text-5xl text-primary mb-2 tracking-tighter">{resultMovie.title}</DialogTitle>
                    <DialogDescription className="space-x-2 text-white/60 text-base">
                        <span>{resultMovie.releaseYear}</span>
                        <span>&bull;</span>
                        <span className="capitalize">{resultMovie.genres.join(', ')}</span>
                    </DialogDescription>
                </DialogHeader>
                <div className="my-6 flex-grow relative rounded-lg overflow-hidden aspect-video">
                    <iframe
                        className="w-full h-full"
                        src={`${resultMovie.trailerUrl}?autoplay=1&mute=1`}
                        title={`Trailer de ${resultMovie.title}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                     <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors duration-300 pointer-events-none">
                        <PlayIcon className="w-20 h-20 text-white/50" />
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-xl mb-3 text-white">Disponible en</h4>
                    <div className="flex items-center gap-4">
                        {resultMovie.streamingOn.map(p => <div key={p} className="bg-white/10 p-2 rounded-md flex items-center justify-center h-10">{platformIcons[p]}</div>)}
                    </div>
                </div>
                <Button onClick={handleSpinAgain} className="mt-8 w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg h-14">
                    Girar de nuevo
                </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
