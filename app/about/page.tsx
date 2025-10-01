'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { Sparkles, Target, Lightbulb, Users } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navigation />

      <section className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-16 h-16 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              About Project AI
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Your daily guide to AI & Agentic AI
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg dark:prose-invert max-w-none mb-16"
          >
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-lg">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                <strong className="text-gray-900 dark:text-white">ProjectAI.Space</strong> is your comprehensive resource for understanding and mastering artificial intelligence. We deliver daily insights, in-depth tutorials, and breaking news about AI technology, with a special focus on Agentic AI systems.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Our mission is to make advanced AI concepts accessible to everyone—from curious beginners to experienced developers. We break down complex topics into digestible content that empowers you to stay ahead in the rapidly evolving world of artificial intelligence.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Whether you're exploring machine learning fundamentals, implementing agentic systems, or keeping up with the latest AI breakthroughs, Project AI is your trusted companion on the journey to AI mastery.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <Target className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Our Mission
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Democratizing AI knowledge for everyone
              </p>
            </div>

            <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <Lightbulb className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Our Vision
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Building the future with intelligent systems
              </p>
            </div>

            <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <Users className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Our Community
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Connecting AI enthusiasts worldwide
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <Link
              href="/blog"
              className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-full shadow-lg transition-all duration-300 hover:shadow-blue-500/50 hover:scale-105"
            >
              Explore Our Blog
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
