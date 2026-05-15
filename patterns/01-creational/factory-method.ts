/**
 * ! Patron Factory Method (Ejemplo: Uber)
 *
 * ¿Que hace el patron?
 * --------------------------------------------------------------------------
 * Define una interfaz para crear objetos, pero permite que las subclases
 * decidan que clase concreta instanciar.
 *
 * ¿Que problema se esta resolviendo?
 * --------------------------------------------------------------------------
 * El sistema central (servidor) necesita procesar un viaje sin acoplarse
 * a clases concretas de vehiculos (UberX, UberBlack, etc).
 *
 * ¿Por que este patron es adecuado?
 * --------------------------------------------------------------------------
 * Cada servicio decide que vehiculo crear y el flujo central se mantiene
 * estable. Se pueden agregar nuevos servicios sin tocar el cliente.
 *
 * Caso de uso real:
 * --------------------------------------------------------------------------
 * Plataformas de movilidad que crean distintos tipos de transporte segun
 * la categoria seleccionada por el usuario.
 *
 * Referencia:
 * https://refactoring.guru/es/design-patterns/factory-method
 */

/**
 * Producto (Product)
 * --------------------------------------------------------------------------
 * Interfaz comun para todos los transportes.
 */
interface Transporte {
    iniciarRuta(origen: string, destino: string): void;
}

/**
 * Productos Concretos (Concrete Products)
 * --------------------------------------------------------------------------
 * Implementaciones especificas de transporte.
 */
class AutoEstandar implements Transporte {
    iniciarRuta(origen: string, destino: string): void {
        console.log(`UberX: Llevando pasajero de ${origen} a ${destino} en auto estandar.`);
    }
}

class AutoLujo implements Transporte {
    iniciarRuta(origen: string, destino: string): void {
        console.log(`Uber Black: Chofer con traje llevando pasajero a ${destino}.`);
    }
}

/**
 * Creador (Creator)
 * --------------------------------------------------------------------------
 * Declara el Factory Method y contiene la logica de negocio.
 */
abstract class ServicioDeViaje {
    // Factory Method: lo implementan las subclases
    protected abstract crearTransporte(): Transporte;

    // Flujo central que usa el producto
    public procesarSolicitud(origen: string, destino: string): void {
        console.log("Buscando conductor cercano...");
        const transporte = this.crearTransporte();
        transporte.iniciarRuta(origen, destino);
        console.log("Viaje completado. Procesando cobro.");
    }
}

/**
 * Creadores Concretos (Concrete Creators)
 * --------------------------------------------------------------------------
 * Cada servicio decide que producto crear.
 */
class ServicioUberX extends ServicioDeViaje {
    protected crearTransporte(): Transporte {
        return new AutoEstandar();
    }
}

class ServicioUberBlack extends ServicioDeViaje {
    protected crearTransporte(): Transporte {
        return new AutoLujo();
    }
}

/**
 * Cliente (Client)
 * --------------------------------------------------------------------------
 * Selecciona el servicio y dispara el flujo sin conocer clases concretas.
 */
function main(): void {
    let servicio: ServicioDeViaje;

    // Esto vendria de la seleccion del usuario en la app
    const tipoSolicitado = prompt("...") as "X" | "BLACK";

    switch (tipoSolicitado) {
        case "X":
            servicio = new ServicioUberX();
            break;
        case "BLACK":
            servicio = new ServicioUberBlack();
            break;
        default:
            throw new Error("Tipo de servicio no valido");
    }

    servicio.procesarSolicitud("Aeropuerto", "Hotel Centro");
}

main();