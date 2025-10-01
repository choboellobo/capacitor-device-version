export interface AndroidVersionInfo {
  version: string;
  apiLevel: number;
  codename: string;
}

export interface DeviceVersionPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
  getAndroidVersion(): Promise<AndroidVersionInfo>;
}
