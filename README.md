# 🎨 Design Patterns in Deno

¡Bienvenido a este proyecto de implementación de patrones de diseño utilizando **Deno**! Este repositorio contiene ejemplos prácticos y educativos de diversos patrones de diseño de software, organizados por categorías (creacionales, estructurales y comportamentales). Cada patrón está implementado en TypeScript y ejecutado en el entorno de Deno para demostrar su uso en aplicaciones modernas.

---

## 📋 Información del Proyecto

- **Lenguaje**: TypeScript
- **Entorno**: Deno
- **Versión de Deno recomendada**: 1.30.0 o superior
- **Propósito**: Educativo y demostrativo de patrones de diseño

---

## 👥 Integrantes del Grupo

- JORGE COBO - 230222019
- DIANA LOPEZ - 230222003

---

# 🏗️ Lista de Patrones Utilizados

Los patrones de diseño están organizados en tres categorías principales según la clasificación de Gang of Four.

---

## 1. Creacionales (Creational Patterns)

- **Builder** → Construye objetos complejos paso a paso.
- **Factory Method** → Crea objetos sin especificar la clase exacta.
- **Singleton** → Garantiza una única instancia de una clase.

---

## 2. Estructurales (Structural Patterns)

- **Adapter** → Permite que interfaces incompatibles trabajen juntas.
- **Facade** → Proporciona una interfaz simplificada a un subsistema complejo.
- **Flyweight** → Comparte objetos para reducir el uso de memoria.

---

## 3. Comportamentales (Behavioral Patterns)

- **Command** → Encapsula una solicitud como un objeto.
- **Observer** → Define una dependencia uno-a-muchos entre objetos.
- **State** → Permite que un objeto cambie su comportamiento cuando cambia su estado interno.
- **Strategy** → Define una familia de algoritmos intercambiables.

---

# 📖 Breve Descripción de Cada Ejercicio

A continuación, se detalla cada patrón implementado, incluyendo una descripción breve, propósito y forma de ejecución.

---

# 🏗️ 1. Creacionales

---

## 🏗️ Builder (`patterns/01-creational/builder.ts`)

### 📌 Descripción

Implementa el patrón Builder para construir objetos complejos (como una pizza) de manera incremental, separando la construcción de la representación final.

### 💻 Explicación del Código

El código define una clase PizzaBuilder con métodos encadenables para configurar tamaño, masa, salsa, queso e ingredientes, y un método build() que retorna la pizza completa.

### 🌎 Caso de uso real

En una pizzería como Domino's, el Builder permite personalizar una pizza paso a paso: seleccionar tamaño, tipo de masa, salsa, queso extra e ingredientes, evitando constructores con muchos parámetros y haciendo el proceso claro y flexible.

<p align="center">
  <img src="image.png" width="320"/>
</p>

### 🎯 Propósito

Permite crear objetos con muchos parámetros opcionales sin sobrecargar el constructor.

### ▶️ Ejecución

```bash
deno task builder
```

---

## 🏭 Factory Method (`patterns/01-creational/factory.ts`)

### 📌 Descripción

Define una interfaz para crear objetos, pero deja que las subclases decidan qué clase instanciar.

### 💻 Explicación del Código

El código implementa una interfaz Transporte con subclases AutoEstandar y AutoLujo, y un creador que instancia el transporte apropiado basado en el tipo solicitado.

### 🌎 Caso de uso real

En plataformas de movilidad como Uber, Factory Method permite crear distintos tipos de transporte (UberX, Uber Black, Uber Van) sin acoplar el sistema principal a clases concretas.

### 🎯 Propósito

Proporcionar flexibilidad en la creación de objetos sin acoplar el código cliente a clases específicas.

### ▶️ Ejecución

```bash
deno task factory
```

---

## 🔒 Singleton (`patterns/01-creational/singleton.ts`)

### 📌 Descripción

Garantiza que una clase tenga una única instancia y proporciona un punto de acceso global a ella.

### 💻 Explicación del Código

El código define una clase DatabaseManager con constructor privado y un método estático getInstance() que retorna la única instancia, compartiendo estado como número de conexiones activas.

### 🌎 Caso de uso real

En aplicaciones que utilizan conexiones compartidas a bases de datos (PostgreSQL, Redis, MongoDB), Singleton evita crear múltiples conexiones innecesarias.

### 🎯 Propósito

Controlar el acceso a recursos compartidos y mantener consistencia global.

### ▶️ Ejecución

```bash
deno task singleton
```

---

# 🏛️ 2. Estructurales

---

## 🔌 Adapter (`patterns/02-structural/adapter.ts`)

### 📌 Descripción

Convierte la interfaz de una clase en otra interfaz esperada por el cliente.

### 💻 Explicación del Código

El código crea adaptadores para proveedores de autenticación (GitHub, Google, Apple) que implementan una interfaz común AuthStrategy, traduciendo sus métodos específicos a un contrato unificado.

### 🌎 Caso de uso real

En sistemas de autenticación como GitHub Login, Adapter unifica APIs incompatibles de Google, Apple y GitHub bajo un único contrato común `login()`.

<p align="center">
  <img src="image-1.png" width="320"/>
</p>

### 🎯 Propósito

Permitir colaboración entre clases incompatibles sin modificar código existente.

### ▶️ Ejecución

```bash
deno task adapter
```

---

## 🏛️ Facade (`patterns/02-structural/facade.ts`)

### 📌 Descripción

Proporciona una interfaz simplificada a un sistema complejo.
### 💻 Explicación del Código

El código implementa subsistemas como GitHubService, BuildServer, etc., y una clase Facade que orquesta el despliegue llamando a estos subsistemas en secuencia.
### 🌎 Caso de uso real

En plataformas como Netlify o Vercel, un botón “Deploy” coordina múltiples procesos internos como build, DNS y despliegue automático.

### 🎯 Propósito

Reducir complejidad y ocultar lógica interna compleja.

### ▶️ Ejecución

```bash
deno task facade
```

---

## 🪶 Flyweight (`patterns/02-structural/flyweight.ts`)

### 📌 Descripción

Permite compartir objetos para optimizar memoria cuando existen grandes cantidades de elementos similares.

### 💻 Explicación del Código

El código define una fábrica Flyweight que comparte instancias de tipos de bloques (Grass, Stone) y crea objetos individuales solo con posiciones únicas.

### 🌎 Caso de uso real

En videojuegos como Minecraft, Flyweight comparte propiedades comunes de bloques (tipo, textura, dureza) y solo almacena posiciones individuales.

<p align="center">
  <img src="image-2.png" width="320"/>
</p>

### 🎯 Propósito

Reducir uso de memoria reutilizando información compartida.

### ▶️ Ejecución

```bash
deno task flyweight
```

---

# 🔄 3. Comportamentales

---

## 📋 Command (`patterns/03-behavioral/command.ts`)

### 📌 Descripción

Encapsula solicitudes como objetos independientes.

### 💻 Explicación del Código

El código define comandos como CreateOrderCommand, CancelOrderCommand que implementan una interfaz Command, permitiendo ejecutar, encolar y deshacer operaciones sobre un OrderManager.

### 🌎 Caso de uso real

En sistemas e-commerce, acciones como crear pedido, cancelar compra o despachar producto pueden encapsularse como comandos.

### 🎯 Propósito

Desacoplar quien solicita la acción de quien la ejecuta.

### ▶️ Ejecución

```bash
deno task command
```

---

## 👀 Observer (`patterns/03-behavioral/observer.ts`)

### 📌 Descripción

Define una relación uno-a-muchos donde múltiples observadores reciben notificaciones automáticamente.

### 💻 Explicación del Código

El código implementa un Subject (Artist) que notifica a Observers (Followers) cuando lanza nuevos álbumes, permitiendo suscribirse y desuscribirse dinámicamente.

### 🌎 Caso de uso real

En Spotify, seguidores de artistas reciben notificaciones automáticas cuando se publica un nuevo álbum.

<p align="center">
  <img src="image-3.png" width="320"/>
</p>

### 🎯 Propósito

Implementar sistemas de notificaciones y eventos.

### ▶️ Ejecución

```bash
deno task observer
```

---

## 🔄 State (`patterns/03-behavioral/state.ts`)

### 📌 Descripción

Permite cambiar el comportamiento de un objeto dependiendo de su estado interno.

### 💻 Explicación del Código

El código define estados como RequestedState, AssignedState que implementan una interfaz State, cambiando el comportamiento del RideContext según transiciones.

### 🌎 Caso de uso real

En Uber, el flujo de un viaje cambia entre estados como: solicitado, conductor asignado, en curso y finalizado.

### 🎯 Propósito

Eliminar grandes estructuras condicionales basadas en estados.

### ▶️ Ejecución

```bash
deno task state
```

---

## 🎯 Strategy (`patterns/03-behavioral/strategy.ts`)

### 📌 Descripción

Define una familia de algoritmos intercambiables.

### 💻 Explicación del Código

El código encapsula ataques de Pokémon (ElectricAttack, FireAttack) en estrategias intercambiables que un Pokémon puede cambiar dinámicamente.

### 🌎 Caso de uso real

En Pokémon, cada criatura puede cambiar dinámicamente su estrategia de ataque: fuego, agua, eléctrico o planta.

<p align="center">
  <img src="image-4.png" width="320"/>
</p>

### 🎯 Propósito

Permitir cambiar algoritmos en tiempo de ejecución sin modificar el código cliente.

### ▶️ Ejecución

```bash
deno task strategy
```

---

# 🚀 Cómo Ejecutar el Proyecto

## 1️⃣ Instalar Deno

Asegúrate de tener Deno instalado.

👉 https://deno.land

---

## 2️⃣ Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd design-patterns-deno
```

---

# ▶️ Ejecutar Patrones con Tasks

El proyecto incluye tareas configuradas en `deno.json`.

---

## 🏗️ Creacionales

```bash
deno task builder
deno task factory
deno task singleton
```

---

## 🏛️ Estructurales

```bash
deno task adapter
deno task facade
deno task flyweight
```

---

## 🔄 Comportamentales

```bash
deno task observer
deno task command
deno task state
deno task strategy
```

---

# 🧹 Formatear y Analizar Código

## Formatear proyecto

```bash
deno task fmt
```

## Ejecutar linter

```bash
deno task lint
```

---

# ⚙️ Configuración de Tasks (`deno.json`)

```json
{
  "tasks": {
    "builder": "deno run patterns/01-creational/builder.ts",
    "adapter": "deno run patterns/02-structural/adapter.ts",
    "flyweight": "deno run patterns/02-structural/flyweight.ts",
    "observer": "deno run patterns/03-behavioral/observer.ts",
    "command": "deno run patterns/03-behavioral/command.ts",
    "state": "deno run patterns/03-behavioral/state.ts",
    "strategy": "deno run patterns/03-behavioral/strategy.ts",
    "factory": "deno run patterns/01-creational/factory.ts",
    "singleton": "deno run patterns/01-creational/singleton.ts",
    "facade": "deno run patterns/02-structural/facade.ts",

    "fmt": "deno fmt",
    "lint": "deno lint"
  }
}
```

---

# 🛠️ Dependencias y Helpers

## Helpers incluidos

### `helpers/colors.ts`

Permite colorear mensajes en consola usando ANSI colors.

### `helpers/sleep.ts`

Función auxiliar para pausas asíncronas en simulaciones.

---

# 📚 Recursos Adicionales

- https://deno.land/manual
- https://refactoring.guru/design-patterns

---

# ✨ Proyecto desarrollado para la materia de Arquitectura de Software - Corte 3.
