/**
 * ! Patrón Builder
 *
 * ¿Qué hace el patrón?
 * --------------------------------------------------------------------------
 * El patrón Builder permite construir objetos complejos paso a paso.
 * Separa el proceso de construcción de la representación final del objeto,
 * permitiendo crear diferentes configuraciones utilizando el mismo código.
 *
 * ¿Qué problema se está resolviendo?
 * --------------------------------------------------------------------------
 * En una pizzería, una pizza puede tener muchas configuraciones:
 * tamaño, tipo de masa, salsa, queso extra e ingredientes.
 *
 * Si se utilizara un constructor tradicional, sería necesario enviar
 * muchos parámetros, incluso algunos opcionales, lo que haría el código
 * difícil de leer y mantener.
 *
 * Ejemplo del problema:
 * new Pizza('Grande', 'Delgada', true, 'Pepperoni', 'Tomate');
 *
 * En este caso no es evidente qué representa cada parámetro.
 *
 * ¿Por qué este patrón es adecuado para solucionar el problema?
 * --------------------------------------------------------------------------
 * Builder permite construir la pizza paso a paso, configurando únicamente
 * las características necesarias.
 *
 * Esto hace que el código sea más claro, flexible y fácil de extender.
 * Además, permite crear diferentes tipos de pizza reutilizando el mismo
 * proceso de construcción.
 *
 * Ejemplo con Builder:
 * new PizzaBuilder()
 *   .setSize('Grande')
 *   .setCrust('Delgada')
 *   .setCheese(true)
 *   .setToppings('Pepperoni')
 *   .setSauce('Tomate')
 *   .build();
 *
 * Caso de uso real:
 * --------------------------------------------------------------------------
 * Aplicaciones como Domino's Pizza permiten al cliente personalizar su
 * pedido seleccionando paso a paso las características de la pizza.
 *
 * Referencia:
 * https://refactoring.guru/es/design-patterns/builder
 */

import { COLORS } from '../../helpers/colors.ts';

/**
 * Producto (Product)
 * --------------------------------------------------------------------------
 * Representa el objeto complejo que se desea construir.
 *
 * En este ejemplo, la clase Pizza contiene todas las propiedades que
 * pueden configurarse mediante el builder.
 */
class Pizza {
    /**
     * Tamaño de la pizza.
     * Ejemplos: Pequeña, Mediana, Grande, Extra Grande.
     */
    public size: string = 'Tamaño no definido';

    /**
     * Tipo de masa.
     * Ejemplos: Delgada, Gruesa, Integral, Original.
     */
    public crust: string = 'Masa no definida';

    /**
     * Indica si la pizza incluye queso extra.
     */
    public cheese: boolean = false;

    /**
     * Ingredientes principales de la pizza.
     */
    public toppings: string = 'Sin ingredientes';

    /**
     * Tipo de salsa.
     * Ejemplos: Tomate, BBQ, Pesto.
     */
    public sauce: string = 'Salsa no definida';

    /**
     * Muestra en consola la configuración final de la pizza.
     *
     * Este método permite visualizar el resultado del proceso de construcción.
     */
    displayConfiguration(): void {
        console.log(`
    🍕 Configuración de la Pizza
    ---------------------------------
    Tamaño: ${this.size}
    Masa: ${this.crust}
    Queso extra: ${this.cheese ? 'Sí' : 'No'}
    Ingredientes: ${this.toppings}
    Salsa: ${this.sauce}
    `);
    }
}

/**
 * Concrete Builder (Builder Concreto)
 * --------------------------------------------------------------------------
 * Se encarga de construir una instancia de Pizza paso a paso.
 *
 * Cada método configura una propiedad específica del producto y retorna
 * la misma instancia del builder para permitir el encadenamiento
 * de métodos (method chaining).
 */
class PizzaBuilder {
    /**
     * Instancia de la pizza que se está construyendo.
     */
    private pizza: Pizza;

    /**
     * Inicializa una nueva pizza con valores por defecto.
     */
    constructor() {
        this.pizza = new Pizza();
    }

    /**
     * Define el tamaño de la pizza.
     */
    setSize(size: string): PizzaBuilder {
        this.pizza.size = size;
        return this;
    }

    /**
     * Define el tipo de masa.
     */
    setCrust(crust: string): PizzaBuilder {
        this.pizza.crust = crust;
        return this;
    }

    /**
     * Define si la pizza tendrá queso extra.
     */
    setCheese(cheese: boolean): PizzaBuilder {
        this.pizza.cheese = cheese;
        return this;
    }

    /**
     * Define los ingredientes principales.
     */
    setToppings(toppings: string): PizzaBuilder {
        this.pizza.toppings = toppings;
        return this;
    }

    /**
     * Define el tipo de salsa.
     */
    setSauce(sauce: string): PizzaBuilder {
        this.pizza.sauce = sauce;
        return this;
    }

    /**
     * Finaliza la construcción y retorna la pizza completamente configurada.
     *
     * Este método representa el último paso del patrón Builder.
     */
    build(): Pizza {
        return this.pizza;
    }
}

/**
 * Cliente (Client)
 * --------------------------------------------------------------------------
 * Utiliza el builder para crear diferentes configuraciones del producto.
 *
 * El cliente no necesita conocer los detalles internos de la construcción;
 * únicamente invoca los métodos del builder en el orden deseado.
 */
function main(): void {
    /**
     * Construcción de una pizza clásica de pepperoni.
     */
    const pepperoniPizza = new PizzaBuilder()
        .setSize('Mediana')
        .setCrust('Delgada')
        .setCheese(true)
        .setToppings('Pepperoni')
        .setSauce('Tomate')
        .build();

    console.log('%c🍕 Pizza de Pepperoni', COLORS.princessPink);
    pepperoniPizza.displayConfiguration();

    /**
     * Construcción de una pizza colombiana.
     *
     * Demuestra cómo el mismo builder puede utilizarse para crear
     * una configuración completamente diferente.
     */
    const colombianaPizza = new PizzaBuilder()
        .setSize('Extra Grande')
        .setCrust('Original')
        .setCheese(true)
        .setToppings('Chorizo, tocineta y maiz tierno')
        .setSauce('BBQ')
        .build();

    console.log('%c🍕 Pizza Colombiana', COLORS.unicornPurple);
    colombianaPizza.displayConfiguration();
}

/**
 * Punto de entrada del programa.
 */
main();