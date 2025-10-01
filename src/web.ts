import { WebPlugin } from '@capacitor/core';

import type { DeviceVersionPlugin, AndroidVersionInfo, StripeInitOptions, StripeReader } from './definitions';

export class DeviceVersionWeb extends WebPlugin implements DeviceVersionPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }

  async getAndroidVersion(): Promise<AndroidVersionInfo> {
    throw new Error('getAndroidVersion is not available on web platform. This method only works on Android devices.');
  }

  async initializeStripe(_options: StripeInitOptions): Promise<{ success: boolean }> {
    throw new Error('Stripe Terminal is not available on web platform. This method only works on Android devices with NFC capability.');
  }

  async listReaders(): Promise<{ readers: StripeReader[] }> {
    throw new Error('Stripe Terminal readers are not available on web platform. This method only works on Android devices with NFC capability.');
  }
}
