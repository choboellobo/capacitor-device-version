import { WebPlugin } from '@capacitor/core';

import type { DeviceVersionPlugin, AndroidVersionInfo } from './definitions';

export class DeviceVersionWeb extends WebPlugin implements DeviceVersionPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }

  async getAndroidVersion(): Promise<AndroidVersionInfo> {
    throw new Error('getAndroidVersion is not available on web platform. This method only works on Android devices.');
  }
}
