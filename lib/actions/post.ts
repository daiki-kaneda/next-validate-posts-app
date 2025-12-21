"use server";

import { z } from "zod";
import { CreatePostSchema } from "../schemas/post";
import { revalidatePath } from "next/cache";

export type FormState = {
    // キー名に?をつけることでオプショナルにしている
    errors?: {
        title?: string[],
        body?: string[]
    },
    message?: string | null,
    success?: boolean
}

export async function createPostAction(prevState: FormState, formData: FormData) {
    const validatedFields = CreatePostSchema.safeParse({
        title: formData.get('title'),
        body: formData.get('body')
    });

    if (!validatedFields.success) {
        return {
            errors: z.treeifyError(validatedFields.error),
            message: "入力内容に不備があります。",
            success: false
        };
    }

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...validatedFields.data,
                userId: 1, // JSONPlaceholder用のダミーユーザーID
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to create post via API");
        }

        // 4. 成功時の処理：キャッシュの更新とUIへの通知
        revalidatePath("/");
        return {
            errors: {},
            message: "投稿が正常に完了しました！",
            success: true,
        };

    } catch (error) {
        console.error(error);
        return {
            message: "システムエラーが発生しました。時間を置いて再度お試しください。",
            success: false,
        };
    }
}
