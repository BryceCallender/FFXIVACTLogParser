export abstract class ApiBase {
   private authToken: string;

   setAuthToken(token: string) {
       this.authToken = token;
   }

   protected constructor() {
   }

   protected transformOptions(options: RequestInit) {
      options.headers = {
         ...options.headers,
         'Authorization': `Bearer ${this.authToken}`
      };

      return Promise.resolve(options);
   }
}