import { COLORS } from '../../helpers/colors.ts';

/**
 * ! Patrón Singleton
 *
 * ¿Qué hace el patrón?
 * --------------------------------------------------------------------------
 * Garantiza que una clase tenga una única instancia y proporciona un
 * punto de acceso global a esa instancia.
 *
 * ¿Qué problema se está resolviendo?
 * --------------------------------------------------------------------------
 * Cuando varios módulos necesitan usar el mismo recurso compartido (por
 * ejemplo, una conexión principal a base de datos) sin crear instancias
 * duplicadas que consuman recursos innecesarios.
 *
 * ¿Por qué este patrón es adecuado para solucionar el problema?
 * --------------------------------------------------------------------------
 * Centraliza la creación en un único lugar y asegura que todos los módulos
 * trabajen con el mismo estado compartido.
 *
 * Caso de uso real:
 * --------------------------------------------------------------------------
 * Servicios que comparten un pool de conexiones o un cliente de caché
 * (Redis, PostgreSQL, etc) para toda la aplicación.
 *
 * Referencia:
 * https://refactoring.guru/es/design-patterns/singleton
 */

/**
 * Singleton (Singleton)
 * --------------------------------------------------------------------------
 * Controla la creación de la instancia y expone un método de acceso global.
 */
class DatabaseManager {
    /**
     * Instancia única de la clase.
     */
    private static instance: DatabaseManager;

    /**
     * Simulación de estado interno compartido.
     */
    private numeroDeConexionesActivas: number = 0;

    /**
     * Constructor privado para bloquear el uso de `new` desde el exterior.
     */
    private constructor() {
        console.log(
            '%c⚙️ [SISTEMA] Inicializando la conexión principal a la Base de Datos...',
            COLORS.yellow,
        );
    }

    /**
     * Punto de acceso global para obtener la instancia.
     */
    public static getInstance(): DatabaseManager {
        if (!DatabaseManager.instance) {
            DatabaseManager.instance = new DatabaseManager();
        }
        return DatabaseManager.instance;
    }

    /**
     * Ejecuta una operación simulada y actualiza el estado compartido.
     */
    public ejecutarQuery(sql: string): void {
        this.numeroDeConexionesActivas++;
        console.log(
            '%c[DB] Ejecutando: "%s" | Conexiones usadas: %d',
            COLORS.princessPink,
            sql,
            this.numeroDeConexionesActivas,
        );
    }
}

/**
 * Cliente (Client)
 * --------------------------------------------------------------------------
 * Modulos que consumen el mismo singleton sin acoplarse a su construccion.
 */

// Módulo 1: Carrito de Compras
class ServicioCarrito {
    public agregarItem(): void {
        const db = DatabaseManager.getInstance();
        db.ejecutarQuery('INSERT INTO carrito VALUES (laptop)');
    }
}

// Módulo 2: Facturación
class ServicioFacturacion {
    public generarCobro(): void {
        const db = DatabaseManager.getInstance();
        db.ejecutarQuery('SELECT * FROM tarjetas WHERE id = 123');
    }
}

/**
 * Ejecución simulada.
 */
function main(): void {
    console.log('%c--- Iniciando servidor ---', COLORS.unicornPurple);

    const carrito = new ServicioCarrito();
    const facturacion = new ServicioFacturacion();

    // El carrito es el primero en pedir la DB, por lo que se inicializa.
    carrito.agregarItem();

    // La facturación pide la DB, pero ya existe y reutiliza la misma instancia.
    facturacion.generarCobro();

    // Comprobación de que ambos módulos usan exactamente el mismo objeto en memoria.
    const db1 = DatabaseManager.getInstance();
    const db2 = DatabaseManager.getInstance();

    console.log(
        '%c¿Son exactamente la misma instancia en memoria? %s',
        COLORS.brown,
        db1 === db2,
    );
}

main();