const init = require('./src')

setInterval(() => console.log('PING'), 3000)

setTimeout(init, 2000)