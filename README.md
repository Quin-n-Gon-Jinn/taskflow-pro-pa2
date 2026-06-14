# TaskFlow Pro - PA2 Programación Web

TaskFlow Pro es una aplicación web de gestión de tareas desarrollada como parte del Producto Académico N.° 2 del curso de Programación Web.

El proyecto integra un frontend desarrollado con React y un backend desarrollado con Node.js y Express. Además, implementa una arquitectura organizada con capa de servicio, controlador, repositorio, DTO y consumo de servicios desde el cliente.

## Tecnologías utilizadas

* HTML5
* CSS3
* JavaScript
* React
* Node.js
* Express
* Vite
* API REST
* JSON como persistencia simulada

## Funcionalidades principales

* Registrar tareas.
* Listar tareas.
* Editar tareas.
* Completar o reabrir tareas.
* Eliminar tareas.
* Buscar tareas por título, descripción o categoría.
* Filtrar tareas por estado.
* Mostrar estadísticas dinámicas.
* Validar datos del formulario.
* Consumir servicios desde el cliente mediante peticiones HTTP.

## Arquitectura aplicada

El proyecto sigue una arquitectura separada por responsabilidades:

Cliente React → API Service → Controller → Service → Repository → JSON Data

En el frontend, React se encarga de la interfaz, los componentes, el estado y la interacción del usuario.
En el backend, Express recibe las solicitudes HTTP y las distribuye hacia los controladores.
La capa de servicio contiene la lógica de negocio y las validaciones.
El repositorio gestiona el acceso a los datos almacenados en un archivo JSON.

## Estructura del proyecto

```text
TaskFlow-Pro-PA2
├── backend
│   ├── data
│   │   └── tasks.json
│   ├── src
│   │   ├── controllers
│   │   ├── dto
│   │   ├── middleware
│   │   ├── repositories
│   │   ├── routes
│   │   ├── services
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── package-lock.json
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── services
│   │   ├── styles
│   │   ├── utils
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── package-lock.json
├── .gitignore
└── README.md
```

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/Quin-n-Gon-Jinn/taskflow-pro-pa2.git
```

### 2. Entrar a la carpeta del proyecto

```bash
cd taskflow-pro-pa2
```

### 3. Ejecutar el backend

```bash
cd backend
npm install
npm run dev
```

El backend se ejecutará en:

```text
http://localhost:3000
```

Endpoint principal:

```text
http://localhost:3000/api/tasks
```

### 4. Ejecutar el frontend

Abrir otra terminal desde la raíz del proyecto y ejecutar:

```bash
cd frontend
npm install
npm run dev
```

El frontend se ejecutará normalmente en:

```text
http://localhost:5173
```

## Nota sobre la demostración

El proyecto se demuestra localmente porque utiliza un backend en Node.js con Express. GitHub contiene el código fuente del proyecto, pero la ejecución funcional requiere levantar el backend y el frontend en entorno local.

## Autor

Franco Anthony Ayala Odar
Universidad Continental
Curso: Programación Web
Producto Académico N.° 2
