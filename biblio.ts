interface SubCategoria {
    id: string;
    nombre: string;
    descripcion: string;
    fechaCreacion: string;
}

interface Categoria {
    id: string;
    nombre: string;
    descripcion: string;
    estado: boolean;
    subcategoria: SubCategoria;
}

interface Libro {
    codigo: string;
    titulo: string;
    autor: string;
    editorial: string;
    anioPublicacion: number;
    categoria: Categoria;
    disponible: boolean;
}

interface Usuario {
    codigo: string;
    nombreCompleto: string;
    correo: string;
    carrera: string;
    telefono: string;
}

interface Prestamo {
    codigoPrestamo: string;
    libroCodigo: string;
    usuarioCodigo: string;
    fechaPrestamo: string;
    fechaDevolucion: string | null;
    estado: string;
    multa: number;
}

class Biblioteca {

    private libros: Libro[] = [];
    private usuarios: Usuario[] = [];
    private prestamos: Prestamo[] = [];

    registrarLibro(libro: Libro): void {
        this.libros.push(libro);
        console.log("Libro registrado correctamente");
    }

    eliminarLibro(codigo: string): void {

        const indice = this.libros.findIndex(
            libro => libro.codigo === codigo
        );

        if (indice !== -1) {
            this.libros.splice(indice, 1);
            console.log("Libro eliminado");
        } else {
            console.log("Libro no encontrado");
        }
    }

    buscarLibro(codigo: string): Libro | undefined {

        return this.libros.find(
            libro => libro.codigo === codigo
        );
    }

    mostrarLibros(): void {

        console.log("===== LISTA DE LIBROS =====");

        this.libros.forEach(libro => {

            console.log(`
Código: ${libro.codigo}
Título: ${libro.titulo}
Autor: ${libro.autor}
Editorial: ${libro.editorial}
Año de publicación: ${libro.anioPublicacion}
Categoría: ${libro.categoria.nombre}
Subcategoría: ${libro.categoria.subcategoria.nombre}
Disponible: ${libro.disponible}
            `);

        });
    }

    registrarUsuario(usuario: Usuario): void {

        this.usuarios.push(usuario);

        console.log("Usuario registrado correctamente");
    }

    buscarUsuario(codigo: string): Usuario | undefined {

        return this.usuarios.find(
            usuario => usuario.codigo === codigo
        );
    }

    mostrarUsuarios(): void {

        console.log("===== LISTA DE USUARIOS =====");

        this.usuarios.forEach(usuario => {

            console.log(`
Código: ${usuario.codigo}
Nombre: ${usuario.nombreCompleto}
Correo: ${usuario.correo}
Carrera: ${usuario.carrera}
Teléfono: ${usuario.telefono}
            `);

        });
    }

    generarPrestamo(
        libroCodigo: string,
        usuarioCodigo: string,
        fechaPrestamo: string
    ): void {

        const libro = this.buscarLibro(libroCodigo);
        const usuario = this.buscarUsuario(usuarioCodigo);

        if (!libro) {
            console.log("Libro no encontrado");
            return;
        }

        if (!usuario) {
            console.log("Usuario no encontrado");
            return;
        }

        if (!libro.disponible) {
            console.log("El libro no está disponible");
            return;
        }

        const nuevoPrestamo: Prestamo = {
            codigoPrestamo: "PR" + (this.prestamos.length + 1),
            libroCodigo: libroCodigo,
            usuarioCodigo: usuarioCodigo,
            fechaPrestamo: fechaPrestamo,
            fechaDevolucion: null,
            estado: "Activo",
            multa: 0
        };

        this.prestamos.push(nuevoPrestamo);

        libro.disponible = false;

        console.log("Préstamo realizado correctamente");
    }

    registrarDevolucion(libroCodigo: string): void {

        const prestamo = this.prestamos.find(
            p => p.libroCodigo === libroCodigo &&
            p.fechaDevolucion === null
        );

        if (!prestamo) {
            console.log("No existe préstamo activo");
            return;
        }

        prestamo.fechaDevolucion = new Date().toLocaleDateString();
        prestamo.estado = "Devuelto";

        const libro = this.buscarLibro(libroCodigo);

        if (libro) {
            libro.disponible = true;
        }

        console.log("Libro devuelto correctamente");
    }

    mostrarPrestamos(): void {

        console.log("===== LISTA DE PRÉSTAMOS =====");

        this.prestamos.forEach(prestamo => {

            console.log(`
Código Préstamo: ${prestamo.codigoPrestamo}
Código Libro: ${prestamo.libroCodigo}
Código Usuario: ${prestamo.usuarioCodigo}
Fecha Préstamo: ${prestamo.fechaPrestamo}
Fecha Devolución: ${prestamo.fechaDevolucion}
Estado: ${prestamo.estado}
Multa: $${prestamo.multa}
            `);

        });
    }
}

// SUBCATEGORÍAS

const sub1: SubCategoria = {
    id: "S1",
    nombre: "Programación Web",
    descripcion: "Libros de desarrollo web",
    fechaCreacion: "01/01/2026"
};

const sub2: SubCategoria = {
    id: "S2",
    nombre: "Bases de Datos",
    descripcion: "Libros relacionados con bases de datos",
    fechaCreacion: "01/01/2026"
};

// CATEGORÍAS

const categoria1: Categoria = {
    id: "C1",
    nombre: "Tecnología",
    descripcion: "Libros tecnológicos",
    estado: true,
    subcategoria: sub1
};

const categoria2: Categoria = {
    id: "C2",
    nombre: "Informática",
    descripcion: "Libros informáticos",
    estado: true,
    subcategoria: sub2
};

// LIBROS

const libro1: Libro = {
    codigo: "L1",
    titulo: "TypeScript Básico",
    autor: "Juan Pérez",
    editorial: "AlfaOmega",
    anioPublicacion: 2025,
    categoria: categoria1,
    disponible: true
};

const libro2: Libro = {
    codigo: "L2",
    titulo: "SQL Server",
    autor: "María López",
    editorial: "McGraw Hill",
    anioPublicacion: 2024,
    categoria: categoria2,
    disponible: true
};

// USUARIOS

const usuario1: Usuario = {
    codigo: "U1",
    nombreCompleto: "Erick Tepan",
    correo: "erick@gmail.com",
    carrera: "Ingeniería de Software",
    telefono: "0999999999"
};

const usuario2: Usuario = {
    codigo: "U2",
    nombreCompleto: "Carlos Pérez",
    correo: "carlos@gmail.com",
    carrera: "Tecnologías de la Información",
    telefono: "0888888888"
};

// PRUEBAS

const biblioteca = new Biblioteca();

biblioteca.registrarLibro(libro1);
biblioteca.registrarLibro(libro2);

biblioteca.registrarUsuario(usuario1);
biblioteca.registrarUsuario(usuario2);

biblioteca.mostrarLibros();

biblioteca.mostrarUsuarios();

biblioteca.generarPrestamo(
    "L1",
    "U1",
    "29/05/2026"
);

biblioteca.mostrarPrestamos();

biblioteca.registrarDevolucion("L1");

biblioteca.mostrarLibros();
