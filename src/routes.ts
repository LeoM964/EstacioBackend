//importa modulos usados do fastfy
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply
} from 'fastify'
//importa o controlador
import { CreateTreinoController } from './controllers/CreateTreinoController'

//define e exporta a funcao que gerencia as rotas
export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

  //rota get para teste
  fastify.get("/teste", (request: FastifyRequest, reply: FastifyReply) => {

    // Definindo as variáveis para teste
    let name = "Leonardo";
    let gender = "Masculino";
    let age = 42;
    let height = 1.88;
    let weight = 96;
    let objective = "Hipertrofia";

    // cria o objeto de resposta com os dados do usuario e exercicios
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
  //cria a rota POST para criacao do treino
  fastify.post("/create", async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreateTreinoController().handle(request, reply);
  });

}