import { zCreateIdeaTrpcInput } from '../createIdea/input';
import z from 'zod';

export const zUpdateIdeaTrpcInput = zCreateIdeaTrpcInput.extend({
  ideaId: z.string().min(1),
});
