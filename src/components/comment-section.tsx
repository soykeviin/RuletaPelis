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
    // Render a skeleton or null on the server to avoid hydration mismatch
    return (
        <section className="w-full max-w-4xl mx-auto py-12 px-4 md:px-6">
            <h2 className="text-4xl font-headline font-black text-center mb-10 text-white tracking-tighter">Comentarios</h2>
            <div className="space-y-6">
                <div className="bg-secondary/30 p-4 rounded-xl h-24 animate-pulse"></div>
                <div className="bg-secondary/30 p-4 rounded-xl h-24 animate-pulse"></div>
            </div>
        </section>
    );
  }

  return (
    <section className="w-full max-w-4xl mx-auto py-16 px-4 md:px-6">
      <h2 className="text-4xl font-headline font-black text-center mb-10 text-white tracking-tighter">Comentarios</h2>
      <Card className="mb-10 bg-secondary/30 backdrop-blur-sm shadow-xl rounded-2xl border-white/10">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-white tracking-tight">Deja tu opinión</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <Input
              placeholder="Tu nombre"
              {...register("name", { required: "El nombre es obligatorio" })}
              className="bg-black/30 border-white/20 h-12 text-base"
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            <Textarea
              placeholder="Escribe tu comentario aquí..."
              {...register("comment", { required: "El comentario no puede estar vacío" })}
              className="bg-black/30 border-white/20 text-base"
              rows={4}
            />
            {errors.comment && <p className="text-sm text-destructive">{errors.comment.message}</p>}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-12 px-6 text-base">Enviar Comentario</Button>
          </CardFooter>
        </form>
      </Card>

      <div className="space-y-6">
        {comments.map((comment) => (
          <Card key={comment.id} className="bg-secondary/30 rounded-xl border-white/10">
            <CardContent className="p-6 flex items-start space-x-4">
              <Avatar className="h-12 w-12 border-2 border-primary">
                <AvatarFallback className="bg-primary/50 text-primary-foreground text-xl font-bold">{comment.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-primary text-lg">{comment.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {comment.timestamp.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                  </p>
                </div>
                <p className="mt-2 text-foreground/90 text-base">{comment.comment}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
