'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PostCard from './PostCard';
import InContentAd from './ads/InContentAd';
import { Loader as Loader2 } from 'lucide-react';

interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  link: string;
  uagb_featured_image_src?: {
    medium?: string[];
  };
}

export default function BlogFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://projectai.space/wp-json/wp/v2/posts')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch posts');
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section id="blog-feed" className="py-20 px-4 md:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading amazing content...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="blog-feed" className="py-20 px-4 md:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-600">Error loading posts: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="blog-feed" className="py-20 px-4 md:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Latest Blog Posts
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Discover insights, tutorials, and the latest in AI technology
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
          {posts.map((post, index) => (
            <>
              <PostCard key={post.id} post={post} index={index} />
              {index === 3 && (
                <div className="md:col-span-2">
                  <InContentAd />
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </section>
  );
}
