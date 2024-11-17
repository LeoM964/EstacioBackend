import { FastifyRequest, FastifyReply } from 'fastify'
import { CreateTreinoService } from '../services/CreateTreinoService'

export interface DataProps{
  name: string;
  weight: string;
  height: string;
  age: string;
  gender: string;
  objective: string;
  level: string;
}

class CreateTreinoController{
  async handle(request: FastifyRequest, reply: FastifyReply){
    const { name, weight, height, age, gender, objective, level } = request.body as DataProps;
    console.log("teste de teste")  

    const createTreino = new CreateTreinoService();  

    const treino = await createTreino.execute({  
      name,
      weight,
      height,
      age,
      objective,
      gender,
      level,
    });

    reply.send(treino);  

  }
}


export { CreateTreinoController }