import React from 'react';
import { theme } from '../styles/theme';

interface BooleanControlProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export const BooleanControl: React.FC<BooleanControlProps> = ({ label, value, onChange }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '14px',
        padding: '2px 0'
      }}
    >
      <label
        style={{
          fontSize: theme.typography.labelSize,
          color: theme.colors.textSecondary,
          fontWeight: 500,
          cursor: 'pointer',
          userSelect: 'none',
          flex: 1
        }}
        onClick={() => onChange(!value)}
      >
        {label}
      </label>

      {/* Sliding iOS-Style Track Widget Switch */}
      <div
        onClick={() => onChange(!value)}
        style={{
          width: '36px',
          height: '20px',
          borderRadius: '10px',
          backgroundColor: value ? theme.colors.accent : theme.colors.bgSecondary,
          border: `1px solid ${theme.colors.border}`,
          cursor: 'pointer',
          position: 'relative',
          transition: 'background-color 0.2s ease, border-color 0.2s ease',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)'
        }}
      >
        {/* Internal sliding white marble handle */}
        <div
          style={{
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            backgroundColor: theme.colors.textPrimary,
            position: 'absolute',
            top: '2px',
            left: value ? '18px' : '2px',
            transition: 'left 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.4)'
          }}
        />
      </div>
    </div>
  );
};
