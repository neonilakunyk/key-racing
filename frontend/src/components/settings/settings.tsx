import React from 'react';
import { Page } from 'components/common/common';
import {
  ProfileSettings,
  GameSettings,
  SecuritySettings,
  SettingsBlock,
} from './components/components';

export const Settings: React.FC = () => (
  <Page heading="Settings">
    <SettingsBlock title="Profile">
      <ProfileSettings />
    </SettingsBlock>
    <hr />
    <SettingsBlock title="Game">
      <GameSettings />
    </SettingsBlock>
    <hr />
    <SettingsBlock title="Security">
      <SecuritySettings />
    </SettingsBlock>
  </Page>
);
