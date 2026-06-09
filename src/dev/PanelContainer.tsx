import React, { useEffect, useState } from 'react';
import { GearIcon } from './icons/GearIcon';
import { theme } from './styles/theme';

interface PanelContainerProps {
  children: React.ReactNode;
}

type ActiveTab = 'values' | 'settings';

export const PanelContainer: React.FC<PanelContainerProps> = ({ children }) => {
  // 1. Initialize states from localStorage or use defaults
  const [isExpanded, setIsExpanded] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('__use_content_expanded__');
      return saved !== null ? JSON.parse(saved) : false;
    }
    return false;
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('values');
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Detect viewport size for responsive layout routing
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 2. Synchronize layout configurations with local storage state
  useEffect(() => {
    localStorage.setItem('__use_content_expanded__', JSON.stringify(isExpanded));
  }, [isExpanded]);

  // 4. Toggle panel expansion state cleanly
  const toggleExpand = () => setIsExpanded((prev) => !prev);

  // 5. Shared UI Trigger Badge (Collapsed State)
  if (!isExpanded) {
    return (
      <button
        onClick={toggleExpand}
        title="Open Content Editor Panel"
        style={{
          position: 'fixed',
          // Anchored safely to the top right corner by default on desktop, bottom right on mobile
          right: isMobile ? '20px' : '24px',
          top: isMobile ? 'auto' : '24px',
          bottom: isMobile ? '20px' : 'auto',
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          backgroundColor: theme.colors.bgPrimary,
          border: `2px solid ${theme.colors.border}`,
          boxShadow: theme.effects.shadow,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,
          transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.2s ease',
          outline: 'none',
          padding: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.08) rotate(15deg)';
          e.currentTarget.style.borderColor = theme.colors.accent;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
          e.currentTarget.style.borderColor = theme.colors.border;
        }}
      >
        <GearIcon size={30} />
      </button>
    );
  }

  // 6. Detailed Blueprint Canvas Layout (Expanded State)
  return (
    <div
      style={{
        position: 'fixed',
        // Responsive Viewport Rules: Centered overlay on mobile, fixed corner anchor on desktop
        right: isMobile ? '50%' : '24px',
        top: isMobile ? '50%' : '24px',
        transform: isMobile ? 'translate(50%, -50%)' : 'none',
        width: isMobile ? '85vw' : '340px',
        height: isMobile ? '80vh' : 'auto',
        maxHeight: isMobile ? '80vh' : 'calc(100vh - 48px)',
        backgroundColor: theme.colors.bgPrimary,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.effects.radius,
        boxShadow: theme.effects.shadow,
        backdropFilter: theme.effects.backdropBlur,
        fontFamily: theme.typography.fontFamily,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 99999,
        overflow: 'hidden',
        color: theme.colors.textPrimary,
      }}
    >
      {/* Upper Header Row */}
      <div
        style={{
          padding: '12px 14px 0px 14px',
          backgroundColor: theme.colors.bgSecondary,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <GearIcon size={16} />
            <span style={{ fontSize: theme.typography.titleSize, fontWeight: 600, letterSpacing: '0.5px' }}>
              useContent <span style={{ color: theme.colors.accent, fontSize: '10px' }}>DEV</span>
            </span>
          </div>

          {/* Simple Collapse Close Anchor Control */}
          <button
            onClick={toggleExpand}
            title="Minimize Panel"
            style={{
              background: 'none',
              border: 'none',
              color: theme.colors.textSecondary,
              fontSize: '14px',
              cursor: 'pointer',
              padding: '2px 6px',
              borderRadius: '4px',
              transition: 'background-color 0.2s, color 0.2s',
              lineHeight: 1,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.colors.border;
              e.currentTarget.style.color = theme.colors.danger;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = theme.colors.textSecondary;
            }}
          >
            ✕
          </button>
        </div>

        {/* Tab Selection Sub-Navigation Bar */}
        <div style={{ display: 'flex', gap: '4px', borderBottom: `1px solid ${theme.colors.border}` }}>
          <button
            onClick={() => setActiveTab('values')}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              borderBottom: `2px solid ${activeTab === 'values' ? theme.colors.accent : 'transparent'}`,
              color: activeTab === 'values' ? theme.colors.textPrimary : theme.colors.textSecondary,
              padding: '6px 0',
              cursor: 'pointer',
              fontFamily: theme.typography.fontFamily,
              fontSize: theme.typography.labelSize,
              fontWeight: activeTab === 'values' ? 600 : 400,
              transition: 'color 0.2s'
            }}
          >
            Fields
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              borderBottom: `2px solid ${activeTab === 'settings' ? theme.colors.accent : 'transparent'}`,
              color: activeTab === 'settings' ? theme.colors.textPrimary : theme.colors.textSecondary,
              padding: '6px 0',
              cursor: 'pointer',
              fontFamily: theme.typography.fontFamily,
              fontSize: theme.typography.labelSize,
              fontWeight: activeTab === 'settings' ? 600 : 400,
              transition: 'color 0.2s'
            }}
          >
            Settings
          </button>
        </div>
      </div>

      {/* Main Core Form Inputs Window Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px' }}>
        {activeTab === 'values' ? (
          children
        ) : (
          <div
            style={{
              display: 'flex',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.colors.textSecondary,
              fontSize: theme.typography.fontSize,
              fontStyle: 'italic',
              textAlign: 'center',
              padding: '20px 0'
            }}
          >
            ⚠️ PANEL SETTINGS <br /> UNDER CONSTRUCTION
          </div>
        )}
      </div>
    </div>
  );
};
