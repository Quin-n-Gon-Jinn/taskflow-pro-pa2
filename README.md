# TaskFlow Pro - PA2 Programación Web

**TaskFlow Pro** es una aplicación web de gestión de tareas desarrollada como avance de proyecto para el Producto Académico n.° 2. Integra HTML, CSS, JavaScript, React como framework de frontend y Node.js con Express para implementar una capa de servicio organizada.

## Funcionalidades principales

- Crear tareas con título, descripción, prioridad, estado, categoría y fecha límite.
- Leer/listar tareas desde la interfaz web.
- Actualizar tareas mediante edición completa o cambio rápido de estado.
- Eliminar tareas con confirmación.
- Filtrar por estado y buscar por título, descripción o categoría.
- Visualizar estadísticas del tablero.
- Consumir servicios desde el cliente mediante `fetch` hacia una API REST.

## Arquitectura general

```text
frontend React  --->  services/taskApi.js  --->  API Express
                                                routes
                                                controllers
                                                services
                                                repositories
                                                data/tasks.json
```

## Estructura del proyecto

```text
TaskFlow-Pro-PA2
├── .gitignore
├── README.md
├── backend
│   ├── package.json
│   ├── data
│   │   └── tasks.json
│   └── src
│       ├── server.js
│       ├── app.js
│       ├── routes
│       │   └── taskRoutes.js
│       ├── controllers
│       │   └── taskController.js
│       ├── services
│       │   └── taskService.js
│       ├── repositories
│       │   └── taskRepository.js
│       ├── dto
│       │   └── taskDTO.js
│       └── middleware
│           └── errorHandler.js
└── frontend
    ├── package.json
    ├── index.html
    └── src
        ├── main.jsx
        ├── App.jsx
        ├── services
        │   └── taskApi.js
        ├── components
        │   ├── TaskForm.jsx
        │   ├── TaskList.jsx
        │   ├── TaskCard.jsx
        │   ├── StatCard.jsx
        │   ├── EmptyState.jsx
        │   └── Toast.jsx
        ├── styles
        │   └── index.css
        └── utils
            └── formatters.js
```

## Requisitos

- Node.js instalado.
- npm instalado.
- VS Code recomendado.

## Ejecución local paso a paso

### 1. Abrir el proyecto

Abre la carpeta `TaskFlow-Pro-PA2` en VS Code.

### 2. Instalar y ejecutar backend

Abre una terminal en VS Code:

```bash
cd backend
npm install
npm run dev
```

El backend quedará disponible en:

```text
http://localhost:3000
```

### 3. Instalar y ejecutar frontend

Abre una segunda terminal en VS Code:

```bash
cd frontend
npm install
npm run dev
```

El frontend quedará disponible en:

```text
http://localhost:5173
```

### 4. Probar la API manualmente

Puedes abrir en el navegador:

```text
http://localhost:3000/api/tasks
```

### 5. Capturas sugeridas para el informe

1. Estructura del proyecto en VS Code.
2. Backend ejecutándose en la terminal.
3. Frontend ejecutándose en la terminal.
4. Página principal en navegador.
5. Creación de una tarea.
6. Edición de una tarea.
7. Eliminación de una tarea.
8. Pestaña Network mostrando peticiones `GET`, `POST`, `PUT` y `DELETE` hacia `/api/tasks`.

## Subida a GitHub paso a paso

Desde la raíz del proyecto `TaskFlow-Pro-PA2`:

```bash
git init
git status
git add .
git commit -m "Proyecto PA2 TaskFlow Pro"
```

Luego crea un repositorio vacío en GitHub y copia la URL. Después ejecuta:

```bash
git branch -M main
git remote add origin https://github.com/TU_USUARIO/taskflow-pro-pa2.git
git push -u origin main
```

Antes de hacer `git add .`, revisa que exista el archivo `.gitignore` y que `node_modules/` no aparezca en el seguimiento de Git.
