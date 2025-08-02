# Deploy Angular SSR en Vercel

## Archivos clave
- `vercel.json`: Redirige todas las rutas a `/api/server` para SSR.
- `api/server.js`: Handler que ejecuta el servidor SSR generado por Angular Universal.

## Pasos para deploy

1. **Build SSR**
   ```bash
   npm run build:ssr
   # O el comando equivalente en tu proyecto
   ```

2. **Estructura esperada tras build**
   - `dist/espanhol-entre-amigos/browser` (archivos estáticos)
   - `dist/espanhol-entre-amigos/server/main.js` (SSR bundle)

3. **Deploy a Vercel**
   - Sube todo el proyecto (incluyendo `/api`, `/dist`, `vercel.json`).
   - Vercel usará `/api/server.js` como serverless function para SSR.

4. **Validación**
   - Accede a una URL de artículo directamente (ej: `/blog/slug-del-articulo`).
   - Verifica que los meta tags sean los correctos en el HTML fuente.

## Notas
- Si tu bundle SSR se llama distinto a `main.js`, ajusta la ruta en `api/server.js`.
- Si usas TypeScript en la carpeta `api/`, compílala a JS antes del deploy.
- Si tienes problemas de memoria en serverless, considera usar Vercel Edge Functions o un servidor dedicado.

---

¿Dudas? Consulta la documentación oficial de [Angular Universal](https://angular.dev/guide/ssr) y [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions/introduction).
