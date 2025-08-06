"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useForm, SubmitHandler } from "react-hook-form"

interface IFormInput {
  name: string
  comment: string
}

interface Comment extends IFormInput {
  id: number
  timestamp: Date
}

const initialComments: Comment[] = [
  {
    id: 1,
    name: "Cinéfilo Anónimo",
    comment: "¡Qué gran idea! Me ayudó a descubrir una joya de película que no conocía.",
    timestamp: new Date("2024-08-05T10:00:00Z"),
  },
  {
    id: 2,
    name: "Maria G.",
    comment: "La ruleta es muy divertida. La animación está genial.",
    timestamp: new Date("2024-08-05T09:55:00Z"),
  },
]

export function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([])
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    // Set initial comments with dynamic dates only on the client
    setComments([
        {
          id: 1,
          name: "Cinéfilo Anónimo",
          comment: "¡Qué gran idea! Me ayudó a descubrir una joya de película que no conocía.",
          timestamp: new Date(),
        },
        {
          id: 2,
          name: "Maria G.",
          comment: "La ruleta es muy divertida. La animación está genial.",
          timestamp: new Date(Date.now() - 1000 * 60 * 5),
        },
    ]);
  }, [])
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const newComment: Comment = {
      id: Date.now(),
      ...data,
      timestamp: new Date(),
    }
    setComments([newComment, ...comments])
    reset()
  }

  if (!hasMounted) {
    return null; // or a loading skeleton
  }

  return (
    <section className="w-full max-w-4xl mx-auto py-12 px-4 md:px-6">
      <h2 className="text-3xl font-headline font-bold text-center mb-8 text-primary">Comentarios</h2>
      <Card className="mb-8 bg-card/80 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline">Deja tu opinión</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <Input
              placeholder="Tu nombre"
              {...register("name", { required: "El nombre es obligatorio" })}
              className="bg-background"
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            <Textarea
              placeholder="Escribe tu comentario aquí..."
              {...register("comment", { required: "El comentario no puede estar vacío" })}
              className="bg-background"
            />
            {errors.comment && <p className="text-sm text-destructive">{errors.comment.message}</p>}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">Enviar Comentario</Button>
          </CardFooter>
        </form>
      </Card>

      <div className="space-y-6">
        {comments.map((comment) => (
          <Card key={comment.id} className="bg-card/60">
            <CardContent className="p-4 flex items-start space-x-4">
              <Avatar>
                <AvatarFallback>{comment.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-primary">{comment.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {comment.timestamp.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                  </p>
                </div>
                <p className="mt-1 text-foreground/90">{comment.comment}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
