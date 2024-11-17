import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply
} from 'fastify'
import { CreateTreinoController } from './controllers/CreateTreinoController'

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

  fastify.get("/teste", (request: FastifyRequest, reply: FastifyReply) => {

    // Definindo as variáveis necessárias
    let name = "Leonardo";
    let gender = "Masculino";
    let age = 42;
    let height = 1.88;
    let weight = 96;
    let objective = "Hipertrofia";

    // Criando o objeto de resposta de forma mais simples
    const response = {
      nome: name,
      sexo: gender,
      idade: age,
      altura: height,
      peso: weight,
      objetivo: objective,
      exercicios: [
        { nome: "Supino reto", series: 4, repeticoes: 10, descanso: "90 segundos" },
        { nome: "Agachamento", series: 4, repeticoes: 12, descanso: "90 segundos" },
        { nome: "Puxada frente", series: 4, repeticoes: 10, descanso: "90 segundos" },
        { nome: "Rosca direta", series: 3, repeticoes: 12, descanso: "60 segundos" }
      ]
    };

    try {
      // Enviar o objeto como resposta
      return reply.send({ data: response });
    } catch (err) {
      console.error(err);
      reply.status(500).send({ error: 'Falha ao processar o JSON' });
    }
  });

  fastify.post("/create", async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreateTreinoController().handle(request, reply);
  });

}
