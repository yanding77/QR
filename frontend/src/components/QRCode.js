import React, { useEffect, useState } from 'react';

const QRCode = () => {
    const [qrCode, setQRCode] = useState('');
    useEffect(() => {
        fetch('http://192.168.120.104:5001/generate-qr')
        .then(response => response.json())
        .then(data => setQRCode(data.qrCode));
    }, []);
    return (
        <div>
            <h2>Scan to Order</h2>
            {qrCode ? (
                <img src = {qrCode} alt="QR Code"/>
            ) : (
                <p>Loading QR Code</p>
            )}
        </div>
    );
};

export default QRCode;