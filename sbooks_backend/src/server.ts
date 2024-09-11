import Application from './application';

/**
 * Run the server
 */
const start = async () => {
  const application = new Application()
  await application.init() 
};

start();