'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Loader as Loader2 } from 'lucide-react';
import PostCard from './PostCard';
import InContentAd from './ads/InContentAd';

interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  link: string;
  uagb_featured_image_src?: {
    medium?: string[];
  };
}

export default function BlogSearch() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = query
          ? `https://projectai.space/wp-json/wp/v2/posts?search=${encodeURIComponent(query)}`
          : 'https://projectai.space/wp-json/wp/v2/posts?per_page=12';

        const res = await fetch(url);

        if (!res.ok) throw new Error('Failed to fetch posts');

        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchPosts();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search blog posts..."
            className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {query && (
          <p className="text-center mt-4 text-gray-600 dark:text-gray-400">
            {loading ? 'Searching...' : `Found ${posts.length} result${posts.length !== 1 ? 's' : ''}`}
          </p>
        )}
      </motion.div>

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading posts...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-red-600 dark:text-red-400">Error: {error}</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {query ? 'No posts found matching your search.' : 'No posts available.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
          {posts.map((post, index) => (
            <>
              <PostCard key={post.id} post={post} index={index} />
              {(index === 1 || index === 4) && (
                <div className="md:col-span-2">
                  <InContentAd />
                </div>
              )}
            </>
          ))}
        </div>
      )}
    </div>
  );
}
