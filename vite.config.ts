import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import prerenderStatic from "vite-plugin-prerender-static";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" && prerenderStatic({
      routes: [
        {
          path: "/",
          tags: {
            title: "B-Found | Automação, Home Cinema & Soluções AV Premium em Portugal",
            description: "A B-Found projeta e instala soluções de automação, home cinema, áudio, rede e segurança para casas de luxo, empresas e iates em Portugal.",
          },
        },
        {
          path: "/planeamento",
          tags: {
            title: "Planeamento de Casa Inteligente | B-Found",
            description: "Configure a tecnologia ideal para a sua casa com o nosso guia interativo e receba um orçamento personalizado da B-Found.",
          },
        },
      ],
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
