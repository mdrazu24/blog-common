"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaBus = void 0;
const KafkaEvent_1 = require("../KafkaEvent");
class KafkaBus {
    constructor() {
        this.KafkaClass = new KafkaEvent_1.KafkaEvent();
    }
    //connect producer
    connectProducer() {
        return __awaiter(this, void 0, void 0, function* () {
            const producer = yield this.KafkaClass.producer();
            yield producer.connect().then(() => console.log("Producer connected"));
            return producer;
        });
    }
    //connect consumer
    connectConsumer() {
        return __awaiter(this, void 0, void 0, function* () {
            const consumer = yield this.KafkaClass.consumer();
            yield consumer.connect().then(() => console.log("Consumer connected"));
            return consumer;
        });
    }
    send(topic, event) {
        return __awaiter(this, void 0, void 0, function* () {
            const producer = yield this.connectProducer();
            yield producer.send({
                topic,
                messages: [{ value: JSON.stringify(event.data) }],
            });
        });
    }
    recieve(topic) {
        return __awaiter(this, void 0, void 0, function* () {
            const consumer = yield this.connectConsumer();
            yield consumer.subscribe({ topic, fromBeginning: true });
            return consumer;
        });
    }
}
exports.KafkaBus = KafkaBus;
// export const Kafka = new KafkaBus()
// const connectProducer = new KafkaBus().connectProducer()
// Kafka.send(
//   KafkaEventType.POST_CREATED,
//   {
//     type: KafkaEventType.POST_CREATED,
//     data: { id: 1, title: "test", content: "test", authorId: 1 },
//   }
// )
// const connectConsumer = new KafkaBus().connectConsumer()
// Kafka.recieve( KafkaEventType.POST_CREATED)
// KafkaBus.recieve(KafkaEventType.POST_CREATE).then(consumer => {
//   consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//       console.log(`Received message ${message}`)
//     }
//   })
// }
// )
// KafkaBus.send({type: KafkaEventType.POST_CREATED, data: {id: "1", title: "title", content: "content", authorId: 1}}, KafkaEventType.POST_CREATED)
