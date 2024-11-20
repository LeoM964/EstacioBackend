//Importa o DataProps do controller
import { DataProps } from '../controllers/CreateTreinoController'
import { GoogleGenerativeAI } from '@google/generative-ai'     //importa a biblioteca para usar o Gemini

// Cria a classe do serviço responsável por executar a lógica de criação do treino
class CreateTreinoService {
  //Método assíncrono que realiza a logica e utiliza o padrao definido pelo DataProps
  async execute({ name, weight, height, age, gender, objective, level }: DataProps) {

    try {
      //Inicializa a API do Google com a chave em .env
      const genAI = new GoogleGenerativeAI(process.env.API_KEY!)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }) //Pega o modelo gemini-1.5-flash
      
      // Envia solicitação com a logica para o modelo gerar um treino com os daods do usuario
      const response = await model.generateContent(`
        Gere um treino completo de musculação para uma pessoa com as seguintes características:
        - Nome: ${name}
        - Sexo: ${gender}
        - Peso: ${weight}kg
        - Altura: ${height}
        - Idade: ${age} anos
        - Objetivo: ${objective}
        - Nível de atividade: ${level}
      
        Retorne a resposta apenas em JSON com as seguintes propriedades:
        - nome: o nome da pessoa
        - sexo: sexo da pessoa
        - idade: idade da pessoa
        - altura: altura da pessoa
        - peso: peso da pessoa
        - objetivo: objetivo da pessoa
        - exercicios: um array de objetos, onde cada objeto representa um exercício do treino, contendo:
          - nome: o nome do exercício
          - series: a quantidade de séries
          - repeticoes: a quantidade de repetições por série
          - descanso: o tempo de descanso entre as séries
          
        Não inclua nenhuma informação extra além do JSON com essas propriedades, e remova todos os acentos das propriedades.
      `)
      
       // Exibe no console o conteúdo retornado pela API, para fins de depuração
      console.log(JSON.stringify(response, null, 2));
       
      // Aqui verifica se a resposta recebida contem response e candidates (e'a forma que a API responde hoje)
      if (response.response && response.response.candidates) {
        //extrai o texto dentro de content.parts da resposta da API
        const jsonText = response.response.candidates[0]?.content.parts[0].text as string;

        //remove do texto codigos e espacos desnecessarios
        let jsonString = jsonText.replace(/```\w*\n/g, '').replace(/\n```/g, '').trim();
        //converte o texto usando o parse em um objeto JSON
        let jsonObject = JSON.parse(jsonString)
//retorna os dados retirados e organizados em objeto JSON que e'recebido pela instancia treino no controller
        return { data: jsonObject }
      }
     //Exibe erros para depuracao
    } catch (err) {
      console.error("Erro JSON: ", err)
      throw new Error("Failed create.")
    }

  }
}
//exporta a classe para ser utilizada no controller
export { CreateTreinoService }