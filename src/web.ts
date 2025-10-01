import { WebPlugin } from '@capacitor/core';

import type { DeviceVersionPlugin } from './definitions';

export class DeviceVersionWeb extends WebPlugin implements DeviceVersionPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
