//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
require('./src/db.js');
const { PORT } = require('./src/utils/config.js');
const server = require('./app.js');
const { conn } = require('./src/db.js');
const { PORT } = process.env;
const logger = require('./src/utils/logger.js');

const port = PORT || 3001;

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(port, () => {
    logger.info(`%s listening at ${port}`); // eslint-disable-line no-console
  });
});
