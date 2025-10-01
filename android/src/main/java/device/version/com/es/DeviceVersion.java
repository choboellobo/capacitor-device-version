package device.version.com.es;

import android.content.Context;
import android.os.Build;
import com.getcapacitor.Logger;
import com.stripe.stripeterminal.Terminal;
import com.stripe.stripeterminal.callable.Callback;
import com.stripe.stripeterminal.callable.DiscoveryListener;
import com.stripe.stripeterminal.callable.ReaderListener;
import com.stripe.stripeterminal.model.external.ConnectionToken;
import com.stripe.stripeterminal.model.external.DiscoveryConfiguration;
import com.stripe.stripeterminal.model.external.DiscoveryMethod;
import com.stripe.stripeterminal.model.external.Reader;
import com.stripe.stripeterminal.model.external.TerminalException;
import java.util.List;
import java.util.ArrayList;

public class DeviceVersion {

    private Context context;
    private boolean isStripeInitialized = false;
    private List<Reader> discoveredReaders = new ArrayList<>();

    public DeviceVersion(Context context) {
        this.context = context;
    }

    public String echo(String value) {
        Logger.info("Echo", value);
        return value;
    }

    public AndroidVersionInfo getAndroidVersion() {
        AndroidVersionInfo versionInfo = new AndroidVersionInfo();
        versionInfo.version = Build.VERSION.RELEASE;
        versionInfo.apiLevel = Build.VERSION.SDK_INT;
        versionInfo.codename = Build.VERSION.CODENAME;
        return versionInfo;
    }

    public StripeInitResult initializeStripe(String publishableKey, String connectionToken, boolean isTest) {
        StripeInitResult result = new StripeInitResult();
        
        try {
            if (!Terminal.isInitialized()) {
                // Token provider que usa el token proporcionado desde el frontend
                Terminal.TokenProvider tokenProvider = new Terminal.TokenProvider() {
                    @Override
                    public void fetchConnectionToken(Callback callback) {
                        try {
                            // Usar el token proporcionado desde el frontend
                            ConnectionToken token = ConnectionToken.fromString(connectionToken);
                            callback.onSuccess(token);
                        } catch (Exception e) {
                            callback.onFailure(new TerminalException(
                                TerminalException.TerminalErrorCode.UNEXPECTED_SDK_ERROR,
                                "Invalid connection token: " + e.getMessage(),
                                null,
                                null
                            ));
                        }
                    }
                };

                Terminal.initTerminal(context, tokenProvider, new ReaderListener() {
                    @Override
                    public void onReaderConnectionStatusChange(Terminal.ConnectionStatus status) {
                        Logger.info("StripeTerminal", "Connection status: " + status.toString());
                    }
                });
                
                isStripeInitialized = true;
                result.success = true;
                result.message = "Stripe Terminal initialized successfully";
            } else {
                result.success = true;
                result.message = "Stripe Terminal already initialized";
            }
        } catch (Exception e) {
            result.success = false;
            result.message = "Failed to initialize Stripe Terminal: " + e.getMessage();
            Logger.error("StripeTerminal", "Initialization failed", e);
        }
        
        return result;
    }

    public ReadersResult listReaders() {
        ReadersResult result = new ReadersResult();
        
        if (!isStripeInitialized || !Terminal.isInitialized()) {
            result.success = false;
            result.message = "Stripe Terminal not initialized";
            result.readers = new ArrayList<>();
            return result;
        }

        try {
            // Configuración para descubrir lectores Tap to Pay
            DiscoveryConfiguration config = new DiscoveryConfiguration.Builder()
                .discoveryMethod(DiscoveryMethod.TAP_TO_PAY)
                .build();

            Terminal.getInstance().discoverReaders(config, new DiscoveryListener() {
                @Override
                public void onUpdateDiscoveredReaders(List<Reader> readers) {
                    discoveredReaders = readers;
                    Logger.info("StripeTerminal", "Discovered " + readers.size() + " readers");
                }
            }, new Callback() {
                @Override
                public void onSuccess() {
                    Logger.info("StripeTerminal", "Reader discovery completed successfully");
                }

                @Override
                public void onFailure(TerminalException e) {
                    Logger.error("StripeTerminal", "Reader discovery failed", e);
                }
            });

            // Convertir readers a formato simple
            List<StripeReaderInfo> readerInfos = new ArrayList<>();
            for (Reader reader : discoveredReaders) {
                StripeReaderInfo info = new StripeReaderInfo();
                info.id = reader.getId();
                info.label = reader.getLabel();
                info.deviceType = reader.getDeviceType().toString();
                info.serialNumber = reader.getSerialNumber();
                
                if (reader.getBatteryLevel() != null) {
                    info.batteryLevel = (int) (reader.getBatteryLevel() * 100);
                }
                
                readerInfos.add(info);
            }

            result.success = true;
            result.readers = readerInfos;
            result.message = "Found " + readerInfos.size() + " readers";
            
        } catch (Exception e) {
            result.success = false;
            result.message = "Failed to list readers: " + e.getMessage();
            result.readers = new ArrayList<>();
            Logger.error("StripeTerminal", "List readers failed", e);
        }
        
        return result;
    }

    // Clases auxiliares
    public static class AndroidVersionInfo {
        public String version;
        public int apiLevel;
        public String codename;
    }

    public static class StripeInitResult {
        public boolean success;
        public String message;
    }

    public static class StripeReaderInfo {
        public String id;
        public String label;
        public String deviceType;
        public String serialNumber;
        public int batteryLevel;
    }

    public static class ReadersResult {
        public boolean success;
        public String message;
        public List<StripeReaderInfo> readers;
    }
}
}
