export const theme = {
  colors: {
    // Deep twilight background (not pitch black, not slate gray)
    bgPrimary: '#1a1625',
    // Slightly lighter purple-gray for cards, inputs, and rows
    bgSecondary: '#262135',
    // Muted border lines to separate sections crisply
    border: '#3b3254',

    // Primary text - crisp off-white/lavender tint
    textPrimary: '#f3f0f7',
    // Secondary text - muted pastel lavender for labels and types
    textSecondary: '#a89fc1',

    // Branding and Accent - vibrant pastel violet for toggles, focus rings, and active badges
    accent: '#9d7bf4',
    // Hover state for interactive buttons
    accentHover: '#b399f7',

    // Clean danger indicator for reset buttons or errors
    danger: '#ff7597'
  },
  typography: {
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    fontSize: '12px',
    labelSize: '11px',
    titleSize: '13px'
  },
  effects: {
    backdropBlur: 'blur(8px)',
    shadow: '0 8px 32px 0 rgba(10, 7, 16, 0.5)',
    radius: '8px'
  }
} as const;

export type Theme = typeof theme;
