var NODE_ENV = process.env.NODE_ENV,
  PROD = 'prod',
  DEV = 'dev',
  CURRENT_CONFIG;

if (NODE_ENV === PROD) {
  CURRENT_CONFIG = require('./config-prod');
} else if(NODE_ENV === DEV){
  CURRENT_CONFIG = require('./config-dev');
}else{
  CURRENT_CONFIG = require('./config-local');

}
module.exports = CURRENT_CONFIG;
