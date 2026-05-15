/**
 * ! Patrón Flyweight
 *
 * ¿Qué hace el patrón?
 * --------------------------------------------------------------------------
 * El patrón Flyweight permite compartir objetos para soportar eficientemente
 * grandes cantidades de instancias similares.
 *
 * En lugar de crear miles de objetos repetidos con la misma información,
 * Flyweight reutiliza objetos compartidos y solo almacena los datos únicos
 * de cada instancia.
 *
 * ¿Qué problema se está resolviendo?
 * --------------------------------------------------------------------------
 * En videojuegos como Minecraft existen millones de bloques en el mapa.
 *
 * Muchos bloques comparten exactamente las mismas características:
 *
 * - Tipo de bloque
 * - Textura
 * - Color
 * - Dureza
 * - Resistencia
 *
 * El problema aparece cuando se crea un objeto completo para cada bloque:
 *
 * new BlockType("Grass", "grass.png", "Green", 2, 10)
 * new BlockType("Grass", "grass.png", "Green", 2, 10)
 * new BlockType("Grass", "grass.png", "Green", 2, 10)
 *
 * Esto consume muchísima memoria innecesariamente.
 *
 * ¿Por qué este patrón es adecuado?
 * --------------------------------------------------------------------------
 * Flyweight permite compartir los tipos de bloques.
 *
 * Así:
 *
 * - Solo existe un bloque tipo Grass
 * - Solo existe un bloque tipo Stone
 * - Solo existe un bloque tipo Water
 *
 * Cada bloque individual solo almacena:
 *
 * - posición X
 * - posición Y
 * - posición Z
 *
 * reduciendo enormemente el consumo de memoria.
 *
 * Referencia:
 * https://refactoring.guru/es/design-patterns/flyweight
 */

import { COLORS } from '../../helpers/colors.ts';

/**
 * --------------------------------------------------------------------------
 * 1. Flyweight
 * --------------------------------------------------------------------------
 * Representa el tipo de bloque compartido.
 *
 * Contiene el estado intrínseco:
 * información que NO cambia entre bloques del mismo tipo.
 */
class BlockType {
  private name: string;
  private texture: string;
  private color: string;
  private hardness: number;
  private resistance: number;

  constructor(
    name: string,
    texture: string,
    color: string,
    hardness: number,
    resistance: number,
  ) {
    this.name = name;
    this.texture = texture;
    this.color = color;
    this.hardness = hardness;
    this.resistance = resistance;
  }

  getName(): string {
    return this.name;
  }

  getTexture(): string {
    return this.texture;
  }

  getColor(): string {
    return this.color;
  }

  getHardness(): number {
    return this.hardness;
  }

  getResistance(): number {
    return this.resistance;
  }
}

/**
 * --------------------------------------------------------------------------
 * 2. Flyweight Factory
 * --------------------------------------------------------------------------
 * Reutiliza los tipos de bloques existentes.
 */
class BlockTypeFactory {
  private blockTypes: Record<string, BlockType> = {};

  getBlockType(
    name: string,
    texture: string,
    color: string,
    hardness: number,
    resistance: number,
  ): BlockType {

    /**
     * Clave única del bloque
     */
    const key = `${name}-${texture}-${color}-${hardness}-${resistance}`;

    /**
     * Si el bloque no existe, se crea una sola vez
     */
    if (!this.blockTypes[key]) {

      console.log(
        `%cCreando BlockType compartido: ${key}`,
        COLORS.barbiePink,
      );

      this.blockTypes[key] = new BlockType(
        name,
        texture,
        color,
        hardness,
        resistance,
      );
    }

    /**
     * Se reutiliza la misma instancia
     */
    return this.blockTypes[key];
  }
}

/**
 * --------------------------------------------------------------------------
 * 3. Context
 * --------------------------------------------------------------------------
 * Representa un bloque individual dentro del mundo.
 *
 * Contiene el estado extrínseco:
 * información única de cada bloque.
 */
class Block {
  private x: number;
  private y: number;
  private z: number;
  private blockType: BlockType;

  constructor(
    x: number,
    y: number,
    z: number,
    blockType: BlockType,
  ) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.blockType = blockType;
  }

  render(): void {

    const text = `
      🧱 Bloque: %c${this.blockType.getName()}
      %cPosición: (${this.x}, ${this.y}, ${this.z})
      Textura: ${this.blockType.getTexture()}
      Color: ${this.blockType.getColor()}
      Dureza: ${this.blockType.getHardness()}
      Resistencia: ${this.blockType.getResistance()}
    `;

    console.log(
      text,
      COLORS.skyBlue,
      COLORS.white,
    );
  }
}

/**
 * --------------------------------------------------------------------------
 * 4. Sistema de generación de bloques
 * --------------------------------------------------------------------------
 * Gestiona la creación de bloques reutilizando Flyweights.
 */
class WorldGenerator {
  private blocks: Block[] = [];
  private factory: BlockTypeFactory;

  constructor(factory: BlockTypeFactory) {
    this.factory = factory;
  }

  placeBlock(
    x: number,
    y: number,
    z: number,
    name: string,
    texture: string,
    color: string,
    hardness: number,
    resistance: number,
  ): void {

    /**
     * Obtiene o reutiliza el BlockType
     */
    const blockType = this.factory.getBlockType(
      name,
      texture,
      color,
      hardness,
      resistance,
    );

    /**
     * Crea el bloque individual
     */
    const block = new Block(
      x,
      y,
      z,
      blockType,
    );

    this.blocks.push(block);

    block.render();
  }

  getBlockCount(): number {
    return this.blocks.length;
  }
}

/**
 * --------------------------------------------------------------------------
 * 5. Cliente (Client)
 * --------------------------------------------------------------------------
 * Simulación de generación de bloques estilo Minecraft.
 */
function main(): void {

  const factory = new BlockTypeFactory();

  const world = new WorldGenerator(factory);

  console.log(
    '%c⛏️ GENERANDO MUNDO DE BLOQUES ⛏️',
    COLORS.princessPink,
  );

  /**
   * Grass Blocks
   */
  world.placeBlock(
    0,
    0,
    0,
    'Grass',
    'grass.png',
    'Green',
    2,
    10,
  );

  world.placeBlock(
    1,
    0,
    0,
    'Grass',
    'grass.png',
    'Green',
    2,
    10,
  );

  /**
   * Stone Blocks
   */
  world.placeBlock(
    2,
    0,
    0,
    'Stone',
    'stone.png',
    'Gray',
    5,
    30,
  );

  world.placeBlock(
    3,
    0,
    0,
    'Stone',
    'stone.png',
    'Gray',
    5,
    30,
  );

  /**
   * Water Blocks
   */
  world.placeBlock(
    4,
    0,
    0,
    'Water',
    'water.png',
    'Blue',
    0,
    1,
  );

  world.placeBlock(
    5,
    0,
    0,
    'Water',
    'water.png',
    'Blue',
    0,
    1,
  );

  console.log(
    `\n%cTotal de bloques generados: ${world.getBlockCount()}`,
    COLORS.butterYellow,
  );

}

/**
 * Punto de entrada del programa
 */
main();