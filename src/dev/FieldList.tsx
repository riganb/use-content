import React from 'react';
import { useContentContext } from '../core/ContentContext';
import { BooleanControl } from './Controls/BooleanControl';
import { NumberControl } from './Controls/NumberControl';
import { StringControl } from './Controls/StringControl';
import { theme } from './styles/theme';

export const FieldList: React.FC = () => {
  // 1. Grab schemas and current values from our global dev context
  const { schemas, values, updateValue } = useContentContext();

  // Convert the registered schemas object into an iterable array
  const schemaEntries = Object.entries(schemas);

  // 2. High-Fidelity Empty State Check
  if (schemaEntries.length === 0) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
          color: theme.colors.textSecondary,
          padding: '40px 10px',
          fontFamily: theme.typography.fontFamily,
        }}
      >
        <div style={{ fontSize: '24px', marginBottom: '12px' }}>🔍</div>
        <div style={{ fontSize: theme.typography.titleSize, fontWeight: 600, color: theme.colors.textPrimary, marginBottom: '6px' }}>
          No Fields Registered
        </div>
        <p style={{ fontSize: theme.typography.fontSize, fontWeight: 500, margin: 0, lineHeight: '1.4', maxWidth: '240px' }}>
          Use the <code style={{ color: theme.colors.accent, backgroundColor: theme.colors.bgSecondary, padding: '2px 4px', borderRadius: '4px', fontWeight: 600 }}>useContent</code> hook in your components to see them appear here live.
        </p>
      </div>
    );
  }

  // 3. Render and Route Registered Controls List
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {schemaEntries.map(([key, config]) => {
        const currentValue = values[key];

        // Route dynamically based on the configuration type
        switch (config.type) {
          case 'string':
            return (
              <StringControl
                key={key}
                label={config.label || key}
                value={typeof currentValue === 'string' ? currentValue : (config.initValue as string)}
                onChange={(newValue) => updateValue(key, newValue)}
              />
            );

          case 'number':
            return (
              <NumberControl
                key={key}
                label={config.label || key}
                value={typeof currentValue === 'number' ? currentValue : (config.initValue as number)}
                onChange={(newValue) => updateValue(key, newValue)}
              />
            );

          case 'boolean':
            return (
              <BooleanControl
                key={key}
                label={config.label || key}
                value={typeof currentValue === 'boolean' ? currentValue : (config.initValue as boolean)}
                onChange={(newValue) => updateValue(key, newValue)}
              />
            );

          default:
            // Fail-safe graceful fallback for unsupported structural types
            return (
              <div
                key={key}
                style={{
                  fontSize: theme.typography.fontSize,
                  fontWeight: 500,
                  color: theme.colors.danger,
                  padding: '8px 0',
                  borderBottom: `4px dashed ${theme.colors.border}`
                }}
              >
                ⚠️ Unknown field type: {(config as any).type} for key "{key}"
              </div>
            );
        }
      })}
    </div>
  );
};
