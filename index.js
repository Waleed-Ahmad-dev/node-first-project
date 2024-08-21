let http = require('http');
let fs = require('node:fs/promises');
let url = require('node:url');

http.createServer(async function (req, res) {
    let url_ref = url.parse(req.url);
    let fileToServe = '.' + (url_ref.pathname === '/' ? '/index.html' : url_ref.pathname); // Serve index.html if root is requested

    try {
        let data = await fs.readFile(fileToServe);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
    } 
    catch (err) {
        console.error(err);
        res.writeHead(404, { 'Content-Type': 'text/html' });
    try {
        let notFound = await fs.readFile('./404.html');
        res.write(notFound);
        } 
    catch (err) {
        console.error(err);
        res.write('404 - Page Not Found'); // Fallback message if 404.html is not found
    }
    } 
    finally {
        res.end();
    } 
}).listen(8080);

console.log('Server is running on http://localhost:8080');