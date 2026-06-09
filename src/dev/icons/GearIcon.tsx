import React from 'react';
import { theme } from '../styles/theme';

interface GearIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const GearIcon: React.FC<GearIconProps> = ({ size = 24, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 500 500"
      {...props}
    >
      <defs>
        {/* Dynamic linear gradient utilizing our theme's pastel accent tones */}
        <linearGradient id="gearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={theme.colors.textPrimary} />
          <stop offset="100%" stopColor={theme.colors.accent} />
        </linearGradient>

        {/* The primary outermost cog layout geometry */}
        <path
          id="cogTeeth"
          d="M230 20h40l5 40h-50Zm117.68 20.814 34.64 20-15.67 37.141-43.3-25Zm91.506 76.866 20 34.64-32.141 24.33-25-43.3ZM480 230v40l-40 5v-50Zm-20.814 117.68-20 34.64-37.141-15.67 25-43.3Zm-76.866 91.506-34.64 20-24.33-32.141 43.3-25ZM270 480h-40l-5-40h50Zm-117.68-20.814-34.64-20 15.67-37.141 43.3 25ZM60.814 382.32l-20-34.64 32.141-24.33 25 43.3ZM20 270v-40l40-5v50Zm20.814-117.68 20-34.64 37.141 15.67-25 43.3Zm76.866-91.506 34.64-20 24.33 32.141-43.3 25Z"
          fill={theme.colors.accent}
        />
      </defs>

      {/* Render layers */}
      <use href="#cogTeeth" />

      {/* Layer 2: Outermost housing rim */}
      <circle cx="250" cy="250" r="210" fill={theme.colors.accent} />

      {/* Layer 3: Secondary outer collar casing */}
      <circle cx="250" cy="250" r="170" fill={theme.colors.border} />

      {/* Layer 4: Deep centralized core backing */}
      <circle cx="250" cy="250" r="125" fill={theme.colors.bgPrimary} />

      {/* Layer 5: Decorative custom side wing blades */}
      <path d="M250 250 150 150a135 135 0 0 0 0 200Z" fill="url(#gearGradient)" />
      <path d="m250 250 100-100a135 135 0 0 1 0 200Z" fill="url(#gearGradient)" />
    </svg>
  );
};
