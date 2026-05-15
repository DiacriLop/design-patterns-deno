import { COLORS } from '../../helpers/colors.ts';

/**
 * ! Patron Facade
 *
 * ¿Que hace el patron?
 * --------------------------------------------------------------------------
 * Proporciona una interfaz sencilla para un conjunto de subsistemas complejos.
 * El cliente usa una sola fachada sin conocer la complejidad interna.
 *
 * ¿Que problema se esta resolviendo?
 * --------------------------------------------------------------------------
 * En un despliegue real hay muchos pasos: clonar repositorio, compilar,
 * aprovisionar servidor, configurar DNS y generar certificados.
 * El cliente no deberia orquestar todo ese flujo manualmente.
 *
 * ¿Por que este patron es adecuado?
 * --------------------------------------------------------------------------
 * Centraliza la secuencia de pasos y reduce el acoplamiento entre el cliente
 * y los subsistemas. Permite cambiar la infraestructura sin modificar al
 * consumidor.
 *
 * Caso de uso real:
 * --------------------------------------------------------------------------
 * Plataformas de despliegue tipo Vercel/Netlify que ofrecen un solo boton
 * de "Deploy" mientras coordinan multiples servicios por dentro.
 *
 * Referencia:
 * https://refactoring.guru/es/design-patterns/facade
 */

/**
 * Subsistemas (Subsystems)
 * --------------------------------------------------------------------------
 * Cada clase representa una parte especializada de la infraestructura.
 */

class GitHubService {
    pullCode(repoUrl: string): string {
        console.log('%c[GitHub] Descargando codigo fuente desde %s...', COLORS.princessPink, repoUrl);
        return "/tmp/workspace/code";
    }
}

class BuildServer {
    compileApp(path: string): boolean {
        console.log('%c[Build] Instalando dependencias y compilando en %s... Exito.', COLORS.unicornPurple, path);
        return true;
    }
}

class CloudHosting {
    provisionServer(appName: string): string {
        console.log('%c[Hosting] Creando contenedor aislado para la app "%s"...', COLORS.yellow, appName);
        return "192.168.1.100";
    }
}

class DNSRegistry {
    assignDomain(ip: string, domain: string): void {
        console.log('%c[DNS] Apuntando el dominio %s a la IP %s.', COLORS.brown, domain, ip);
    }
}

class SecurityService {
    generateSSLCertificate(domain: string): void {
        console.log(
            '%c[Seguridad] Generando certificado HTTPS (SSL) para %s... Instalado.',
            COLORS.yellow,
            domain,
        );
    }
}

/**
 * Fachada (Facade)
 * --------------------------------------------------------------------------
 * Expone un metodo simple que coordina todos los subsistemas.
 */

interface DeployConfig {
    appName: string;
    repoUrl: string;
    domain: string;
}

class VercelDeployFacade {
    private github: GitHubService;
    private builder: BuildServer;
    private hosting: CloudHosting;
    private dns: DNSRegistry;
    private security: SecurityService;

    constructor() {
        this.github = new GitHubService();
        this.builder = new BuildServer();
        this.hosting = new CloudHosting();
        this.dns = new DNSRegistry();
        this.security = new SecurityService();
    }

    /**
     * Metodo simplificado: encapsula toda la complejidad del despliegue.
     */
    public deployProject(config: DeployConfig): void {
        console.log(
            '\n%c--- INICIANDO DESPLIEGUE PARA: %s ---',
            COLORS.princessPink,
            config.appName,
        );

        // 1. Obtener código
        const codePath = this.github.pullCode(config.repoUrl);

        // 2. Compilar
        const isCompiled = this.builder.compileApp(codePath);
        if (!isCompiled) {
            console.log('%cError en la compilacion. Abortando despliegue.', COLORS.brown);
            return;
        }

        // 3. Crear Servidor
        const serverIp = this.hosting.provisionServer(config.appName);

        // 4. Configurar Redes y Seguridad
        this.dns.assignDomain(serverIp, config.domain);
        this.security.generateSSLCertificate(config.domain);

        console.log('%c--- DESPLIEGUE COMPLETADO ---', COLORS.unicornPurple);
        console.log('%cTu aplicacion esta en vivo en: https://%s\n', COLORS.yellow, config.domain);
    }
}

/**
 * Cliente (Client)
 * --------------------------------------------------------------------------
 * El desarrollador usa la fachada sin conocer el detalle de los subsistemas.
 */

// El desarrollador que usa la plataforma no necesita saber nada de IPs, SSL o contenedores.
const cloudPlatform = new VercelDeployFacade();

// Un solo método para gobernar todos los subsistemas:
cloudPlatform.deployProject({
    appName: "MiTiendaOnline",
    repoUrl: "https://github.com/usuario/mi-tienda",
    domain: "mitienda.com"
});