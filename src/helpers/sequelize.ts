import { Sequelize } from 'sequelize';
import { logger } from '@lib/logger';
export const sequelize = new Sequelize('sqlite::memory:', {
  logging: false,
  storage: './database.sqlite'
});

export async function initSequelize(): Promise<void> {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    logger.debug('Connected with database.');
  } catch (error) {
    logger.error(`Error connecting to database: ${error.message}`);
  }
}
