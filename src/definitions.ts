export interface DeviceVersionPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
