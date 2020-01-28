const kafka = require('kafka-node')

const topics = [{ topic: 'test'}]
const Client = new kafka.KafkaClient()
const Consumer = kafka.Consumer
const Producer = kafka.Producer

module.exports = {topics, Client, Producer, Consumer}