import React from 'react';
import { FieldList } from './FieldList';
import { PanelContainer } from './PanelContainer';

export const Panel: React.FC = () => {
  return (
    <PanelContainer>
      <FieldList />
    </PanelContainer>
  );
};
