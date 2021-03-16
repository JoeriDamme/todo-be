/* eslint-disable no-console */
import * as dotenv from 'dotenv';
import http from 'http';
import App from './app';
import ConfigReport from '@lib/config-reporter';
import { logger } from '@lib/logger';
import { initSequelize } from '@helpers/sequelize';
const log = logger.child({ method: 'server' });

dotenv.config();
const port: string|number = process.env.EXPRESS_PORT as string || 8081; // Default port to listen

(async () => {
  // Printing the loaded config settings.
  ConfigReport.printConfig({ logger: log });

  // Connecting with database.
  await initSequelize();

  // Starting the Express application.
  const app: App = new App();
  const server: http.Server = app.start();

  // Opening port to the outside world.
  server.listen(port);

  server.on('error', (error: any) => {
    if (error.syscall !== 'listen') {
      throw error;
    }

    switch (error.code) {
      case 'EACCES':
        log.error(`Port ${port} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        log.error(`Port ${port} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  });

  server.on('listening', () => log.info(`Server is running in process ${process.pid} listening on PORT ${port}. Visit /docs for REST API documentation.`));
})();

process.on('unhandledRejection', (error: Error) => {
  log.error('unhandledRejection', error.name, error.message, error.stack);
});
