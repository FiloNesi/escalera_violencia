# Escalera de la Violencia de Género - App Educativa

Esta aplicación es una herramienta interactiva para trabajar los valores y la prevención de violencia de género en el aula (2º ESO).

## 🚀 Cómo publicar esta App para usar en clase

Tienes dos opciones principales para compartir esto con tus alumnos.

### Opción 1: Netlify Drop (La más fácil y rápida)
No requiere configuración compleja. Ideal si no quieres pelearte con GitHub.

1.  Abre tu terminal y ejecuta:
    ```bash
    npm run build
    ```
    Esto creará una carpeta llamada `dist` en tu proyecto.
2.  Entra en [Netlify Drop](https://app.netlify.com/drop).
3.  Arrastra la carpeta `dist` completa dentro del área punteada en la web.
4.  ¡Listo! Netlify te dará un enlace (ej: `https://wonderful-site-12345.netlify.app`).
5.  Comparte ese enlace o crea un código QR para tus alumnos.

### Opción 2: GitHub Pages
Si ya tienes el código en GitHub.

1.  Asegúrate de que el archivo `vite.config.ts` tiene la línea `base: './'` (ya está configurado así en este proyecto).
2.  Ejecuta en tu terminal:
    ```bash
    npm run build
    ```
3.  Sube el contenido de tu carpeta `dist` a una rama llamada `gh-pages` O configura GitHub Pages desde los "Settings" del repositorio para que publique desde la carpeta `docs` (si mueves el contenido de dist allí).

## 📱 Uso en Tablets
La aplicación incluye un sistema de compatibilidad (polyfill) para funcionar en:
- iPads
- Tablets Android
- Chromebooks con pantalla táctil
- Pizarras digitales interactivas

## 👩‍🏫 Guía Didáctica Rápida
1.  **Introducción:** Proyecta la escalera vacía.
2.  **Juego:** Pide a los alumnos que entren en el link y completen la escalera.
3.  **Debate:** Una vez terminada, pulsa en "Revisar Resultados" y debate por qué ciertas conductas sutiles (escalones 1-3) son la base de la violencia.
