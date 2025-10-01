export interface AndroidVersionInfo {
  version: string;
  apiLevel: number;
  codename: string;
}

export interface StripeReader {
  id: string;
  label: string;
  deviceType: string;
  serialNumber?: string;
  batteryLevel?: number;
  isCharging?: boolean;
  availableUpdate?: boolean;
}

export interface StripeInitOptions {
  publishableKey: string;
  connectionToken: string;
  isTest?: boolean;
}

export interface DeviceVersionPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
  getAndroidVersion(): Promise<AndroidVersionInfo>;
  
  // Stripe Terminal methods
  initializeStripe(options: StripeInitOptions): Promise<{ success: boolean }>;
  listReaders(): Promise<{ readers: StripeReader[] }>;
}
