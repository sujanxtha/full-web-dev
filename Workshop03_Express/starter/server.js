const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, 'public');

app.use(express.static(publicDirectory, { index: false }));

app.get('/', (req, res) => {
    res.sendFile(path.join(publicDirectory, 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(publicDirectory, 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(publicDirectory, 'contact.html'));
});

const apiRouter = express.Router();

apiRouter.get('/time', (req, res) => {
    const now = new Date();

    res.json({
        datetime: now.toISOString(),
        timestamp: now.getTime()
    });
});

apiRouter.get('/info', (req, res) => {
    res.json({
        name: 'Workshop03 Express Server',
        version: '1.0.0',
        nodeVersion: process.version
    });
});

app.use('/api', apiRouter);


app.use((req, res) => {
    res.status(404).sendFile(path.join(publicDirectory, '404.html'));
});

app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);

    if (res.headersSent) {
        return next(err);
    }

    res.status(500).sendFile(
        path.join(publicDirectory, '500.html'),
        (fileError) => {
            if (fileError) {
                next(fileError);
            }
        }
    );
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Available routes:');
    console.log('GET /');
    console.log('GET /about');
    console.log('GET /contact');
    console.log('GET /api/time');
    console.log('GET /api/info');
    console.log('Press Ctrl+C to stop the server.');
});