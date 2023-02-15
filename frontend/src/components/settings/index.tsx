import React from 'react';
import { Page } from 'components/common';
import {
  ProfileSettings,
  GameSettings,
  SecuritySettings,
  SettingsBlock,
} from './components';

const Settings: React.FC = () => (
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

export { Settings };
