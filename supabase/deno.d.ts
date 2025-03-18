// Type declarations for Deno APIs

declare namespace Deno {
  export interface Env {
    get(key: string): string | undefined;
  }
  export const env: Env;
}

// Type declarations for Deno standard library
declare module "https://deno.land/std@0.168.0/http/server.ts" {
  export interface ServeInit {
    port?: number;
    hostname?: string;
    handler?: (request: Request) => Response | Promise<Response>;
    onError?: (error: unknown) => Response | Promise<Response>;
    onListen?: (params: { hostname: string; port: number }) => void;
  }

  export function serve(
    handler: (request: Request) => Response | Promise<Response>,
    options?: Omit<ServeInit, "handler">
  ): void;
  
  export function serve(options: ServeInit): void;
} 