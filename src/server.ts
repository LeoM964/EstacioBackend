import Fastify from "fastify";
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import { routes } from './routes';
import os from 'os';

const app = Fastify({ logger: true });
dotenv.config();

// Função para obter o IPv4 local
function getLocalIP() {
  const ifaces = os.networkInterfaces();
  let ipv4 = '';

  // Procurando pelo IPv4 da interface de rede
  Object.keys(ifaces).forEach(ifname => {
    ifaces[ifname].forEach(iface => {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        return;
      }
      ipv4 = iface.address;
    });
  });

  return ipv4;
}

app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message });
});

const start = async () => {
  app.register(cors);
  app.register(routes);

  try {
    // Inicia o servidor com "0.0.0.0" como host para permitir conexões externas
    await app.listen({ port: 3333, host: "0.0.0.0" });

    // Obtém o IPv4 e exibe no log
    const localIP = getLocalIP();
    console.log(`Servidor rodando no http://localhost:3333 e http://${localIP}:3333`);
  } catch (err) {
    console.log(err);
  }
};

start();
