const faker = require('faker');

const INTERVAL = 1000

const startDataInterval = sendFn => {
    const interval = setInterval(() => {
        const data = faker.random.number()
        sendFn(data)
    }, INTERVAL)
}

module.exports = startDataInterval