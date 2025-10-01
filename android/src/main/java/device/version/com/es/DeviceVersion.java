package device.version.com.es;

import android.os.Build;
import com.getcapacitor.Logger;

public class DeviceVersion {

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

    public static class AndroidVersionInfo {
        public String version;
        public int apiLevel;
        public String codename;
    }
}
