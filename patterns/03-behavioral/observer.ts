/**
 * ! Patrón Observer
 *
 * ¿Qué hace el patrón?
 * --------------------------------------------------------------------------
 * El patrón Observer establece una relación de uno a muchos
 * entre un objeto llamado Subject y múltiples objetos llamados Observers.
 *
 * Cuando el Subject cambia su estado, todos los Observers son
 * notificados automáticamente.
 *
 * ¿Qué problema se está resolviendo?
 * --------------------------------------------------------------------------
 * En aplicaciones como Spotify millones de usuarios siguen
 * artistas para recibir notificaciones cuando lanzan:
 *
 * - nuevos álbumes
 * - canciones
 * - EPs
 * - conciertos
 *
 * El problema es que Spotify necesitaría avisar manualmente
 * a cada usuario cada vez que ocurre un lanzamiento.
 *
 * Ejemplo del problema:
 *
 * user1.notify()
 * user2.notify()
 * user3.notify()
 * user4.notify()
 *
 * Esto genera un alto acoplamiento entre artistas y usuarios.
 *
 * ¿Por qué este patrón es adecuado?
 * --------------------------------------------------------------------------
 * Observer permite que los usuarios se suscriban a artistas.
 *
 * Así:
 *
 * - Los usuarios reciben actualizaciones automáticamente
 * - El artista no conoce detalles internos de los usuarios
 * - Los observers pueden suscribirse o darse de baja dinámicamente
 *
 * Referencia:
 * https://refactoring.guru/es/design-patterns/observer
 */

import { COLORS } from '../../helpers/colors.ts';

/**
 * --------------------------------------------------------------------------
 * 1. Observer Interface
 * --------------------------------------------------------------------------
 * Todos los seguidores deben implementar update()
 */
interface Observer {
  update(artist: string, album: string): void;
}

/**
 * --------------------------------------------------------------------------
 * 2. Subject
 * --------------------------------------------------------------------------
 * Representa un artista de Spotify.
 *
 * El artista mantiene una lista de seguidores
 * y les notifica cuando lanza un nuevo álbum.
 */
class SpotifyArtist {
  private followers: Observer[] = [];

  private artistName: string;

  constructor(artistName: string) {
    this.artistName = artistName;
  }

  /**
   * --------------------------------------------------------------------------
   * Suscribir seguidores
   * --------------------------------------------------------------------------
   */
  subscribe(observer: Observer): void {

    this.followers.push(observer);

    console.log(
      `%cNuevo seguidor suscrito a ${this.artistName}`,
      COLORS.green,
    );
  }

  /**
   * --------------------------------------------------------------------------
   * Eliminar seguidores
   * --------------------------------------------------------------------------
   */
  unsubscribe(observer: Observer): void {

    this.followers = this.followers.filter(
      follower => follower !== observer,
    );

    console.log(
      `%cUn seguidor dejó de seguir a ${this.artistName}`,
      COLORS.red,
    );
  }

  /**
   * --------------------------------------------------------------------------
   * Lanzamiento de álbum
   * --------------------------------------------------------------------------
   * Cuando el artista lanza un álbum,
   * todos los followers son notificados.
   */
  releaseAlbum(album: string): void {

    console.log(
      `\n%c🎸 ${this.artistName} lanzó un nuevo álbum: %c${album}`,
      COLORS.barbiePink,
      COLORS.butterYellow,
    );

    this.notifyFollowers(album);
  }

  /**
   * --------------------------------------------------------------------------
   * Notificar followers
   * --------------------------------------------------------------------------
   */
  private notifyFollowers(album: string): void {

    for (const follower of this.followers) {
      follower.update(this.artistName, album);
    }
  }
}

/**
 * --------------------------------------------------------------------------
 * 3. Concrete Observer
 * --------------------------------------------------------------------------
 * Representa un usuario de Spotify.
 */
class SpotifyUser implements Observer {

  private username: string;

  constructor(username: string) {
    this.username = username;
  }

  /**
   * --------------------------------------------------------------------------
   * Recibir notificación
   * --------------------------------------------------------------------------
   */
  update(artist: string, album: string): void {

    console.log(
      `%c${this.username} %crecibió notificación: %c${artist} lanzó "${album}"`,
      COLORS.skyBlue,
      COLORS.white,
      COLORS.princessPink,
    );
  }
}

/**
 * --------------------------------------------------------------------------
 * 4. Cliente (Client)
 * --------------------------------------------------------------------------
 * Simulación de seguidores en Spotify.
 */
function main(): void {

  console.log(
    '%c🎧 INICIANDO SISTEMA DE NOTIFICACIONES DE SPOTIFY 🎧',
    COLORS.lilac,
  );

  /**
   * Crear artista
   */
  const artist = new SpotifyArtist('Arctic Monkeys');

  /**
   * Crear usuarios
   */
  const diana = new SpotifyUser('Diana');
  const jorge = new SpotifyUser('Jorge');
  const jesus = new SpotifyUser('Jesús');

  /**
   * Usuarios siguen al artista
   */
  artist.subscribe(diana);
  artist.subscribe(jorge);

  /**
   * Nuevo álbum
   */
  artist.releaseAlbum('AM');

  /**
   * Nuevo follower
   */
  artist.subscribe(jesus);

  /**
   * Nuevo álbum
   */
  artist.releaseAlbum('Tranquility Base Hotel & Casino');

  /**
   * Usuario deja de seguir
   */
  artist.unsubscribe(jorge);

  /**
   * Nuevo álbum
   */
  artist.releaseAlbum('The Car');
}

/**
 * Punto de entrada del programa
 */
main();