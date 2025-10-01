# Capacitor Device Version Plugin

Un plugin de Capacitor que proporciona información detallada sobre la versión de Android del dispositivo.

## Instalación

```bash
npm install capacitor-device-version
npx cap sync
```

## Uso

```typescript
import { DeviceVersion } from 'capacitor-device-version';

// Obtener información de la versión de Android
try {
  const versionInfo = await DeviceVersion.getAndroidVersion();
  console.log('Versión de Android:', versionInfo.version);      // ej: "14"
  console.log('Nivel de API:', versionInfo.apiLevel);           // ej: 34
  console.log('Nombre código:', versionInfo.codename);          // ej: "REL"
} catch (error) {
  console.error('Error:', error.message);
  // Este error aparecerá en plataformas que no sean Android
}
```

## Compatibilidad

- ✅ **Android**: Funcionalidad completa
- ❌ **iOS**: No disponible (lanza error)
- ❌ **Web**: No disponible (lanza error)

## API

<docgen-index>

* [`echo(...)`](#echo)
* [`getAndroidVersion()`](#getandroidversion)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### echo(...)

```typescript
echo(options: { value: string; }) => Promise<{ value: string; }>
```

| Param         | Type                            |
| ------------- | ------------------------------- |
| **`options`** | <code>{ value: string; }</code> |

**Returns:** <code>Promise&lt;{ value: string; }&gt;</code>

--------------------


### getAndroidVersion()

```typescript
getAndroidVersion() => Promise<AndroidVersionInfo>
```

**Returns:** <code>Promise&lt;<a href="#androidversioninfo">AndroidVersionInfo</a>&gt;</code>

--------------------


### Interfaces


#### AndroidVersionInfo

| Prop           | Type                |
| -------------- | ------------------- |
| **`version`**  | <code>string</code> |
| **`apiLevel`** | <code>number</code> |
| **`codename`** | <code>string</code> |

</docgen-api>

## Ejemplo

Puedes ver un ejemplo completo en la carpeta `example-app` de este repositorio.

## Desarrollo

Para contribuir o modificar este plugin:

```bash
# Clonar el repositorio
git clone https://github.com/choboellobo/capacitor-device-version.git
cd capacitor-device-version

# Instalar dependencias
npm install

# Compilar el plugin
npm run build

# Probar en la aplicación de ejemplo
cd example-app
npm install
npx cap sync android
npx cap run android
```
