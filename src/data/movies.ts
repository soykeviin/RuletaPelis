export interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  trailerUrl: string;
  genres: string[];
  releaseYear: number;
  streamingOn: ('netflix' | 'prime' | 'disney' | 'hbo')[];
}

export const movies: Movie[] = [
  {
    id: 1,
    title: "Dune: Part Two",
    posterUrl: "https://placehold.co/400x600/2B3035/FFFFFF",
    trailerUrl: "https://www.youtube.com/embed/U2Qp5pL3ovA",
    genres: ["ciencia ficción", "aventura"],
    releaseYear: 2024,
    streamingOn: ["hbo"],
    "data-ai-hint": "sci-fi desert"
  },
  {
    id: 2,
    title: "The Matrix",
    posterUrl: "https://placehold.co/400x600/2B3035/FFFFFF",
    trailerUrl: "https://www.youtube.com/embed/vKQi3bBA1y8",
    genres: ["ciencia ficción", "acción"],
    releaseYear: 1999,
    streamingOn: ["hbo", "prime"],
    "data-ai-hint": "hacker simulation"
  },
  {
    id: 3,
    title: "Pulp Fiction",
    posterUrl: "https://placehold.co/400x600/2B3035/FFFFFF",
    trailerUrl: "https://www.youtube.com/embed/s7EdQ4FqbhY",
    genres: ["crimen", "drama"],
    releaseYear: 1994,
    streamingOn: ["netflix"],
    "data-ai-hint": "gangster dance"
  },
  {
    id: 4,
    title: "Inception",
    posterUrl: "https://placehold.co/400x600/2B3035/FFFFFF",
    trailerUrl: "https://www.youtube.com/embed/YoHD9XEInc0",
    genres: ["ciencia ficción", "acción", "thriller"],
    releaseYear: 2010,
    streamingOn: ["prime", "hbo"],
    "data-ai-hint": "dream city"
  },
  {
    id: 5,
    title: "The Super Mario Bros. Movie",
    posterUrl: "https://placehold.co/400x600/2B3035/FFFFFF",
    trailerUrl: "https://www.youtube.com/embed/TnGl01FkMMo",
    genres: ["animación", "comedia", "aventura"],
    releaseYear: 2023,
    streamingOn: ["netflix"],
    "data-ai-hint": "plumber mushroom"
  },
  {
    id: 6,
    title: "Parasite",
    posterUrl: "https://placehold.co/400x600/2B3035/FFFFFF",
    trailerUrl: "https://www.youtube.com/embed/5xH0HfJHsaY",
    genres: ["thriller", "drama", "comedia"],
    releaseYear: 2019,
    streamingOn: ["prime"],
    "data-ai-hint": "family stairs"
  },
  {
    id: 7,
    title: "Blade Runner 2049",
    posterUrl: "https://placehold.co/400x600/2B3035/FFFFFF",
    trailerUrl: "https://www.youtube.com/embed/gCcx85zbxz4",
    genres: ["ciencia ficción", "thriller"],
    releaseYear: 2017,
    streamingOn: ["netflix"],
    "data-ai-hint": "futuristic car"
  },
  {
    id: 8,
    title: "Spirited Away",
    posterUrl: "https://placehold.co/400x600/2B3035/FFFFFF",
    trailerUrl: "https://www.youtube.com/embed/ByXuk9QqQkk",
    genres: ["animación", "fantasía"],
    releaseYear: 2001,
    streamingOn: ["hbo"],
    "data-ai-hint": "anime spirits"
  },
  {
    id: 9,
    title: "The Grand Budapest Hotel",
    posterUrl: "https://placehold.co/400x600/2B3035/FFFFFF",
    trailerUrl: "https://www.youtube.com/embed/1Fg5iWmQjwk",
    genres: ["comedia", "drama"],
    releaseYear: 2014,
    streamingOn: ["disney"],
    "data-ai-hint": "pink hotel"
  },
  {
    id: 10,
    title: "Mad Max: Fury Road",
    posterUrl: "https://placehold.co/400x600/2B3035/FFFFFF",
    trailerUrl: "https://www.youtube.com/embed/hEJnMQG9ev8",
    genres: ["acción", "aventura", "ciencia ficción"],
    releaseYear: 2015,
    streamingOn: ["hbo"],
    "data-ai-hint": "desert chase"
  },
  {
    id: 11,
    title: "Oppenheimer",
    posterUrl: "https://placehold.co/400x600/2B3035/FFFFFF",
    trailerUrl: "https://www.youtube.com/embed/uYPbbksJxIg",
    genres: ["drama", "historia", "biografía"],
    releaseYear: 2023,
    streamingOn: ["prime"],
    "data-ai-hint": "man explosion"
  },
  {
    id: 12,
    title: "La La Land",
    posterUrl: "https://placehold.co/400x600/2B3035/FFFFFF",
    trailerUrl: "https://www.youtube.com/embed/0pdqf4P9MB8",
    genres: ["musical", "romance", "drama"],
    releaseYear: 2016,
    streamingOn: ["netflix", "prime"],
    "data-ai-hint": "couple dancing"
  },
  {
    id: 13,
    title: "Gladiator",
    posterUrl: "https://placehold.co/400x600/2B3035/FFFFFF",
    trailerUrl: "https://www.youtube.com/embed/owK1qxDselE",
    genres: ["acción", "drama", "historia"],
    releaseYear: 2000,
    streamingOn: ["netflix"],
    "data-ai-hint": "roman colosseum"
  },
  {
    id: 14,
    title: "Toy Story",
    posterUrl: "https://placehold.co/400x600/2B3035/FFFFFF",
    trailerUrl: "https://www.youtube.com/embed/v-PjgYDrg70",
    genres: ["animación", "comedia", "familia"],
    releaseYear: 1995,
    streamingOn: ["disney"],
    "data-ai-hint": "cowboy spaceman"
  },
  {
    id: 15,
    title: "The Thing",
    posterUrl: "https://placehold.co/400x600/2B3035/FFFFFF",
    trailerUrl: "https://www.youtube.com/embed/5ftmr17M-a4",
    genres: ["terror", "ciencia ficción"],
    releaseYear: 1982,
    streamingOn: ["prime"],
    "data-ai-hint": "antarctic monster"
  },
  {
    id: 16,
    title: "Joker",
    posterUrl: "https://placehold.co/400x600/2B3035/FFFFFF",
    trailerUrl: "https://www.youtube.com/embed/zAGVQLHvwOY",
    genres: ["drama", "crimen", "thriller"],
    releaseYear: 2019,
    streamingOn: ["hbo", "netflix"],
    "data-ai-hint": "clown makeup"
  },
  {
    id: 17,
    title: "Back to the Future",
    posterUrl: "https://placehold.co/400x600/2B3035/FFFFFF",
    trailerUrl: "https://www.youtube.com/embed/qvsgGtivCgs",
    genres: ["ciencia ficción", "comedia", "aventura"],
    releaseYear: 1985,
    streamingOn: ["prime"],
    "data-ai-hint": "time-travel car"
  },
  {
    id: 18,
    title: "Avengers: Endgame",
    posterUrl: "https://placehold.co/400x600/2B3035/FFFFFF",
    trailerUrl: "https://www.youtube.com/embed/TcMBFSGVi1c",
    genres: ["acción", "aventura", "superhéroes"],
    releaseYear: 2019,
    streamingOn: ["disney"],
    "data-ai-hint": "superhero group"
  },
  {
    id: 19,
    title: "Wicked",
    posterUrl: "https://placehold.co/400x600/2B3035/FFFFFF",
    trailerUrl: "https://www.youtube.com/embed/F1dvX92d7_g",
    genres: ["fantasía", "musical"],
    releaseYear: 2025,
    streamingOn: [],
    "data-ai-hint": "witch fantasy"
  },
  {
    id: 20,
    title: "Superman",
    posterUrl: "https://placehold.co/400x600/2B3035/FFFFFF",
    trailerUrl: "https://www.youtube.com/embed/1_y_r64H0wE",
    genres: ["acción", "superhéroes", "ciencia ficción"],
    releaseYear: 2025,
    streamingOn: [],
    "data-ai-hint": "flying superhero"
  }
];
