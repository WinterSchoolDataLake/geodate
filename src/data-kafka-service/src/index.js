const kafka = require('kafka-node')
const faker = require('faker')

// CONSTANTS
const TOPIC_NAME = "geodata"
const DEFAULT_TOPIC = { topic: TOPIC_NAME, partitions: 1, replicationFactor: 1}

// CORE
const Client = new kafka.KafkaClient({kafkaHost: 'localhost:9092'})
const Consumer = kafka.Consumer
const Producer = kafka.Producer

function createTopics() {
    Client.createTopics([{...DEFAULT_TOPIC}], (err, res) => (!err && res) && console.log('Topics was created success'))
}


// CONSUMER
function setupConsumer() {
    const consumer = new Consumer(Client, [DEFAULT_TOPIC], {})
    consumer.on('message', message => console.log(`message ${message.value} was received`))
}

// PRODUCER
function startProducer() {
    const producer = new Producer(Client)

    const getRandomRecord = () => ({
        id: faker.random.number(),
        lnd: faker.address.longitude(),
        ltd: faker.address.latitude()
    })

    producer.on('ready', _ => {
        const sendFn = data => producer.send([{
                topic: TOPIC_NAME,
                messages: [JSON.stringify(data)],
            }],
            () => console.log(`${data.id} had sent`))
        setInterval(() => sendFn(getRandomRecord()), 1500)
    })
}

function init() {
    createTopics()
    setupConsumer()
    startProducer()
}

module.exports = init