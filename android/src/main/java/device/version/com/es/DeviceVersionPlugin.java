package device.version.com.es;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "DeviceVersion")
public class DeviceVersionPlugin extends Plugin {

    private DeviceVersion implementation;

    @Override
    public void load() {
        super.load();
        implementation = new DeviceVersion(getContext());
    }

    @PluginMethod
    public void echo(PluginCall call) {
        String value = call.getString("value");

        JSObject ret = new JSObject();
        ret.put("value", implementation.echo(value));
        call.resolve(ret);
    }

    @PluginMethod
    public void getAndroidVersion(PluginCall call) {
        DeviceVersion.AndroidVersionInfo versionInfo = implementation.getAndroidVersion();
        
        JSObject ret = new JSObject();
        ret.put("version", versionInfo.version);
        ret.put("apiLevel", versionInfo.apiLevel);
        ret.put("codename", versionInfo.codename);
        call.resolve(ret);
    }

    @PluginMethod
    public void initializeStripe(PluginCall call) {
        String publishableKey = call.getString("publishableKey");
        String connectionToken = call.getString("connectionToken");
        Boolean isTest = call.getBoolean("isTest", false);
        
        if (publishableKey == null) {
            call.reject("publishableKey is required");
            return;
        }
        
        if (connectionToken == null) {
            call.reject("connectionToken is required");
            return;
        }

        DeviceVersion.StripeInitResult result = implementation.initializeStripe(publishableKey, connectionToken, isTest);
        
        JSObject ret = new JSObject();
        ret.put("success", result.success);
        ret.put("message", result.message);
        
        if (result.success) {
            call.resolve(ret);
        } else {
            call.reject(result.message);
        }
    }

    @PluginMethod
    public void listReaders(PluginCall call) {
        DeviceVersion.ReadersResult result = implementation.listReaders();
        
        JSObject ret = new JSObject();
        ret.put("success", result.success);
        ret.put("message", result.message);
        
        // Convertir lista de readers a JSArray
        JSArray readersArray = new JSArray();
        for (DeviceVersion.StripeReaderInfo reader : result.readers) {
            JSObject readerObj = new JSObject();
            readerObj.put("id", reader.id);
            readerObj.put("label", reader.label);
            readerObj.put("deviceType", reader.deviceType);
            readerObj.put("serialNumber", reader.serialNumber);
            readerObj.put("batteryLevel", reader.batteryLevel);
            readersArray.put(readerObj);
        }
        
        ret.put("readers", readersArray);
        
        if (result.success) {
            call.resolve(ret);
        } else {
            call.reject(result.message);
        }
    }
}
        call.resolve(ret);
    }
}
