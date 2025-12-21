import { z } from 'zod';

export const PostSchema = z.object({
    userId: z.number(),
    id: z.number(),
    title: z.string().min(1, "タイトルは必須です。"),
    body: z.string().min(1, "本文は必須です。"),
});

export const CreatePostSchema = PostSchema.omit({userId:true, id: true});

// 型の抽出
export type Post = z.infer<typeof PostSchema>;
export type CreatePostInput = z.infer<typeof CreatePostSchema>;

