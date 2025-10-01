import { DeviceVersion } from 'devicename';

window.testEcho = () => {
    const inputValue = document.getElementById("echoInput").value;
    DeviceVersion.echo({ value: inputValue })
}
