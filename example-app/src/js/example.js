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
        const resultDiv = document.getElementById("androidVersionResult") || createResultDiv("androidVersionResult");
        resultDiv.innerHTML = `
            <h3>Android Version Information:</h3>
            <p><strong>Version:</strong> ${versionInfo.version}</p>
            <p><strong>API Level:</strong> ${versionInfo.apiLevel}</p>
            <p><strong>Codename:</strong> ${versionInfo.codename}</p>
        `;
    } catch (error) {
        console.error('Error getting Android version:', error);
        const resultDiv = document.getElementById("androidVersionResult") || createResultDiv("androidVersionResult");
        resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}

// Stripe Terminal functions
window.initializeStripe = async () => {
    const publishableKey = document.getElementById("stripeKeyInput").value;
    const connectionToken = document.getElementById("connectionTokenInput").value;
    
    if (!publishableKey) {
        alert('Please enter a Stripe publishable key');
        return;
    }
    
    if (!connectionToken) {
        alert('Please enter a Stripe connection token');
        return;
    }
    
    try {
        const result = await DeviceVersion.initializeStripe({ 
            publishableKey: publishableKey,
            connectionToken: connectionToken,
            isTest: true 
        });
        
        const resultDiv = document.getElementById("stripeResult") || createResultDiv("stripeResult");
        resultDiv.innerHTML = `
            <h3>Stripe Initialization:</h3>
            <p style="color: green;"><strong>Success!</strong> Stripe Terminal initialized</p>
            <p><em>Note: You'll need a backend to provide connection tokens for full functionality</em></p>
        `;
    } catch (error) {
        console.error('Error initializing Stripe:', error);
        const resultDiv = document.getElementById("stripeResult") || createResultDiv("stripeResult");
        resultDiv.innerHTML = `<p style="color: red;">Error: ${error}</p>`;
    }
}

window.listStripeReaders = async () => {
    try {
        const result = await DeviceVersion.listReaders();
        console.log('Stripe Readers:', result);
        
        const resultDiv = document.getElementById("readersResult") || createResultDiv("readersResult");
        
        if (result.readers && result.readers.length > 0) {
            let readersHtml = '<h3>Available Readers:</h3>';
            result.readers.forEach(reader => {
                readersHtml += `
                    <div style="border: 1px solid #ddd; padding: 10px; margin: 5px 0; border-radius: 5px;">
                        <p><strong>ID:</strong> ${reader.id}</p>
                        <p><strong>Label:</strong> ${reader.label}</p>
                        <p><strong>Device Type:</strong> ${reader.deviceType}</p>
                        ${reader.serialNumber ? `<p><strong>Serial:</strong> ${reader.serialNumber}</p>` : ''}
                        ${reader.batteryLevel ? `<p><strong>Battery:</strong> ${reader.batteryLevel}%</p>` : ''}
                    </div>
                `;
            });
            resultDiv.innerHTML = readersHtml;
        } else {
            resultDiv.innerHTML = `
                <h3>No Readers Found</h3>
                <p>No Stripe Terminal readers were discovered.</p>
                <p><em>Make sure you have a compatible device with NFC enabled.</em></p>
            `;
        }
    } catch (error) {
        console.error('Error listing readers:', error);
        const resultDiv = document.getElementById("readersResult") || createResultDiv("readersResult");
        resultDiv.innerHTML = `<p style="color: red;">Error: ${error}</p>`;
    }
}

function createResultDiv(id) {
    const resultDiv = document.createElement('div');
    resultDiv.id = id;
    resultDiv.style.marginTop = '20px';
    resultDiv.style.padding = '10px';
    resultDiv.style.border = '1px solid #ccc';
    resultDiv.style.borderRadius = '5px';
    document.body.appendChild(resultDiv);
    return resultDiv;
}
