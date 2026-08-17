// DevBlock Sentinel SDK — auto-injected by DevBlock Console
import { DSentinel } from '@devblock/sentinel';

const sentinel = new DSentinel({
  apiKey: 'dbk_8a404060cf184c709e38c0d4',
  serverUrl: 'https://devblock-console-server.devblocktechnologies.workers.dev',
  debug: process.env.NODE_ENV !== 'production',
});

// Auto-start — logs begin streaming immediately
sentinel.start();

// Track app lifecycle
sentinel.info('Application started', {
  project: 'Eti Yoruba Asr',
  environment: 'DEVELOPMENT'
});

// Export for manual use throughout your app
export { sentinel };
export default sentinel;
