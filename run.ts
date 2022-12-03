const nodemon = require('nodemon');
nodemon({ script: './**/*.ts' })
  .on('start', console.clear)
  .on('restart', console.clear)
  .on('quit', () => {
    process.exit();
  });
