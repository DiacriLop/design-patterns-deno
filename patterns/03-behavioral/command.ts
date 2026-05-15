/**
 * ! Patron Command
 *
 * ¿Que hace el patron?
 * --------------------------------------------------------------------------
 * Encapsula una solicitud como un objeto, permitiendo parametrizar acciones,
 * encolar solicitudes y desacoplar el invocador del receptor.
 *
 * ¿Que problema se esta resolviendo?
 * --------------------------------------------------------------------------
 * Un sistema de pedidos necesita ejecutar acciones distintas (crear, cancelar,
 * marcar enviado) sin que el menu o la interfaz conozcan la logica interna.
 *
 * ¿Por que este patron es adecuado?
 * --------------------------------------------------------------------------
 * Cada accion es un comando independiente. El invocador solo dispara comandos
 * y el receptor se encarga de la operacion real. Esto permite agregar nuevas
 * acciones sin modificar la interfaz.
 *
 * Caso de uso real:
 * --------------------------------------------------------------------------
 * Paneles administrativos donde se ejecutan operaciones sobre pedidos,
 * tickets o transacciones de forma desacoplada.
 *
 * Referencia:
 * https://refactoring.guru/es/design-patterns/command
 */

import { COLORS } from '../../helpers/colors.ts';

/**
 * Command
 * --------------------------------------------------------------------------
 * Interfaz comun para todos los comandos.
 */
interface Command {
	execute(): void;
}

/**
 * Receiver
 * --------------------------------------------------------------------------
 * Contiene la logica real de negocio.
 */
/**
 * Estados posibles del pedido para validar transiciones.
 */
type OrderStatus = 'Creado' | 'Cancelado' | 'Enviado';

/**
 * Servicio de pedidos que conoce la logica y el estado real.
 */
class OrderService {
  private orders: Map<string, OrderStatus> = new Map();

	/**
	 * Crea un pedido si aun no existe.
	 */
  createOrder(orderId: string, customer: string): void {
    if (this.orders.has(orderId)) {
      console.log('%c[Pedido] Ya existe el pedido: %s', COLORS.red, orderId);
      return;
    }
    this.orders.set(orderId, 'Creado');
    console.log('%c[Pedido] Creado %s para %s', COLORS.green, orderId, customer);
  }

	/**
	 * Cancela un pedido solo si existe y no fue enviado.
	 */
  cancelOrder(orderId: string): void {
    const status = this.orders.get(orderId);
    if (!status) {
      console.log('%c[Pedido] No existe el pedido: %s', COLORS.red, orderId);
      return;
    }
    if (status === 'Cancelado') {
      console.log('%c[Pedido] Ya esta cancelado: %s', COLORS.yellow, orderId);
      return;
    }
    if (status === 'Enviado') {
      console.log('%c[Pedido] No se puede cancelar un pedido enviado: %s', COLORS.red, orderId);
      return;
    }
    this.orders.set(orderId, 'Cancelado');
    console.log('%c[Pedido] Cancelado %s', COLORS.yellow, orderId);
  }

	/**
	 * Marca un pedido como enviado si esta creado.
	 */
  shipOrder(orderId: string): void {
    const status = this.orders.get(orderId);
    if (!status) {
      console.log('%c[Pedido] No existe el pedido: %s', COLORS.red, orderId);
      return;
    }
    if (status === 'Cancelado') {
      console.log('%c[Pedido] No se puede enviar un pedido cancelado: %s', COLORS.red, orderId);
      return;
    }
    if (status === 'Enviado') {
      console.log('%c[Pedido] Ya esta enviado: %s', COLORS.yellow, orderId);
      return;
    }
    this.orders.set(orderId, 'Enviado');
    console.log('%c[Pedido] Enviado %s', COLORS.princessPink, orderId);
  }
}

/**
 * Concrete Commands
 * --------------------------------------------------------------------------
 * Encapsulan una accion y delegan en el receptor.
 */
class CreateOrderCommand implements Command {
	private receiver: OrderService;
	private orderId: string;
	private customer: string;

	/**
	 * Recibe el servicio y los datos necesarios para crear el pedido.
	 */
	constructor(receiver: OrderService, orderId: string, customer: string) {
		this.receiver = receiver;
		this.orderId = orderId;
		this.customer = customer;
	}

	/**
	 * Ejecuta la creacion del pedido.
	 */
	execute(): void {
		this.receiver.createOrder(this.orderId, this.customer);
	}
}

class CancelOrderCommand implements Command {
	private receiver: OrderService;
	private orderId: string;

	/**
	 * Recibe el servicio y el identificador del pedido.
	 */
	constructor(receiver: OrderService, orderId: string) {
		this.receiver = receiver;
		this.orderId = orderId;
	}

	/**
	 * Ejecuta la cancelacion del pedido.
	 */
	execute(): void {
		this.receiver.cancelOrder(this.orderId);
	}
}

class ShipOrderCommand implements Command {
	private receiver: OrderService;
	private orderId: string;

	/**
	 * Recibe el servicio y el identificador del pedido.
	 */
	constructor(receiver: OrderService, orderId: string) {
		this.receiver = receiver;
		this.orderId = orderId;
	}

	/**
	 * Ejecuta el envio del pedido.
	 */
	execute(): void {
		this.receiver.shipOrder(this.orderId);
	}
}

/**
 * Invoker
 * --------------------------------------------------------------------------
 * Almacena y ejecuta comandos sin conocer sus detalles.
 */
class OrderConsole {
	private commands: Record<string, Command> = {};

	/**
	 * Asigna un comando a una opcion del menu.
	 */
	setCommand(option: string, command: Command): void {
		this.commands[option] = command;
	}

	/**
	 * Ejecuta el comando asociado a la opcion seleccionada.
	 */
	run(option: string): void {
		if (!this.commands[option]) {
			console.log('%cOpcion invalida. Intenta de nuevo.', COLORS.red);
			return;
		}
		this.commands[option].execute();
	}
}

/**
 * Client
 * --------------------------------------------------------------------------
 * Crea comandos y los asigna al invocador.
 */
function main(): void {
	const receiver = new OrderService();
	const consoleMenu = new OrderConsole();

	let continueProgram = true;

	do {
		console.clear();

		// Menu principal de acciones disponibles.
		const option = prompt(
			'Menu de pedidos:\n' +
				'1. Crear pedido\n' +
				'2. Cancelar pedido\n' +
				'3. Marcar pedido como enviado\n' +
				'Opcion: '
		) ?? '';

		const orderId = prompt('Id del pedido: ') ?? '';
		const customer = option === '1' ? (prompt('Cliente: ') ?? '') : '';

		// Se crea el comando segun la opcion.
		if (option === '1') {
			consoleMenu.setCommand('1', new CreateOrderCommand(receiver, orderId, customer));
		}

		if (option === '2') {
			consoleMenu.setCommand('2', new CancelOrderCommand(receiver, orderId));
		}

		if (option === '3') {
			consoleMenu.setCommand('3', new ShipOrderCommand(receiver, orderId));
		}

		// El invocador ejecuta el comando sin conocer detalles internos.
		consoleMenu.run(option);

		const continueResponse = prompt('¿Deseas continuar? (y/n) ')?.toLowerCase();
		continueProgram = continueResponse !== 'n';
	} while (continueProgram);
}

main();
