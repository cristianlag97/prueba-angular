# Proyecto de Aplicación

## Instrucciones para Ejecutar la Aplicación

### Requisitos Previos
- Node.js (versión recomendada: 16 o superior)
- Angular CLI instalado globalmente (`npm install -g @angular/cli`)
- Un servicio de backend en funcionamiento o Endpoint de tercero (si aplica)

### Pasos de Instalación
1. Clonar el repositorio:
   ```sh
   git clone https://github.com/cristianlag97/prueba-angular.git
   cd proyecto
   ```
2. Instalar dependencias:
   ```sh
   npm install
   ```
3. Ejecutar la aplicación en modo desarrollo:
   ```sh
   ng serve
   ```
   La aplicación estará disponible en `http://localhost:4200/`.

## Detalles de Implementación
- **Framework:** Angular
- **Estado Global:** Se usa `Ngrx|store` para manejo de estados Global de autenticación.
- **Estilos:** `Angular material` y CSS.
- **Traducciones:** Se usa `ngx-translate` para gestionar idiomas.
- **Autenticación:** Implementada sin backend, almacenando el token en `localStorage`.
- **Manejo de Formularios:** Utiliza `Reactive Forms` de Angular.

## APIs Consumidas

### 1. Autenticación
**Endpoint:** `POST NN`
- **Descripción:** Permite a los usuarios iniciar sesión.
- **Parámetros:**
  ```json
  {
    "email": "admin@example.com",
    "password": "123456"
  }
  ```
- **Respuesta:**
  ```json
  {
    "token": "moke-token"
  }
  ```

### 2. Obtener Pokémon
**Endpoint:** `GET https://pokeapi.co/api/v2/pokemon/`
- **Descripción:** Devuelve una lista de Pokémon.
- **Ejemplo de Respuesta:**
  ```json
  [
    {
      "id": 1,
      "name": "Bulbasaur",
      "imageUrl": "https://example.com/bulbasaur.png"
    },
    ...
    {
      "id": 4,
      "name": "Charmander",
      "imageUrl": "https://example.com/charmander.png"
    }
  ]
  ```

