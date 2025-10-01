import BlogSearch from '@/components/BlogSearch';
import Sidebar from '@/components/Sidebar';
import Navigation from '@/components/Navigation';
import SidebarAd from '@/components/ads/SidebarAd';
import MobileStickyAd from '@/components/ads/MobileStickyAd';

export const metadata = {
  title: 'Blog - Project AI',
  description: 'Explore the latest insights, tutorials, and trends in AI technology and Agentic AI.',
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navigation />

      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Blog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Discover insights, tutorials, and the latest in AI technology
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <BlogSearch />
            </div>

            <aside className="hidden lg:block space-y-8">
              <Sidebar />
              <SidebarAd />
            </aside>
          </div>
        </div>
      </section>

      <MobileStickyAd />
    </main>
  );
}
