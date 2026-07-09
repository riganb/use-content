import React, { useMemo, useState } from 'react';
import type { ContentSchemas, ContentValues } from '../types';
import { theme } from './styles/theme';

interface ExportJsonButtonProps {
  schemas: ContentSchemas;
  values: ContentValues;
}

const buildExportPayload = (schemas: ContentSchemas, values: ContentValues) => {
  const payload: ContentValues = {};

  for (const [key, config] of Object.entries(schemas)) {
    payload[key] = values[key] !== undefined
      ? values[key]
      : config.initValue !== undefined
        ? config.initValue
        : '';
  }

  return payload;
};

const copyToClipboard = async (value: string) => {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
};

export const ExportJsonButton: React.FC<ExportJsonButtonProps> = ({ schemas, values }) => {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const json = useMemo(() => (
    JSON.stringify(buildExportPayload(schemas, values), null, 2)
  ), [schemas, values]);

  const handleCopy = async () => {
    try {
      await copyToClipboard(json);
      setStatus('copied');
      window.setTimeout(() => setStatus('idle'), 1600);
    } catch {
      setStatus('error');
      window.setTimeout(() => setStatus('idle'), 2200);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px',
        padding: '8px 10px',
        marginBottom: '10px',
        backgroundColor: theme.colors.bgSecondary,
        border: `2px solid ${theme.colors.border}`,
        borderRadius: '6px'
      }}
    >
      <div
        style={{
          color: theme.colors.textSecondary,
          fontSize: theme.typography.labelSize,
          fontWeight: 600,
          lineHeight: 1.3
        }}
      >
        {status === 'copied' ? 'Copied JSON' : status === 'error' ? 'Copy failed' : 'Export values'}
      </div>
      <button
        type="button"
        onClick={handleCopy}
        title="Copy formatted JSON"
        style={{
          backgroundColor: status === 'copied' ? theme.colors.accent : 'transparent',
          border: `2px solid ${status === 'error' ? theme.colors.danger : theme.colors.accent}`,
          borderRadius: '5px',
          color: status === 'copied' ? theme.colors.bgPrimary : theme.colors.textPrimary,
          cursor: 'pointer',
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.labelSize,
          fontWeight: 700,
          lineHeight: 1,
          padding: '7px 9px',
          transition: 'background-color 0.2s, border-color 0.2s, color 0.2s',
          whiteSpace: 'nowrap'
        }}
      >
        Copy JSON
      </button>
    </div>
  );
};
