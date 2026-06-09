import React from 'react';
import { theme } from '../styles/theme';

interface StringControlProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const StringControl: React.FC<StringControlProps> = ({ label, value, onChange }) => {
  return (
    <div style={{ marginBottom: '12px' }}>
      <label
        style={{
          display: 'block',
          fontSize: theme.typography.labelSize,
          color: theme.colors.textSecondary,
          marginBottom: '4px',
          fontWeight: 500
        }}
      >
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '6px 10px',
          backgroundColor: theme.colors.bgSecondary,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: '4px',
          color: theme.colors.textPrimary,
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.fontSize,
          outline: 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s'
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = theme.colors.accent;
          e.currentTarget.style.boxShadow = `0 0 0 2px ${theme.colors.border}`;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = theme.colors.border;
          e.currentTarget.style.boxShadow = 'none';
        }}
      />
    </div>
  );
};
