'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface PostCardProps {
  post: {
    id: number;
    title: { rendered: string };
    excerpt: { rendered: string };
    link: string;
    uagb_featured_image_src?: {
      medium?: string[];
    };
  };
  index: number;
}

export default function PostCard({ post, index }: PostCardProps) {
  const imageUrl = post.uagb_featured_image_src?.medium?.[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      {imageUrl && (
        <div className="relative w-full h-56 overflow-hidden">
          <motion.img
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
          className="text-2xl font-bold mb-3 text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        <div
          className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />

        <motion.a
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: 5 }}
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all duration-300"
        >
          Read More
          <ArrowRight className="w-5 h-5" />
        </motion.a>
      </div>

      <div className="absolute top-4 right-4 w-12 h-12 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all duration-300"></div>
    </motion.article>
  );
}
