declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_URI: string;
  }
}
declare module "midtrans-client" {
  export = midtransClient;

  namespace midtransClient {
    export class Snap {
      constructor(options: {
        isProduction: boolean;
        serverKey: string;
        clientKey: string;
      });
      createTransaction(parameter: any): Promise<{ token: string }>;
    }
  }
}
