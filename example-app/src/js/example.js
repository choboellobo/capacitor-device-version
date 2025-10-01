import { DeviceVersion } from 'devicename';

window.testEcho = () => {
    const inputValue = document.getElementById("echoInput").value;
    DeviceVersion.echo({ value: inputValue })
}

window.getAndroidVersion = async () => {
    try {
        const versionInfo = await DeviceVersion.getAndroidVersion();
        console.log('Android Version Info:', versionInfo);
        
        // Mostrar la información en la página
        const resultDiv = document.getElementById("androidVersionResult") || createResultDiv();
        resultDiv.innerHTML = `
            <h3>Android Version Information:</h3>
            <p><strong>Version:</strong> ${versionInfo.version}</p>
            <p><strong>API Level:</strong> ${versionInfo.apiLevel}</p>
            <p><strong>Codename:</strong> ${versionInfo.codename}</p>
        `;
    } catch (error) {
        console.error('Error getting Android version:', error);
        const resultDiv = document.getElementById("androidVersionResult") || createResultDiv();
        resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}

function createResultDiv() {
    const resultDiv = document.createElement('div');
    resultDiv.id = 'androidVersionResult';
    resultDiv.style.marginTop = '20px';
    resultDiv.style.padding = '10px';
    resultDiv.style.border = '1px solid #ccc';
    resultDiv.style.borderRadius = '5px';
    document.body.appendChild(resultDiv);
    return resultDiv;
}
