
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';

import { scheduleParserAgent } from './agents/schedule-parser';

export const mastra = new Mastra({
  agents: { scheduleParserAgent },
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
