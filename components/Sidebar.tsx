'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, FolderOpen, Loader as Loader2 } from 'lucide-react';

interface Post {
  id: number;
  title: { rendered: string };
  link: string;
}

interface Category {
  id: number;
  name: string;
  count: number;
  link: string;
}

export default function Sidebar() {
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('https://projectai.space/wp-json/wp/v2/posts?per_page=5').then((res) => res.json()),
      fetch('https://projectai.space/wp-json/wp/v2/categories?per_page=10').then((res) => res.json()),
    ])
      .then(([postsData, categoriesData]) => {
        setLatestPosts(postsData);
        setCategories(categoriesData.filter((cat: Category) => cat.count > 0));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <aside className="hidden lg:block lg:col-span-1 space-y-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </aside>
    );
  }

  return (
    <aside className="hidden lg:block lg:col-span-1 space-y-8">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-8"
      >
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Latest Posts</h3>
        </div>

        <ul className="space-y-4">
          {latestPosts.map((post, index) => (
            <motion.li
              key={post.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
            </motion.li>
          ))}
        </ul>

        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-6">
            <FolderOpen className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Categories</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <motion.a
                key={category.id}
                href={category.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
              >
                {category.name}
                <span className="ml-1 text-xs opacity-70">({category.count})</span>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </aside>
  );
}
