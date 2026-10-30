/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Clé Web3Forms utilisée pour l'envoi des commandes de la Boutique de Noël (facultative) */
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
