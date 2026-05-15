/**
 * Pausa la ejecucion por la cantidad de milisegundos indicada.
 */
export function sleep(milliseconds: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
