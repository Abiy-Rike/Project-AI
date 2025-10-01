'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { ShoppingBag, Download, FileText, Code as Code2, BookOpen, Zap } from 'lucide-react';

const products = [
  {
    id: 1,
    title: 'AI Fundamentals Guide',
    description: 'Comprehensive PDF guide covering machine learning basics, neural networks, and practical AI applications.',
    icon: BookOpen,
    type: 'PDF',
    price: 'Free',
  },
  {
    id: 2,
    title: 'Agentic AI Starter Pack',
    description: 'Complete code templates and examples for building your first autonomous AI agents.',
    icon: Code2,
    type: 'Code',
    price: 'Free',
  },
  {
    id: 3,
    title: 'Prompt Engineering Playbook',
    description: 'Master the art of prompt engineering with 100+ tested prompts and best practices.',
    icon: Zap,
    type: 'PDF',
    price: 'Free',
  },
  {
    id: 4,
    title: 'LangChain Implementation Guide',
    description: 'Step-by-step tutorials and code examples for building production-ready LangChain applications.',
    icon: FileText,
    type: 'Code + PDF',
    price: 'Free',
  },
];

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navigation />

      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <ShoppingBag className="w-16 h-16 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Shop
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Download premium AI resources, guides, and code packs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {products.map((product, index) => {
              const Icon = product.icon;
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                        <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-semibold rounded-full">
                        {product.price}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {product.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-500">
                        {product.type}
                      </span>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </motion.button>
                    </div>
                  </div>

                  <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              More Resources Coming Soon
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We're constantly creating new guides, code packs, and premium resources to help you master AI.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Subscribe to our newsletter to get notified when new products are available.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
