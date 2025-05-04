import { initTRPC } from '@trpc/server'

const ideas = [
  { id: 1, nick: 'some-nick-1', name: 'element 1', description: 'Element 1' },
  { id: 2, nick: 'some-nick-1', name: 'element 2', description: 'Element 2' },
  { id: 3, nick: 'some-nick-1', name: 'element 3', description: 'Element 3' },
  { id: 4, nick: 'some-nick-1', name: 'element 4', description: 'Element 4' },
]

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => {
    return { ideas }
  }),
})

export type TrpcRouter = typeof trpcRouter
