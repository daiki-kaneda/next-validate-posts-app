import { Post } from "../lib/schemas/post";

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  // 投稿がない場合のガード
  if (posts.length === 0) {
    return (
      <div className="text-center p-10 bg-gray-50 rounded-lg border-2 border-dashed">
        <p className="text-gray-500">表示できる投稿がありません。</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  );
}

interface PostCardProps {
  post: Post;
}

function PostCard({ post }: PostCardProps) {
  return (
    <article
      className="group p-6 bg-white border rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200"
    >
      <div className="flex flex-col h-full">
        <span className="text-xs font-mono text-gray-400 mb-2">ID: {post.id}</span>
        <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 mb-3 line-clamp-1">
          {post.title}
        </h2>
        <p className="text-gray-600 line-clamp-3 flex-grow text-sm leading-relaxed">
          {post.body}
        </p>
        <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center text-xs text-gray-400">
          <span>User ID: {post.userId}</span>
          <span className="bg-gray-100 px-2 py-1 rounded text-gray-500">Read more</span>
        </div>
      </div>
    </article>
  );
}