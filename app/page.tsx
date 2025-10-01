import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import FeaturedPosts from '@/components/FeaturedPosts';
import HomepageTopAd from '@/components/ads/HomepageTopAd';
import MobileStickyAd from '@/components/ads/MobileStickyAd';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navigation />
      <Header />
      <HomepageTopAd />
      <FeaturedPosts />
      <MobileStickyAd />
    </main>
  );
}
