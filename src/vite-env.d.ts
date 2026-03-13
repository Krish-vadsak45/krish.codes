/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NEXUS_AI_URL: string;
  readonly VITE_MYSHOW_URL: string;
  readonly VITE_SHOPIQ_URL: string;
  readonly VITE_FLIPCART_URL: string;
  readonly VITE_NASA_BLOOMWATCH_URL: string;
  readonly VITE_INSIGHTIQ_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
