# Google AdSense Integration Guide for Project AI

This project includes a complete Google AdSense integration with reusable components optimized for performance and Google approval.

## Setup Instructions

### 1. Get Your AdSense Publisher ID

1. Sign up for [Google AdSense](https://www.google.com/adsense/)
2. Get your Publisher ID (format: `ca-pub-xxxxxxxxxxxxxxx`)
3. Create ad units and get slot IDs for each placement

### 2. Configure Your Publisher ID

Replace `ca-pub-xxxxxxxxxxxxxxx` in the following files:

#### File: `app/layout.tsx`
```typescript
<Script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR-PUBLISHER-ID"
  crossOrigin="anonymous"
  strategy="afterInteractive"
/>
```

#### File: `components/AdSlot.tsx`
```typescript
data-ad-client="ca-pub-YOUR-PUBLISHER-ID"
```

### 3. Configure Ad Slot IDs

Update the slot IDs in each specialized ad component:

#### `components/ads/HomepageTopAd.tsx`
```typescript
slot="YOUR-SLOT-ID-1"  // Replace with your actual slot ID
```

#### `components/ads/InContentAd.tsx`
```typescript
slot="YOUR-SLOT-ID-2"  // Replace with your actual slot ID
```

#### `components/ads/SidebarAd.tsx`
```typescript
slot="YOUR-SLOT-ID-3"  // Replace with your actual slot ID
```

#### `components/ads/MobileStickyAd.tsx`
```typescript
slot="YOUR-SLOT-ID-4"  // Replace with your actual slot ID
```

## Available Ad Components

### 1. HomepageTopAd
Above-the-fold placement, appears after hero section.
- Format: Auto
- Width: Full-width, max-width 7xl
- Best for: Leaderboard (728x90) or large banner ads

### 2. InContentAd
Appears in the middle of blog feed (after 4th post).
- Format: Fluid
- Width: Full-width, max-width 4xl
- Best for: Content-aware ads that blend with blog posts

### 3. SidebarAd
Sticky sidebar ad (desktop only).
- Format: Vertical
- Position: Sticky (follows scroll)
- Best for: Skyscraper (160x600) or vertical rectangle ads

### 4. MobileStickyAd
Sticky bottom ad (mobile only, with close button).
- Format: Auto
- Position: Fixed bottom
- Best for: Mobile banner (320x50) or adaptive ads

## Using AdSlot Component

The base `AdSlot` component can be used anywhere:

```typescript
import AdSlot from '@/components/AdSlot';

<AdSlot
  id="custom-ad-1"
  slot="YOUR-SLOT-ID"
  format="auto"
  className="my-custom-classes"
/>
```

### Props:
- `id`: Unique identifier for tracking
- `slot`: AdSense slot ID from your ad unit
- `format`: Ad format - "auto", "fluid", "vertical", "horizontal"
- `className`: Additional Tailwind classes
- `style`: Additional inline styles

## Ad Placement Best Practices

### Strategic Placements:
1. **Homepage Top** - High visibility, captures immediate attention
2. **In-Content** - Natural integration after 4th post (non-intrusive)
3. **Sidebar** - Persistent visibility on desktop (sticky)
4. **Mobile Sticky** - High CTR on mobile (with close option for UX)

### Google AdSense Policy Compliance:
- Maximum 3 ads per page (currently implemented)
- Clear separation from content
- Responsive and mobile-friendly
- No placement that pushes content below fold
- Close button on mobile sticky ad for better UX

## CLS (Cumulative Layout Shift) Prevention

All ads have reserved space to prevent layout shift:

```css
.ad-slot {
  min-height: 250px;  /* Default */
}

.ad-slot[data-ad-format="vertical"] {
  min-height: 600px;  /* Sidebar ads */
}

.ad-slot[data-ad-format="horizontal"] {
  min-height: 90px;   /* Banner ads */
}

.ad-slot[data-ad-format="fluid"] {
  min-height: 280px;  /* In-content ads */
}
```

## Testing

1. **Development Mode**: Ads won't show on localhost
2. **Test Mode**: Use AdSense test mode before going live
3. **Production**: Deploy to your domain and wait for ads to appear (can take a few hours)

## AdSense Approval Tips

1. **Quality Content**: At least 15-20 quality blog posts
2. **Original Content**: No duplicate or scraped content
3. **Clear Navigation**: Easy-to-use menu and site structure
4. **About/Contact Pages**: Required by AdSense
5. **Privacy Policy**: Must include AdSense privacy policy
6. **Age**: Domain should be at least a few weeks old
7. **Traffic**: Some organic traffic helps (not required but recommended)

## Customization

### Change Ad Positions:
Edit `app/page.tsx` to move ad placements:

```typescript
<main>
  <Header />
  <HomepageTopAd />      {/* Move this line */}
  <BlogFeed />
  <MobileStickyAd />
</main>
```

### Add More Ad Units:
Create new components in `components/ads/` following the existing pattern.

### Modify Ad Formats:
Change the `format` prop in each component:
- `"auto"` - Responsive, adapts to container
- `"fluid"` - Blends with content
- `"vertical"` - Tall skyscraper format
- `"horizontal"` - Wide banner format

## Troubleshooting

### Ads not showing?
1. Check browser console for errors
2. Verify Publisher ID is correct
3. Ensure slot IDs match your AdSense ad units
4. Wait 24-48 hours after initial setup
5. Check AdSense account for policy violations

### Layout issues?
1. Adjust `.ad-slot` min-height in `globals.css`
2. Check for conflicting CSS
3. Test on different screen sizes

### Performance issues?
1. Script loads with `strategy="afterInteractive"` (optimal)
2. Ads use lazy loading
3. Reserved space prevents CLS
4. Mobile sticky has close button to improve UX

## Support

For AdSense-specific issues, visit:
- [Google AdSense Help Center](https://support.google.com/adsense)
- [AdSense Policy Center](https://support.google.com/adsense/answer/48182)

## Notes

- Replace all `ca-pub-xxxxxxxxxxxxxxx` with your actual Publisher ID
- Replace all placeholder slot IDs with real AdSense slot IDs
- Test thoroughly before deploying to production
- Monitor AdSense dashboard for performance metrics
