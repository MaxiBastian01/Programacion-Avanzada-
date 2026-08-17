// ======================================================
// 1. Creación de un Objeto Básico
// ======================================================

const libro = {
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    añoDePublicacion: 1943
};

console.log(libro.titulo);
console.log(libro.autor);
console.log(libro.añoDePublicacion);


// ======================================================
// 2. Anidación de Objetos
// ======================================================

const estudiante = {
    nombre: "Maxi",
    edad: 22,
    direccion: {
        calle: "San Martín 123",
        ciudad: "Concepción del Uruguay",
        pais: "Argentina"
    }
};

console.log(
    estudiante.direccion.calle,
    estudiante.direccion.ciudad,
    estudiante.direccion.pais
);


// ======================================================
// 3. Métodos en Objetos
// ======================================================“agregale al objeto libro una propiedad llamada descripcion, cuyo valor es una función.”

libro.descripcion = function () {
    return "El libro " + this.titulo + " fue escrito por " + this.autor;
};

console.log(libro.descripcion());


// ======================================================
// 4. Iteración sobre Propiedades de un Objeto
// ======================================================

const producto = {
    nombre: "Monitor",
    precio: 250000,
    disponible: true
};

for (let propiedad in producto) {
    console.log(propiedad + ": " + producto[propiedad]);
}


// ======================================================
// 5. Actualización de Propiedades
// ======================================================

producto.precio = 300000;

console.log(producto);


// ======================================================
// 6. Comprobación de Propiedades
// ======================================================¿existe esto dentro del objeto?

function tienePropiedad(objeto, propiedad) {
    return propiedad in objeto;
}

console.log(tienePropiedad(producto, "precio"));      // true
console.log(tienePropiedad(producto, "marca"));       // false


// ======================================================
// 7. Eliminación de Propiedades
// ======================================================

console.log("Antes de eliminar:");
console.log(producto);

delete producto.disponible;

console.log("Después de eliminar:");
console.log(producto);


// ======================================================
// 8. Combinar Objetos
// ======================================================

const persona1 = {
    nombre: "Maxi",
    edad: 22
};

const persona2 = {
    ciudad: "Concepción del Uruguay",
    pais: "Argentina"
};

const personaCompleta = Object.assign({}, persona1, persona2);

console.log(personaCompleta);


// ======================================================
// 9. Copiar Objetos
// ======================================================

const copiaEstudiante = JSON.parse(JSON.stringify(estudiante));

copiaEstudiante.nombre = "Juan";
copiaEstudiante.direccion.ciudad = "Buenos Aires";

console.log("Original:");
console.log(estudiante);

console.log("Copia:");
console.log(copiaEstudiante);

// JSON.stringify(estudiante) // objeto → texto
// JSON.parse(...)            // texto → nuevo objeto

// ======================================================
// 10. Métodos Getters y Setters
// ======================================================

const libro2 = {
    titulo: "1984",
    autor: "George Orwell",

    _añoDePublicacion: 1949,

    get añoDePublicacion() {
        return this._añoDePublicacion;
    },

    set añoDePublicacion(nuevoAño) {
        this._añoDePublicacion = nuevoAño;
    }
};

libro2.añoDePublicacion = 1950;

console.log(libro2.añoDePublicacion);
// ==========================================
// Parte 2: Funciones
// ==========================================


// ==========================================
// 1. Función Suma
// ==========================================

function sumar(a, b) {
    return a + b;
}

console.log(sumar(5, 3));


// ==========================================
// 2. Función que Multiplica
// ==========================================

function multiplicar(a, b) {
    return a * b;
}

console.log(multiplicar(5, 3));


// ==========================================
// 3. Función con Parámetro por Defecto
// ==========================================

function saludar(nombre = "Invitado") {
    return "Hola, " + nombre;
}

console.log(saludar("Maxi"));
console.log(saludar());


// ==========================================
// 4. Función que Devuelve un Objeto
// ==========================================

function crearPersona(nombre, edad) {
    return {
        nombre: nombre,
        edad: edad
    };
}

console.log(crearPersona("Maxi", 22));


// ==========================================
// 5. Función que Modifica un Objeto
// ==========================================

function actualizarEdad(persona, nuevaEdad) {
    persona.edad = nuevaEdad;
}

const persona = {
    nombre: "Maxi",
    edad: 22
};

actualizarEdad(persona, 23);

console.log(persona);


// ==========================================
// 6. Función Recursiva
// ==========================================

function factorial(numero) {
    if (numero === 0) {
        return 1;
    }

    return numero * factorial(numero - 1);
}

console.log(factorial(5));


// ==========================================
// 7. Función con Función Interna
// ==========================================

function despedir() {

    function adios() {
        return "Adiós";
    }

    return adios();
}

console.log(despedir());


// ==========================================
// 8. Función que Usa Otra Función
// ==========================================

function procesarArray(array, funcion) {
    return array.map(funcion);
}

    function multiplicarPorDos(numero) {
        return numero * 2;
    }

const numeros = [1, 2, 3, 4];

console.log(procesarArray(numeros, multiplicarPorDos));


// ==========================================
// 9. Función que Devuelve Otra Función
// ==========================================

function crearMultiplicador(x) {

    return function(numero) {
        return numero * x;
    };

}

const multiplicarPorTres = crearMultiplicador(3);

console.log(multiplicarPorTres(5));


// ==========================================
// 10. Función Anónima
// ==========================================

const sumarAnonima = function(a, b) {
    return a + b;
};

console.log(sumarAnonima(5, 3));


// ==========================================
// Parte 3: Consumo y Procesamiento de Datos desde una API
// ==========================================

// ==========================================
// 1. Consumo de Datos desde una API
// ==========================================

async function obtenerUsuarios() {
    const respuesta = await fetch(
        "https://jsonplaceholder.typicode.com/users"
    );

    const usuarios = await respuesta.json();

    console.log(usuarios);

    return usuarios;
}

obtenerUsuarios();


// ==========================================
// 2. Procesamiento de Datos de una API
// ==========================================

async function imprimirNombresDeUsuarios() {
    const usuarios = await obtenerUsuarios();

    usuarios.forEach(usuario => {
        console.log(usuario.name);
    });
}

imprimirNombresDeUsuarios();


// ==========================================
// 3. Autenticación Simulada
// ==========================================

function autenticarUsuario(credenciales) {

    const usuarioPredefinido = {
        usuario: "maxi",
        contraseña: "1234"
    };

    if (
        credenciales.usuario === usuarioPredefinido.usuario &&
        credenciales.contraseña === usuarioPredefinido.contraseña
    ) {
        return true;
    }

    return false;
}

const credenciales = {
    usuario: "maxi",
    contraseña: "1234"
};

console.log(autenticarUsuario(credenciales));


// ==========================================
// 4. Transformación de Datos
// ==========================================

function mapearUsuarios(usuarios) {//.map() recorre un array y crea uno nuevo transformando cada elemento.

    return usuarios.map(usuario => {
        return {
            nombre: usuario.name,
            email: usuario.email
        };
    });

}


// ==========================================
// 5. Validación de Formularios
// ==========================================

function validarFormulario(formulario) {

    if (
        formulario.nombre &&
        formulario.email &&
        formulario.password
    ) {
        return true;
    }

    return false;
}

const formulario = {
    nombre: "Maxi",
    email: "maxi@gmail.com",
    password: "1234"
};

console.log(validarFormulario(formulario));


// ======================================================
// 6. Paginación de Datos
// ======================================================

// Esta función recibe:
// - un array de datos
// - el número de página que queremos ver

function obtenerPagina(datos, pagina) {

    // Calculamos desde qué posición empieza la página
    // Cada página tiene 5 elementos
    const inicio = (pagina - 1) * 5;

    // Calculamos dónde termina
    const fin = inicio + 5;

    // slice devuelve una parte del array
    return datos.slice(inicio, fin);
}

const datos = [
    1, 2, 3, 4, 5,
    6, 7, 8, 9, 10,
    11, 12, 13
];

console.log(obtenerPagina(datos, 2));

// Devuelve:
// [6, 7, 8, 9, 10]



// ======================================================
// 7. Envío de Datos a una API
// ======================================================

async function enviarDatos(data) {

    // fetch hace la petición HTTP
    const respuesta = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
            // Indicamos que queremos enviar información
            method: "POST",

            // Le avisamos a la API que enviamos JSON
            headers: {
                "Content-Type": "application/json"
            },

            // Convertimos el objeto JavaScript a texto JSON
            body: JSON.stringify(data)
        }
    );

    // Convertimos la respuesta de la API a objeto JavaScript
    const resultado = await respuesta.json();

    console.log(resultado);
}

const nuevaPublicacion = {
    titulo: "Hola",
    contenido: "Esto es una prueba"
};

enviarDatos(nuevaPublicacion);



// ======================================================
// 8. Búsqueda de Usuarios
// ======================================================

function buscarUsuarioPorEmail(usuarios, email) {

    // find recorre el array y devuelve
    // el primer usuario cuyo email coincida
    return usuarios.find(
        usuario => usuario.email === email
    );
}

const usuarios = [
    {
        nombre: "Maxi",
        email: "maxi@gmail.com"
    },
    {
        nombre: "Juan",
        email: "juan@gmail.com"
    },
    {
        nombre: "Pedro",
        email: "pedro@gmail.com"
    }
];

console.log(
    buscarUsuarioPorEmail(
        usuarios,
        "juan@gmail.com"
    )
);



// ======================================================
// 9. Generación de Token de Autenticación
// ======================================================

function generarToken(usuario) {

    // JSON.stringify convierte el objeto a texto
    const usuarioTexto = JSON.stringify(usuario);

    // btoa convierte ese texto a Base64
    // Esto SIMULA un token
    const token = btoa(usuarioTexto);

    return token;
}

const usuario = {
    nombre: "Maxi",
    email: "maxi@gmail.com"
};

console.log(generarToken(usuario));





// ======================================================
// 10. Actualización de Información del Usuario
// ======================================================

function actualizarUsuario(usuario, cambios) {

    // ...usuario copia todas las propiedades del usuario
    // ...cambios copia después las propiedades modificadas
    // Si una propiedad se repite, gana la de cambios

    return {
        ...usuario,
        ...cambios
    };
}

const usuarioOriginal = {
    nombre: "Maxi",
    edad: 22,
    ciudad: "Concepción del Uruguay"
};

const cambios = {
    edad: 23,
    ciudad: "Paraná"
};

const usuarioActualizado =
    actualizarUsuario(usuarioOriginal, cambios);

console.log(usuarioActualizado);



// ======================================================
// OPERACIONES CON ARRAYS
// 1. Agregar y Eliminar Elementos
// ======================================================

const frutas = [
    "manzana",
    "banana",
    "pera"
];

// push agrega un elemento al FINAL del array
frutas.push("naranja");

console.log(frutas);

// pop elimina el ÚLTIMO elemento del array
frutas.pop();

console.log(frutas);

// ======================================================
// 2. Array Bidimensional
// ======================================================

const matriz = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// Primero indicamos la fila y después la posición
console.log(matriz[1][1]);

// Devuelve: 5



// ======================================================
// 3. Iterar sobre un Array
// ======================================================

const frutas = ["manzana", "banana", "pera"];

for (let i = 0; i < frutas.length; i++) {

    // frutas[i] accede a cada elemento
    console.log(frutas[i]);
}



// ======================================================
// 4. Uso de map
// ======================================================

function elevarAlCuadrado(numeros) {

    // map recorre el array y crea uno nuevo
    // transformando cada elemento
    return numeros.map(numero => numero * numero);
}

console.log(elevarAlCuadrado([1, 2, 3, 4]));

// Devuelve: [1, 4, 9, 16]



// ======================================================
// 5. Uso de filter
// ======================================================

function filtrarMayoresDe(numeros, valor) {

    // filter crea un nuevo array solamente
    // con los elementos que cumplen la condición
    return numeros.filter(numero => numero > valor);
}

console.log(filtrarMayoresDe([2, 5, 8, 12, 20], 8));

// Devuelve: [12, 20]



// ======================================================
// 6. Uso de reduce
// ======================================================

function sumarElementos(numeros) {

    // reduce va acumulando todos los valores
    return numeros.reduce(
        (acumulador, numero) => acumulador + numero,
        0
    );
}

console.log(sumarElementos([1, 2, 3, 4]));

// Devuelve: 10



// ======================================================
// 7. Uso de some
// ======================================================

const numeros = [2, 5, 8, 15];

// some devuelve true si AL MENOS UNO
// cumple la condición
const hayMayorA10 = numeros.some(numero => numero > 10);

console.log(hayMayorA10);

// true



// ======================================================
// 8. Uso de every
// ======================================================

const numerosPositivos = [2, 5, 8, 15];

// every devuelve true si TODOS
// cumplen la condición
const todosPositivos =
    numerosPositivos.every(numero => numero > 0);

console.log(todosPositivos);

// true



// ======================================================
// 9. Uso de find
// ======================================================

const personas = [
    {
        nombre: "Maxi",
        edad: 22
    },
    {
        nombre: "Juan",
        edad: 35
    },
    {
        nombre: "Pedro",
        edad: 40
    }
];

// find devuelve el PRIMER elemento
// que cumple la condición
const personaEncontrada =
    personas.find(persona => persona.edad > 30);

console.log(personaEncontrada);

// Devuelve:
// { nombre: "Juan", edad: 35 }



// ======================================================
// 10. Uso de sort
// ======================================================

const palabras = [
    "pera",
    "banana",
    "manzana",
    "naranja"
];

// sort ordena el array
// alfabéticamente
palabras.sort();

console.log(palabras);

// ["banana", "manzana", "naranja", "pera"]