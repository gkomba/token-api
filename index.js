const express = require('express');
const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 3000;

// Permite receber JSON
app.use(express.json());

// A CHAVE TEM QUE SER IDENTICA À DO APP
const SECRET_KEY = Buffer.from("mR7tP3xL9sQ2vY1z"); // 16, 24 ou 32 bytes

// Função para descriptografar AES-ECB
function decrypt(token) {
    try {
        const encryptedBytes = Buffer.from(token, 'base64');

        const decipher = crypto.createDecipheriv('aes-128-ecb', SECRET_KEY, null);
        // ECB não usa IV
        decipher.setAutoPadding(true);

        let decrypted = decipher.update(encryptedBytes);
        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return decrypted.toString('utf8');
    } catch (err) {
        return null;
    }
}

// Rota raiz
app.get('/', (req, res) => {
    res.send('API ONLINE');
});

// Rota /validate
app.post('/validate', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.json({ valid: 0 });
    }

    const decrypted = decrypt(token);

    if (!decrypted) {
        return res.json({ valid: 0 });
    }

    console.log('DECRYPTED:', decrypted);
    return res.json({ valid: 1 });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});