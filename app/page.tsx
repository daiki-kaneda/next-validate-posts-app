import PostForm from "@/src/components/PostForm";


export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">新しい投稿を作成</h1>
      <PostForm />
    </main>
  );
}
