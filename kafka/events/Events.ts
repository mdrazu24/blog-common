import { KafkaEvent } from "../KafkaEvent"
import { SupportedEvent, KafkaEventType } from './type';
import {  Consumer } from "kafkajs"

interface Events {
  send: (topic: KafkaEventType, event: SupportedEvent) => Promise<void>
  recieve: (topic: KafkaEventType) => Promise<Consumer>
}

export class Kafka implements Events {
  protected KafkaClass = new KafkaEvent()
  private producer = this.KafkaClass.producer
  private consumer = this.KafkaClass.consumer

  constructor() {}

  async send(topic: KafkaEventType, event: SupportedEvent) {
    const producer = await this.producer()

    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(event.data) as unknown as Buffer }],
    })
  }

  async recieve(topic: KafkaEventType) {
    const consumer = await this.consumer()
    await consumer.subscribe({ topic, fromBeginning: true })
    return consumer
  }
}

export const KafkaBus = new Kafka()


// KafkaBus.recieve(KafkaEventType.POST_CREATE).then(consumer => {
//   consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//       console.log(`Received message ${message}`)
//     }
//   })
// }
// )

// KafkaBus.send({type: KafkaEventType.POST_CREATED, data: {id: "1", title: "title", content: "content", authorId: 1}}, KafkaEventType.POST_CREATED)