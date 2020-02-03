const kafka = require('kafka-node')
const faker = require('faker')

// CONSTANTS
const TOPIC_NAME = "geodata-1"
const KAFKA_HOST = process.env.KAFKA_CLIENT_CONNECT
console.log(KAFKA_HOST);
const DEFAULT_TOPIC = { topic: TOPIC_NAME, partitions: 1, replicationFactor: 1}

// CORE
const client = new kafka.KafkaClient({
    kafkaHost: KAFKA_HOST
})

function createTopics() {
    client.createTopics([{...DEFAULT_TOPIC}], (err, res) => {
        console.log("Create topic error " , err, " Success ", res)
    })
}


// CONSUMER
function setupConsumer() {
    const Consumer = kafka.Consumer
    console.log('setupConsumer');
    const consumer = new Consumer(client, [DEFAULT_TOPIC], {})
    consumer.on('message', message => console.log(`message ${message.value} was received`))
}

// PRODUCER
function startProducer() {
    const Producer = kafka.Producer
    console.log('startProducer');
    const producer = new Producer(client)

    const getRandomRecord = () => ({
        id: faker.random.number(),
        lnd: faker.address.longitude(),
        ltd: faker.address.latitude()
    })

    producer.on('ready', _ => {
        console.log('Producer ready');
        const sendFn = data => producer.send([{
                topic: TOPIC_NAME,
                messages: [JSON.stringify(data)],
            }],
            () => console.log(`${JSON.stringify(data)} had sent`))
        setInterval(() => sendFn(getRandomRecord()), 1500)
    })
    producer.on('error', err => console.log('Producer error ', err))
}


function init() {
    createTopics()
    startProducer()
    setupConsumer()
}

module.exports = init