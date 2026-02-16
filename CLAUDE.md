# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Capacitor plugin (`capacitor-device-version`) that provides two main features:
1. **Android Version Information**: Returns Android version, API level, and codename
2. **Stripe Terminal Integration**: Supports Stripe Terminal SDK with Tap to Pay functionality for Android

The plugin is primarily focused on Android functionality. iOS and Web implementations throw errors as these platforms are not supported for the main features.

## Architecture

### TypeScript Layer (`src/`)
- `definitions.ts`: Defines plugin interfaces and TypeScript types
- `index.ts`: Exports the plugin instance
- `web.ts`: Web implementation that throws "not implemented" errors

### Android Layer (`android/`)
- `DeviceVersionPlugin.java`: Capacitor plugin bridge that handles method calls from JS and delegates to implementation
- `DeviceVersion.java`: Core implementation containing:
  - Android version detection using `Build.VERSION.*` APIs
  - Stripe Terminal SDK initialization with token provider
  - Reader discovery for Tap to Pay devices (uses `DiscoveryMethod.TAP_TO_PAY`)
- **Dependencies**: Stripe Terminal SDK 3.8.0 and Stripe Android SDK 20.43.0 (configured in `build.gradle`)

### iOS Layer (`ios/`)
- Placeholder implementations that throw "not implemented" errors
- Swift files are present but functionality is not implemented

## Build Commands

### Build the plugin
```bash
npm run build
```
This compiles TypeScript, generates documentation via docgen, and bundles with Rollup.

### Verify all platforms
```bash
npm run verify
```
Runs verification for iOS, Android, and Web. Individual platform verification:
- `npm run verify:ios` - Builds iOS with xcodebuild
- `npm run verify:android` - Runs `./gradlew clean build test` in android directory
- `npm run verify:web` - Runs build

### Lint and format
```bash
npm run lint    # Check code quality (ESLint, Prettier, SwiftLint)
npm run fmt     # Auto-fix issues
```

### Generate documentation
```bash
npm run docgen
```
Updates README.md API section and generates dist/docs.json.

### Testing with example app
```bash
cd example-app
npm install
npx cap sync android
npx cap run android
```

## Development Notes

### Plugin Method Pattern
All plugin methods follow the Capacitor pattern:
1. TypeScript interface in `definitions.ts` defines the contract
2. Android implementation in `DeviceVersion.java` contains business logic
3. `DeviceVersionPlugin.java` bridges JS calls to implementation using `@PluginMethod` annotations

### Stripe Terminal Implementation
- Initialization requires `publishableKey` and `connectionToken` from frontend
- Token provider uses the connection token passed from JavaScript (not fetched from backend)
- Reader discovery is asynchronous - callbacks update the `discoveredReaders` list
- Only supports `DiscoveryMethod.TAP_TO_PAY` for reader discovery

### Platform Support Strategy
This plugin explicitly only supports Android for its main functionality. iOS and Web implementations intentionally throw errors with clear messages indicating platform is not supported.

### Java Version
The Android module requires Java 21 (see `compileOptions` in build.gradle).
