const coreConfig = require('./core')
const startInterval = require('./faker')
const {Client, topics, Producer} = coreConfig

function startProducer() {
    const producer = new Producer(Client)

    producer.on('ready', _ => {
        const sendFn = data => producer.send(topics.map(t => ({...t, message: data})), () => console.log(`${data} had sent`))
        startInterval(sendFn)
    })
}

module.exports = startProducer