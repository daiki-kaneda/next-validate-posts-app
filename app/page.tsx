import PostForm from "@/src/components/PostForm";
import PostList from "@/src/components/PostList";
import { getPosts } from "@/src/lib/actions/post";


export default async function Home() {
  const posts = await getPosts();

return (
    <main className="min-h-screen bg-black-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* セクション1: 投稿フォーム */}
        <section>
          <h1 className="text-3xl font-extrabold text-center mb-8 text-white">
            Next.js Validate Posts
          </h1>
          <div className="bg-black p-6 rounded-2xl shadow-sm border">
            <PostForm />
          </div>
        </section>

        <hr className="border-gray-200" />

        {/* セクション2: 投稿一覧 */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-blue-500 rounded-full" />
            最近の投稿
          </h2>
          <PostList posts={posts} />
        </section>

      </div>
    </main>
  );
}
