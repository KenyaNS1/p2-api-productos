const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Configuracion del servicio REST.
app.use(cors());
app.use(express.json());

// Datos temporales: se reinician al apagar o reiniciar el servidor.
let productos = [
  { id: 1, nombre: "Teclado", precio: 350, stock: 10 },
  { id: 2, nombre: "Mouse", precio: 180, stock: 25 }
];
let siguienteId = 3;

// Valida los datos de un producto antes de crearlo o modificarlo.
function validar(datos) {
  const errores = [];
  if (!datos || typeof datos !== "object" || Array.isArray(datos)) {
    return ["El cuerpo debe ser un objeto JSON"];
  }
  if (typeof datos.nombre !== "string" || !datos.nombre.trim()) {
    errores.push("nombre es obligatorio y debe ser texto no vacio");
  }
  if (typeof datos.precio !== "number" || !Number.isFinite(datos.precio) || datos.precio < 0) {
    errores.push("precio debe ser un numero mayor o igual a cero");
  }
  if (!Number.isInteger(datos.stock) || datos.stock < 0) {
    errores.push("stock debe ser un entero mayor o igual a cero");
  }
  return errores;
}

// Inicio: permite comprobar que el servidor esta activo.
app.get("/", (req, res) => {
  res.status(200).json({ mensaje: "API de productos funcionando" });
});

// GET: mostrar todos los productos (y busqueda opcional por nombre).
app.get("/api/productos", (req, res) => {
  const buscar = typeof req.query.buscar === "string" ? req.query.buscar.trim().toLowerCase() : "";
  const resultado = buscar
    ? productos.filter(p => p.nombre.toLowerCase().includes(buscar))
    : productos;
  res.status(200).json(resultado);
});

// GET: mostrar un producto por su identificador.
app.get("/api/productos/:id", (req, res) => {
  const id = Number(req.params.id);
  const producto = productos.find(p => p.id === id);
  if (!producto) {
    return res.status(404).json({ error: `No existe el producto ${req.params.id}` });
  }
  res.status(200).json(producto);
});

// POST: crear producto.
app.post("/api/productos", (req, res) => {
  const errores = validar(req.body);
  if (errores.length > 0) return res.status(400).json({ errores });

  const nuevo = {
    id: siguienteId++,
    nombre: req.body.nombre.trim(),
    precio: req.body.precio,
    stock: req.body.stock
  };
  productos.push(nuevo);
  res.status(201).json(nuevo);
});

// PUT: actualizar producto completo.
app.put("/api/productos/:id", (req, res) => {
  const id = Number(req.params.id);
  const indice = productos.findIndex(p => p.id === id);
  if (indice === -1) {
    return res.status(404).json({ error: `No existe el producto ${req.params.id}` });
  }

  const errores = validar(req.body);
  if (errores.length > 0) return res.status(400).json({ errores });

  const actualizado = {
    id,
    nombre: req.body.nombre.trim(),
    precio: req.body.precio,
    stock: req.body.stock
  };
  productos[indice] = actualizado;
  res.status(200).json(actualizado);
});

// DELETE: eliminar un producto.
app.delete("/api/productos/:id", (req, res) => {
  const id = Number(req.params.id);
  const existe = productos.some(p => p.id === id);
  if (!existe) {
    return res.status(404).json({ error: `No existe el producto ${req.params.id}` });
  }
  productos = productos.filter(p => p.id !== id);
  res.status(204).send();
});

// Ruta no encontrada (siempre despues de las rutas validas).
app.use((req, res) => res.status(404).json({ error: "Ruta no encontrada" }));

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
