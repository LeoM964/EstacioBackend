import Fastify from "fastify"; // Framework Fastify para criacao do servidor
import cors from '@fastify/cors'; //permite requisicoes de diferentes origens
import dotenv from 'dotenv'; //gerenciador de variaveis de ambiente
import { routes } from './routes'; //importa as rotas
import os from 'os'; //biblioteca para acessar info do SO

//cria instancia do servidor
const app = Fastify({ logger: true });
//carrega a chave da API para ser usada no codigo process.env em service
dotenv.config();

// Função para obter o IPv4 local
function getLocalIP() {
  const ifaces = os.networkInterfaces();//obter as interfaces de rede
  let ipv4 = '';

  // Procurando pelo IPv4 da interface de rede
  Object.keys(ifaces).forEach(ifname => {
    ifaces[ifname].forEach(iface => {
      
      //verifica se a interface e' IPv4 e pra pular uma do tipo interna
      if ('IPv4' !== iface.family || iface.internal !== false) {
        return;
      }
      ipv4 = iface.address; //define o endereco IPv4
    });
  });

  return ipv4; //retorna o endereco encontrado
}

//manipulador de erros
app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message });
});

//funcao assincrona que inicia o servidor
const start = async () => {
  //registra o cors e permite requisicoes externas
  app.register(cors);
  //registra as rotas do arquivo routes
  app.register(routes);

  try {
    // Inicia o servidor com "0.0.0.0" como host para permitir conexões externas
    await app.listen({ port: 3333, host: "0.0.0.0" });

    // Obtém o IPv4 e mostra no log
    const localIP = getLocalIP();
    console.log(`Servidor rodando no http://localhost:3333 e http://${localIP}:3333`);
  } catch (err) {
    //exibe erros ao iniciar o servidor
    console.log(err);
  }
};

//inicia o servidor
start();