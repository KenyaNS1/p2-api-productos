# P2 · API REST de productos con Node.js y Express

Práctica de **Programación Web, Unidad 5**. La aplicación ofrece un servicio REST que administra productos con las operaciones **GET, POST, PUT y DELETE**, responde en **JSON** y emplea los códigos HTTP apropiados.

## Requisitos

- Node.js versión 18 o superior
- Visual Studio Code o editor de código
- Postman o Thunder Client

## Instalación y ejecución

Abre una terminal en la carpeta `p2-api-productos` y ejecuta:

```bash
node -v
npm install
npm start
```

También puedes usar `npm run dev` para que el servidor se reinicie al guardar cambios. Si aparece `Servidor en http://localhost:3000`, visita **http://localhost:3000** para verificar que funciona. La API está disponible en **http://localhost:3000/api/productos**.

> No se requiere base de datos: para esta práctica los productos se guardan en un arreglo en memoria. Cualquier modificación se perderá cuando reinicies el servidor.

## Contrato REST (Paso 2)

| Método | Ruta | Acción | Respuesta correcta | Posibles errores |
|---|---|---|---|---|
| GET | `/api/productos` | Listar todos | 200 + arreglo JSON | — |
| GET | `/api/productos/:id` | Ver uno | 200 + objeto JSON | 404 |
| POST | `/api/productos` | Crear | 201 + objeto creado | 400 |
| PUT | `/api/productos/:id` | Actualizar | 200 + objeto actualizado | 400, 404 |
| DELETE | `/api/productos/:id` | Eliminar | 204 sin contenido | 404 |

**Campos de un producto:** `id` (entero asignado por la API), `nombre` (texto no vacío), `precio` (número mayor o igual a cero) y `stock` (entero mayor o igual a cero).

## Ejemplo de petición y respuesta

**Petición (POST)** `http://localhost:3000/api/productos`

Encabezado: `Content-Type: application/json`

```json
{"nombre":"Monitor","precio":2500,"stock":5}
```

**Respuesta esperada**: HTTP **201 Created**

```json
{"id":3,"nombre":"Monitor","precio":2500,"stock":5}
```

Si envías datos inválidos, la API regresa HTTP **400** y una lista `errores`. Si pides un producto que no existe, regresa HTTP **404**. El DELETE exitoso regresa HTTP **204** y **no envía JSON**.

## Pasos para probar en Postman (Paso 7)

1. Deja ejecutándose `npm start` o `npm run dev`.
2. En Postman, selecciona **Import** y carga `P2_Productos.postman_collection.json`.
3. Se importará la colección **P2 Productos** con las ocho peticiones del PDF.
4. Ábrelas y presiona **Send**, una por una y en orden. POST y PUT ya traen configurado `Body > raw > JSON`.
5. Toma ocho capturas reales donde se vea el método, la URL, la respuesta y el código de estado.
6. Para entregar la colección, usa los tres puntos de la colección → **Export → Collection v2.1**.

Las ocho pruebas son:

| # | Petición | JSON de entrada | Estado esperado |
|---|---|---|---|
| 1 | GET `/api/productos` | — | 200 |
| 2 | GET `/api/productos/1` | — | 200 |
| 3 | GET `/api/productos/99` | — | 404 |
| 4 | POST `/api/productos` | `{"nombre":"Monitor","precio":2500,"stock":5}` | 201 |
| 5 | POST `/api/productos` | `{"nombre":"","precio":-1}` | 400 |
| 6 | PUT `/api/productos/1` | `{"nombre":"Teclado RGB","precio":420,"stock":8}` | 200 |
| 7 | DELETE `/api/productos/2` | — | 204 |
| 8 | DELETE `/api/productos/2` otra vez | — | 404 |

Consulta `EVIDENCIAS.md` para ver qué debe aparecer en cada captura.

## Búsqueda por nombre (reto extra opcional)

También se incluyó la búsqueda por nombre con un parámetro de consulta:

```text
GET http://localhost:3000/api/productos?buscar=tec
```

Regresa los productos cuyo nombre contenga `tec`, sin distinguir mayúsculas y minúsculas.

## Estructura del proyecto

```text
p2-api-productos/
├── server.js
├── package.json
├── README.md
├── .gitignore
├── P2_Productos.postman_collection.json
├── EVIDENCIAS.md
└── REFLEXION.md
```

## Subir a GitHub (Paso 8)

En la carpeta del proyecto, ejecuta los siguientes comandos **después de crear un repositorio vacío en GitHub**:

```bash
git init
git add .
git commit -m "P2 API REST de productos"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git push -u origin main
```

Cambia `TU_USUARIO` y `TU_REPOSITORIO` por tus datos reales. Si ya tienes un repositorio inicializado, adapta estos comandos. `node_modules/` está en `.gitignore` para no subir las dependencias instaladas.

## Reflexión y entrega

Las respuestas a las tres preguntas del PDF se encuentran en `REFLEXION.md`.

**Entregables**: enlace del repositorio GitHub, colección Postman exportada, **ocho capturas reales** de las respuestas y respuestas de reflexión.
