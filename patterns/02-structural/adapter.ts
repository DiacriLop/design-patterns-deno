/**
 * ! Patrón Adapter
 *
 * ¿Qué hace el patrón?
 * --------------------------------------------------------------------------
 * El patrón Adapter permite que objetos con interfaces incompatibles
 * trabajen juntos.
 *
 * Actúa como una "capa intermedia" que traduce una interfaz a otra
 * que el sistema espera.
 *
 * ¿Qué problema se está resolviendo?
 * --------------------------------------------------------------------------
 * En una aplicación real como el login de GitHub, es común integrar múltiples
 * proveedores de autenticación como Google, GitHub o Apple.
 *
 * El problema es que cada proveedor tiene su propia API:
 *
 * - GitHub: signInWithToken()
 * - Google: authenticate()
 * - Apple: loginApple()
 *
 * Esto genera incompatibilidad si la aplicación espera un único método:
 * login()
 *
 * Ejemplo del problema:
 * github.signInWithToken()
 * google.authenticate()
 * apple.loginApple()
 *
 * ¿Por qué este patrón es adecuado?
 * --------------------------------------------------------------------------
 * Adapter permite unificar todas las interfaces bajo un solo contrato:
 *
 * login(credentials)
 *
 * Así el sistema no depende de implementaciones externas.
 *
 * Referencia:
 * https://refactoring.guru/es/design-patterns/adapter
 */

import { COLORS } from '../../helpers/colors.ts';

/**
 * --------------------------------------------------------------------------
 * 1. Contrato común (Target Interface)
 * --------------------------------------------------------------------------
 * Todas las estrategias de autenticación deben cumplir este contrato.
 */
interface AuthProvider {
  login(credentials: AuthCredentials): void;
}

/**
 * --------------------------------------------------------------------------
 * DTO de autenticación
 * --------------------------------------------------------------------------
 * Representa los datos necesarios para autenticar un usuario.
 */
interface AuthCredentials {
  email?: string;
  token?: string;
  oauthToken?: string;
}

/**
 * --------------------------------------------------------------------------
 * 2. Servicios externos (Adaptees)
 * --------------------------------------------------------------------------
 * Simulan APIs externas con interfaces incompatibles.
 */

class GitHubAuthService {
  signInWithToken(token: string) {
    console.log(
      `%cLogin con GitHub ✔ token: ${token}`,
      COLORS.green,
    );
  }
}

class GoogleAuthService {
  authenticate(email: string) {
    if (!email) {
      throw new Error('Email requerido para Google login');
    }

    console.log(
      `%cLogin con Google ✔ email: ${email}`,
      COLORS.skyBlue,
    );
  }
}

class AppleAuthService {
  loginApple(oauthToken: string) {
    console.log(
      `%cLogin con Apple ✔ token: ${oauthToken}`,
      COLORS.lilac,
    );
  }
}

/**
 * --------------------------------------------------------------------------
 * 3. Adaptadores (Adapters)
 * --------------------------------------------------------------------------
 * Traducen la interfaz del sistema a la interfaz del servicio externo.
 */

/**
 * Adapter de GitHub
 */
class GitHubAdapter implements AuthProvider {
  private service = new GitHubAuthService();

  login(credentials: AuthCredentials): void {
    try {
      this.service.signInWithToken(credentials.token ?? '');
    } catch (error) {
      console.error(
        '%cError en GitHub Auth:',
        COLORS.red,
        error,
      );
    }
  }
}

/**
 * Adapter de Google
 */
class GoogleAdapter implements AuthProvider {
  private service = new GoogleAuthService();

  login(credentials: AuthCredentials): void {
    try {
      this.service.authenticate(credentials.email ?? '');
    } catch (error) {
      console.error(
        '%cError en Google Auth:',
        COLORS.orange,
        error,
      );
    }
  }
}

/**
 * Adapter de Apple
 */
class AppleAdapter implements AuthProvider {
  private service = new AppleAuthService();

  login(credentials: AuthCredentials): void {
    try {
      this.service.loginApple(credentials.oauthToken ?? '');
    } catch (error) {
      console.error(
        '%cError en Apple Auth:',
        COLORS.barbiePink,
        error,
      );
    }
  }
}

/**
 * --------------------------------------------------------------------------
 * 4. Factory (creación de adapters)
 * --------------------------------------------------------------------------
 * Centraliza la creación de proveedores de autenticación.
 */
class AuthFactory {
  static create(provider: string): AuthProvider {
    switch (provider) {
      case 'github':
        return new GitHubAdapter();

      case 'google':
        return new GoogleAdapter();

      case 'apple':
        return new AppleAdapter();

      default:
        throw new Error(`Proveedor no soportado: ${provider}`);
    }
  }
}

/**
 * --------------------------------------------------------------------------
 * 5. Cliente (Client)
 * --------------------------------------------------------------------------
 * El cliente no conoce detalles internos de los servicios externos.
 * Solo usa la interfaz común AuthProvider.
 */
function main(): void {
  const providers = ['github', 'google', 'apple'];

  providers.forEach((provider) => {
    const auth = AuthFactory.create(provider);

    console.log(
      `\n%c🔐 Usando ${provider.toUpperCase()}`,
      COLORS.butterYellow,
    );

    auth.login({
      email: 'test@mail.com',
      token: 'github-token-123',
      oauthToken: 'apple-oauth-456',
    });
  });

  console.log(
    '\n%c Todos los providers fueron ejecutados correctamente',
    COLORS.princessPink,
  );
}

/**
 * Punto de entrada del programa
 */
main();