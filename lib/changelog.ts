export const CHANGELOG_ENTRIES = [
  {
    id: '2025-11-24',
    date: 'Nov 24, 2025',
    readTime: '2 min read',
    image: '/images/changelog/2025-11-24.svg',
    title: '150+ Landing sections, AI & Crypto templates, and AlignUI 2.0',
    description:
      'Exciting update: AlignUI 2.0 introduces AI & Crypto Templates, 150+ landing sections, improved variables, and new visual refinements.',
    content: `
## 150+ Landing sections, AI & Crypto templates, and AlignUI 2.0

We're excited to announce AlignUI 2.0! This major update brings significant improvements to help you build beautiful, professional interfaces faster.

### New in this release

**150+ Landing Sections**
- Expanded collection of pre-built landing sections
- Covering diverse use cases from SaaS to e-commerce
- All components fully customizable

**AI & Crypto Templates**
- New AI-focused template designs
- Crypto and blockchain industry templates
- Ready-to-use layouts for modern applications

**Improved Variables**
- Enhanced design token system
- Better consistency across components
- Easier theming and customization

**Visual Refinements**
- Polished component aesthetics
- Improved spacing and typography
- Better dark mode support
    `,
  },
  {
    id: '2025-03-24',
    date: 'Mar 24, 2025',
    readTime: '2 min read',
    image: '/images/changelog/2025-03-24.svg',
    title: 'Neutral Gray, Marketing & Sales Template, and AlignUI 1.1',
    description:
      'Exciting news: AlignUI brings Neutral Gray, synchronized Figma-React integration, new blocks, Marketing & Sales Template, and enhanced components.',
    content: `
## Neutral Gray, Marketing & Sales Template, and AlignUI 1.1

AlignUI 1.1 is here with powerful new features for design and development teams.

### Highlights

**Neutral Gray Palette**
- New neutral gray color system
- Improved accessibility and contrast
- Consistent across all components

**Figma-React Integration**
- Synchronized design and code
- Seamless handoff between teams
- Reduced development time

**Marketing & Sales Template**
- Complete template for marketing teams
- Sales-focused sections and layouts
- Conversion-optimized components

**Enhanced Components**
- New blocks and patterns
- Improved documentation
- Better developer experience
    `,
  },
  {
    id: '2024-04-01',
    date: 'Apr 01, 2024',
    readTime: '3 min read',
    image: '/images/changelog/2024-04-01.svg',
    title: 'Dark Mode, Variable, and AlignUI 1.0',
    description:
      "Exciting news: AlignUI now has 500+ users! We're working on new features, including dark mode and sector-specific products.",
    content: `
## Dark Mode, Variable, and AlignUI 1.0

Welcome to AlignUI 1.0! We're thrilled to reach 500+ users and want to thank our community for the amazing support.

### What's New

**Dark Mode**
- Full dark mode support across all components
- Smooth theme transitions
- Optimized for low-light environments

**Design Variables**
- CSS custom properties for easy theming
- Consistent design tokens
- Flexible customization options

**Sector-Specific Products**
- Templates for different industries
- Tailored components for specific use cases
- More coming soon!

**Thank You**
- 500+ users and growing
- Your feedback shapes our roadmap
- Join our community to stay updated
    `,
  },
] as const;

export type ChangelogId = (typeof CHANGELOG_ENTRIES)[number]['id'];
