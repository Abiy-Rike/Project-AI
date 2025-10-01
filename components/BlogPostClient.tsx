'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Share2, Loader as Loader2 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import InContentAd from '@/components/ads/InContentAd';
import MobileStickyAd from '@/components/ads/MobileStickyAd';
import { Button } from '@/components/ui/button';

interface Post {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  uagb_featured_image_src?: {
    full?: string[];
  };
  link: string;
}

interface BlogPostClientProps {
  slug: string;
}

export default function BlogPostClient({ slug }: BlogPostClientProps) {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    Promise.all([
      fetch(`https://projectai.space/wp-json/wp/v2/posts?slug=${slug}`).then(res => res.json()),
      fetch(`https://projectai.space/wp-json/wp/v2/posts?per_page=3`).then(res => res.json())
    ])
      .then(([postData, relatedData]) => {
        if (postData && postData.length > 0) {
          setPost(postData[0]);
          setRelatedPosts(relatedData.filter((p: Post) => p.id !== postData[0].id).slice(0, 2));
        } else {
          setError('Post not found');
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title.rendered,
          text: post.excerpt.rendered.replace(/<[^>]*>/g, ''),
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading article...</p>
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Post Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">The article you're looking for doesn't exist.</p>
          <Button onClick={() => router.push('/blog')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </div>
      </main>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const readingTime = Math.ceil(post.content.rendered.split(' ').length / 200);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />

      <article className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        <Button
          variant="ghost"
          onClick={() => router.push('/blog')}
          className="mb-8 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{readingTime} min read</span>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>

          {post.uagb_featured_image_src?.full && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden mb-12 shadow-2xl"
            >
              <img
                src={post.uagb_featured_image_src.full[0]}
                alt={post.title.rendered}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}

          <InContentAd />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="prose prose-lg dark:prose-invert max-w-none mb-12
              prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
              prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 dark:prose-strong:text-white
              prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:shadow-lg
              prose-img:rounded-xl prose-img:shadow-lg
              prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:bg-gray-100 dark:prose-blockquote:bg-gray-800 prose-blockquote:p-4 prose-blockquote:rounded-r-lg"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          <InContentAd />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 p-8 bg-gradient-to-br from-blue-50 to-sky-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl text-center shadow-lg"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Enjoyed this article?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
              Get exclusive resources, code examples, and deep-dive tutorials
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => router.push('/shop')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
              >
                Download PDF & Code
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push('/blog')}
                className="px-8 py-6 text-lg"
              >
                Explore More Articles
              </Button>
            </div>
          </motion.div>

          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <motion.div
                    key={relatedPost.id}
                    whileHover={{ y: -5 }}
                    onClick={() => router.push(`/blog/${relatedPost.link.split('/').filter(Boolean).pop()}`)}
                    className="cursor-pointer group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  >
                    {relatedPost.uagb_featured_image_src?.full && (
                      <div className="relative w-full h-48 overflow-hidden">
                        <img
                          src={relatedPost.uagb_featured_image_src.full[0]}
                          alt={relatedPost.title.rendered}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3
                        className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                        dangerouslySetInnerHTML={{ __html: relatedPost.title.rendered }}
                      />
                      <div
                        className="text-gray-600 dark:text-gray-400 line-clamp-2 text-sm"
                        dangerouslySetInnerHTML={{ __html: relatedPost.excerpt.rendered }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </article>

      <MobileStickyAd />
    </main>
  );
}
