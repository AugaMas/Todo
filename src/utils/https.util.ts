import https from 'https';

function get(url: string | URL) {
    {
        return new Promise((resolve, reject) => {
            https.get(url, (res) => {
                let body = '';
                res.on('data', (chunk) => {
                    body += chunk;
                });

                res.on('end', () => {
                    try {
                        const json = JSON.parse(body);
                        resolve(json);
                    } catch (e) {
                        reject(e);
                    }
                });

                res.on('error', (err) => {
                    reject(err);
                });
            });
        });
    }
}

export default { get };
