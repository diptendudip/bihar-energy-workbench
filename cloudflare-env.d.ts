declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
    GOVERNMENT_DEPLOYMENT_APPROVED?: string;
    GOVERNMENT_AI_ENDPOINT?: string;
    GOVERNMENT_AI_TOKEN?: string;
    GOVERNMENT_AI_MODEL?: string;
  }
}
