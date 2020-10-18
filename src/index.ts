import app from './app';
import http from 'http';
import logger from './utils/logger';
import config from './utils/config';

const server = http.createServer(app);

server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
});
