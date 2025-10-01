import { registerPlugin } from '@capacitor/core';

import type { DeviceVersionPlugin } from './definitions';

const DeviceVersion = registerPlugin<DeviceVersionPlugin>('DeviceVersion', {
  web: () => import('./web').then((m) => new m.DeviceVersionWeb()),
});

export * from './definitions';
export { DeviceVersion };
