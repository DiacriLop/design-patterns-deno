import { COLORS } from '../../helpers/colors.ts';
import { sleep } from '../../helpers/sleep.ts';
/**
 * ! Patron State
 *
 * ¿Que hace el patron?
 * --------------------------------------------------------------------------
 * Permite que un objeto cambie su comportamiento cuando su estado interno
 * cambia, sin depender de multiples condicionales en el cliente.
 *
 * ¿Que problema se esta resolviendo?
 * --------------------------------------------------------------------------
 * En un flujo de viaje, cada etapa (solicitado, asignado, en curso, finalizado
 * o cancelado) tiene reglas distintas. Manejarlo con if/else genera acoplamiento
 * y dificulta agregar o modificar estados.
 *
 * ¿Por que este patron es adecuado?
 * --------------------------------------------------------------------------
 * Cada estado encapsula su propio comportamiento y transiciones. El contexto
 * delega y puede cambiar de estado sin afectar al resto del sistema.
 *
 * Caso de uso real:
 * --------------------------------------------------------------------------
 * Apps de movilidad donde el viaje pasa por etapas y cada una habilita acciones
 * distintas para usuario y conductor.
 *
 * Referencia:
 * https://refactoring.guru/es/design-patterns/state
 *

 * Objetivo:
 * --------------------------------------------------------------------------
 * Implementar el patron State para simular el flujo de un viaje en una
 * aplicacion de transporte (solicitar, asignar conductor, iniciar viaje,
 * finalizar o cancelar).
 */




/**
 * State
 * --------------------------------------------------------------------------
 * Define las acciones disponibles para cada estado.
 */
interface State {
	name: string;

	requestRide(): void;
	assignDriver(): void;
	startTrip(): void;
	finishTrip(): void;
	cancelTrip(): void;
}

/**
 * Context
 * --------------------------------------------------------------------------
 * Mantiene el estado actual y delega el comportamiento.
 */
class RideService {
	private state: State;

	constructor() {
		this.state = new RideRequested(this);
	}

	requestRide(): void {
		this.state.requestRide();
	}

	assignDriver(): void {
		this.state.assignDriver();
	}

	startTrip(): void {
		this.state.startTrip();
	}

	finishTrip(): void {
		this.state.finishTrip();
	}

	cancelTrip(): void {
		this.state.cancelTrip();
	}

	setState(newState: State): void {
		this.state = newState;
		console.log('%cEstado cambiado a: %s', COLORS.yellow, newState.name);
	}

	getStateName(): string {
		return this.state.name;
	}
}

/**
 * Estados Concretos
 * --------------------------------------------------------------------------
 * Cada estado controla el comportamiento permitido en esa etapa.
 */
class RideRequested implements State {
	public name: string = 'Viaje solicitado';
	private service: RideService;

	constructor(service: RideService) {
		this.service = service;
	}

	requestRide(): void {
		console.log('%cYa existe una solicitud en curso.', COLORS.red);
	}

	assignDriver(): void {
		console.log('%cConductor asignado. Puedes iniciar el viaje.', COLORS.green);
		this.service.setState(new DriverAssigned(this.service));
	}

	startTrip(): void {
		console.log('%cPrimero asigna un conductor.', COLORS.red);
	}

	finishTrip(): void {
		console.log('%cNo hay un viaje en curso.', COLORS.red);
	}

	cancelTrip(): void {
		console.log('%cSolicitud cancelada por el usuario.', COLORS.yellow);
		this.service.setState(new RideCanceled(this.service));
	}
}

class DriverAssigned implements State {
	public name: string = 'Conductor asignado';
	private service: RideService;

	constructor(service: RideService) {
		this.service = service;
	}

	requestRide(): void {
		console.log('%cLa solicitud ya esta creada.', COLORS.red);
	}

	assignDriver(): void {
		console.log('%cYa hay un conductor asignado.', COLORS.red);
	}

	startTrip(): void {
		console.log('%cViaje iniciado.', COLORS.green);
		this.service.setState(new TripInProgress(this.service));
	}

	finishTrip(): void {
		console.log('%cNo puedes finalizar antes de iniciar.', COLORS.red);
	}

	cancelTrip(): void {
		console.log('%cViaje cancelado antes de iniciar.', COLORS.yellow);
		this.service.setState(new RideCanceled(this.service));
	}
}

class TripInProgress implements State {
	public name: string = 'En viaje';
	private service: RideService;

	constructor(service: RideService) {
		this.service = service;
	}

	requestRide(): void {
		console.log('%cYa estas en un viaje.', COLORS.red);
	}

	assignDriver(): void {
		console.log('%cEl conductor ya esta en ruta.', COLORS.red);
	}

	startTrip(): void {
		console.log('%cEl viaje ya esta iniciado.', COLORS.red);
	}

	finishTrip(): void {
		console.log('%cViaje finalizado. Gracias por usar el servicio.', COLORS.green);
		this.service.setState(new TripCompleted(this.service));
	}

	cancelTrip(): void {
		console.log('%cNo puedes cancelar un viaje en curso.', COLORS.red);
	}
}

class TripCompleted implements State {
	public name: string = 'Viaje finalizado';
	private service: RideService;

	constructor(service: RideService) {
		this.service = service;
	}

	requestRide(): void {
		console.log('%cCreando nueva solicitud de viaje.', COLORS.green);
		this.service.setState(new RideRequested(this.service));
	}

	assignDriver(): void {
		console.log('%cDebes solicitar un viaje primero.', COLORS.red);
	}

	startTrip(): void {
		console.log('%cDebes solicitar un viaje primero.', COLORS.red);
	}

	finishTrip(): void {
		console.log('%cEl viaje ya finalizo.', COLORS.red);
	}

	cancelTrip(): void {
		console.log('%cNo puedes cancelar un viaje finalizado.', COLORS.red);
	}
}

class RideCanceled implements State {
	public name: string = 'Viaje cancelado';
	private service: RideService;

	constructor(service: RideService) {
		this.service = service;
	}

	requestRide(): void {
		console.log('%cCreando una nueva solicitud.', COLORS.green);
		this.service.setState(new RideRequested(this.service));
	}

	assignDriver(): void {
		console.log('%cDebes solicitar un viaje primero.', COLORS.red);
	}

	startTrip(): void {
		console.log('%cDebes solicitar un viaje primero.', COLORS.red);
	}

	finishTrip(): void {
		console.log('%cNo hay un viaje activo.', COLORS.red);
	}

	cancelTrip(): void {
		console.log('%cEl viaje ya esta cancelado.', COLORS.red);
	}
}

/**
 * Cliente
 * --------------------------------------------------------------------------
 * Simula la interaccion del usuario con el sistema.
 */
async function main(): Promise<void> {
	const rideService = new RideService();

	let selectedOption: string | null = '6';

	do {
		console.clear();
		console.log('Estado actual: %c%s', COLORS.blue, rideService.getStateName());

		selectedOption = prompt(
			'Selecciona una opcion:\n' +
				'1. Solicitar viaje\n' +
				'2. Asignar conductor\n' +
				'3. Iniciar viaje\n' +
				'4. Finalizar viaje\n' +
				'5. Cancelar viaje\n' +
				'6. Salir\n' +
				'Opcion: '
		);

		switch (selectedOption) {
			case '1':
				rideService.requestRide();
				break;
			case '2':
				rideService.assignDriver();
				break;
			case '3':
				rideService.startTrip();
				break;
			case '4':
				rideService.finishTrip();
				break;
			case '5':
				rideService.cancelTrip();
				break;
			case '6':
				console.log('Saliendo del sistema...');
				break;
			default:
				console.log('%cOpcion no valida.', COLORS.red);
		}

		await sleep(2500);
	} while (selectedOption !== '6');
}

main();
