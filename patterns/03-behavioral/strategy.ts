/**
 * ! Patrón Strategy
 *
 * El patrón Strategy es un patrón de diseño de software que define una
 * familia de algoritmos, los encapsula y los hace intercambiables.
 *
 * * Es útil cuando se tiene una clase que tiene un comportamiento que puede
 * * cambiar en tiempo de ejecución y se quiere delegar la responsabilidad de
 * * la implementación a otra clase.
 *
 * ¿Qué problema se está resolviendo?
 * --------------------------------------------------------------------------
 * En videojuegos como Pokémon cada criatura puede usar diferentes ataques:
 *
 * - eléctricos
 * - fuego
 * - agua
 * - planta
 *
 * El problema aparece cuando un Pokémon necesita cambiar
 * dinámicamente su forma de atacar durante una batalla.
 *
 * Sin Strategy el código terminaría lleno de condicionales:
 *
 * if (attack === 'electric')
 * if (attack === 'fire')
 * if (attack === 'water')
 *
 * generando clases difíciles de mantener.
 *
 * ¿Por qué este patrón es adecuado?
 * --------------------------------------------------------------------------
 * Strategy permite encapsular cada ataque en una estrategia independiente.
 *
 * Así:
 *
 * - Los ataques pueden cambiar dinámicamente
 * - El Pokémon no conoce detalles internos del ataque
 * - Se evita código repetido
 * - Es fácil agregar nuevos ataques
 *
 * https://refactoring.guru/es/design-patterns/strategy
 */

import { COLORS } from "../../helpers/colors.ts";

/**
 * !Objetivo: Explicar el patrón Strategy usando un ejemplo donde
 * ! diferentes Pokémon utilizan distintas estrategias de ataque
 * ! durante una batalla.
 */

/**
 * --------------------------------------------------------------------------
 * 1. Strategy Interface
 * --------------------------------------------------------------------------
 * Todos los ataques deben implementar executeAttack()
 */
interface AttackStrategy {
    executeAttack(): void;
}

/**
 * --------------------------------------------------------------------------
 * 2. Concrete Strategies
 * --------------------------------------------------------------------------
 * Diferentes estrategias de ataque Pokémon.
 */

/**
 * Estrategia #1 Ataque eléctrico
 */
class ThunderboltAttack implements AttackStrategy {

    executeAttack(): void {
        console.log(
            '%c⚡ Pikachu usa Thunderbolt!\n',
            COLORS.butterYellow
        );
    }
}

/**
 * Estrategia #2 Ataque de fuego
 */
class FlamethrowerAttack implements AttackStrategy {

    executeAttack(): void {
        console.log(
            '%c🔥 Charizard usa Flamethrower!\n',
            COLORS.orange
        );
    }
}

/**
 * Estrategia #3 Ataque de agua
 */
class HydroPumpAttack implements AttackStrategy {

    executeAttack(): void {
        console.log(
            '%c💧 Blastoise usa Hydro Pump!\n',
            COLORS.skyBlue
        );
    }
}

/**
 * Estrategia #4 Ataque planta
 */
class LeafBladeAttack implements AttackStrategy {

    executeAttack(): void {
        console.log(
            '%c🌿 Sceptile usa Leaf Blade!\n',
            COLORS.green
        );
    }
}

/**
 * --------------------------------------------------------------------------
 * 3. Context
 * --------------------------------------------------------------------------
 * Representa un Pokémon que puede cambiar dinámicamente
 * su estrategia de ataque.
 */
class Pokemon {

    // 'name' es readonly porque no cambia después de la construcción
    readonly name: string;

    private attackStrategy: AttackStrategy;

    constructor(name: string, strategy: AttackStrategy) {
        this.name = name;
        this.attackStrategy = strategy;

        console.log(
            `%c${name} %cestá listo para la batalla`,
            COLORS.princessPink,
            COLORS.white
        );
    }

    /**
     * Ejecutar ataque actual
     */
    performAttack(): void {
        console.log(`${this.name} se prepara para atacar...`);
        this.attackStrategy.executeAttack();
    }

    /**
     * Cambiar estrategia de ataque en tiempo de ejecución.
     * Esto demuestra el poder del patrón Strategy: cualquier Pokémon
     * puede usar cualquier ataque sin importar si le "pertenece" o no,
     * lo que permite simular efectos de batalla como copiar habilidades.
     */
    setAttackStrategy(strategy: AttackStrategy): void {
        this.attackStrategy = strategy;

        console.log(
            `%c${this.name} cambió de estrategia de ataque`,
            COLORS.lilac
        );
    }
}

/**
 * --------------------------------------------------------------------------
 * 4. Cliente (Client)
 * --------------------------------------------------------------------------
 * Simulación de combate Pokémon usando Strategy.
 */
function main(): void {

    console.log(
        '%c🎮 INICIANDO BATALLA POKÉMON 🎮',
        COLORS.barbiePink
    );

    /**
     * Crear Pokémon con sus estrategias de ataque iniciales
     */
    const pikachu   = new Pokemon('Pikachu',   new ThunderboltAttack());
    const charizard = new Pokemon('Charizard',  new FlamethrowerAttack());
    const blastoise = new Pokemon('Blastoise',  new HydroPumpAttack());

    /**
     * Comienza la batalla
     */
    console.log(
        '%c⚔️ Comienza la batalla Pokémon ⚔️\n',
        COLORS.red
    );

    pikachu.performAttack();
    charizard.performAttack();
    blastoise.performAttack();

    /**
     * Pikachu cambia de estrategia (p. ej. aprendió un nuevo movimiento).
     * Nota: usar un ataque de otro Pokémon es intencional para demostrar
     * que Strategy desacopla al portador del comportamiento.
     */
    pikachu.setAttackStrategy(new LeafBladeAttack());
    pikachu.performAttack();

    /**
     * Pikachu vuelve a cambiar de estrategia en plena batalla
     */
    pikachu.setAttackStrategy(new FlamethrowerAttack());
    pikachu.performAttack();

    console.log(
        '%c✨ Las estrategias cambiaron dinámicamente gracias a Strategy ✨',
        COLORS.pastelPink
    );
}

/**
 * Punto de entrada del programa
 */
main();