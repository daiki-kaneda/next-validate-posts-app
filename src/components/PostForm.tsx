"use client";

import { useActionState } from "react";
import { createPostAction, FormState } from "../lib/actions/post";

const initialState: FormState = {
    message: null,
    errors: {},
    success: false,
};

export default function PostForm() {
    // state:Action関数の返り値,fromAction:フォームのaction属性に渡す関数,isPending:送信中フラグ
    const [state, formAction, isPending] = useActionState(
        createPostAction, initialState
    );

    return (
        <form action={formAction} className="space-y-4 max-w-md mx-auto p-4 border rounded-lg">
            <div>
                <label htmlFor="title" className="block font-bold">タイトル</label>
                <input
                    type="text"
                    id="title"
                    name="title" // FormDataのキー
                    className="border p-2 w-full rounded"
                    disabled={isPending}
                />
                {/* Zodのエラーがあれば表示 */}
                {
                    state.errors?.title && (<p className="text-red-500 text-sm">{state.errors.title.errors[0]}</p>)
                }
            </div>

            <div>
                <label htmlFor="body" className="block font-bold">本文</label>
                <textarea
                    id="body"
                    name="body" // FormDataのキー
                    className="border p-2 w-full rounded"
                    rows={5}
                    disabled={isPending}
                />
                {state.errors?.body && (<p className="text-red-500 text-sm">{state.errors.body.errors[0]}</p>)}
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
                {isPending ? "送信中..." : "投稿する"}
            </button>

            {/*成功、失敗メッセージ*/}
            {!isPending ? (state.message && (
                <p className={`p-2 rounded ${state.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {state.message}
                </p>
            )) : null}
        </form>
    );

}