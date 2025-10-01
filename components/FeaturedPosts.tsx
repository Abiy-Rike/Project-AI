'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader as Loader2 } from 'lucide-react';
import Link from 'next/link';

interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  link: string;
  uagb_featured_image_src?: {
    medium?: string[];
  };
}

export default function FeaturedPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://projectai.space/wp-json/wp/v2/posts?per_page=3')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-4 md:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto flex justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 md:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Posts
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Latest insights from the world of AI
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {posts.map((post, index) => {
            const imageUrl = post.uagb_featured_image_src?.medium?.[0];
            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {imageUrl && (
                  <div className="relative w-full h-48 overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={post.title.rendered}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                )}

                <div className="p-6">
                  <h3
                    className="text-xl font-bold mb-3 text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />

                  <div
                    className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 text-sm"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />

                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all duration-300"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="/blog"
            className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-full shadow-lg transition-all duration-300 hover:shadow-blue-500/50 hover:scale-105"
          >
            View All Posts
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
