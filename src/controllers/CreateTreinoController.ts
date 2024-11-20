

// FastifyRequest para receber requisição e FastifyReply para enviar a resposta para o front
import { FastifyRequest, FastifyReply } from 'fastify' 
//Importar o serviço com a lógica para criação do treino
import { CreateTreinoService } from '../services/CreateTreinoService' 
//Definir o tipo das variaveis recebidas e exporta para ser utilizado no service
export interface DataProps{
  name: string;        // Nome do aluno
  weight: string;      // Peso do aluno
  height: string;      // Altura do aluno
  age: string;         // Idade do aluno
  gender: string;      // Gênero do aluno
  objective: string;   // Objetivo do aluno (ex.: emagrecer, ganhar massa, definicao, resistencia...)
  level: string;       // Nível do aluno (ex.: iniciante, sedentario, intermediário, atleta...)
}
//define a classe para o controller processar a requisição e coordenar as ações
class CreateTreinoController{
  //metodo assincrono que lidara com a criacao dos treinos
  async handle(request: FastifyRequest, reply: FastifyReply){
    // Extrai os dados do corpo da requisição, garantindo que sigam o formato definido em DataProps
    const { name, weight, height, age, gender, objective, level } = request.body as DataProps;
    //Exibe uma mensagem no console para depuracao
    console.log("Enviado")  
    // Chama o serviço responsável pela lógica de criação do treino em service
    const createTreino = new CreateTreinoService();  
    // Chama o método 'execute' do service para criar o treino
    // Passa os dados recebidos da requisição como parâmetros
    const treino = await createTreino.execute({  
      name,
      weight,
      height,
      age,
      objective,
      gender,
      level,
    });
   //Envia a resposta com o treino para o front
    reply.send(treino);  

  }
}

//Exporta a classe e permite que seja utilizada em outros arquivos
export { CreateTreinoController }