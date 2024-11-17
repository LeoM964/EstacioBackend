import { DataProps } from '../controllers/CreateTreinoController'
import { GoogleGenerativeAI } from '@google/generative-ai'

class CreateTreinoService {
  async execute({ name, weight, height, age, gender, objective, level }: DataProps) {

    try {
      const genAI = new GoogleGenerativeAI(process.env.API_KEY!)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

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
      

      console.log(JSON.stringify(response, null, 2));

      if (response.response && response.response.candidates) {
        const jsonText = response.response.candidates[0]?.content.parts[0].text as string;

        // Extrair o JSON
        let jsonString = jsonText.replace(/```\w*\n/g, '').replace(/\n```/g, '').trim();

        let jsonObject = JSON.parse(jsonString)

        return { data: jsonObject }
      }

    } catch (err) {
      console.error("Erro JSON: ", err)
      throw new Error("Failed create.")
    }

  }
}

export { CreateTreinoService }
