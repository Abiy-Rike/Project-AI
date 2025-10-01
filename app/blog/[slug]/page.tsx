import BlogPostClient from '@/components/BlogPostClient';

interface Post {
  slug: string;
}

export async function generateStaticParams() {
  try {
    const res = await fetch('https://projectai.space/wp-json/wp/v2/posts?per_page=100');
    const posts: Post[] = await res.json();

    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return <BlogPostClient slug={params.slug} />;
}
