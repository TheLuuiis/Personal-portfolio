'used strict'
// <    >  =>

const animarTexto = (elemento) => {
    const numeroDeLetras = elemento.dataset.texto.length;

    // Activamos el cursor cuando comienza la animación.
    const cursor = elemento.querySelector('.hero__cursor');
    cursor.classList.add('hero__cursor--visible');
    // Por cada letra, la agregamos al DOM con 100ms de separación.
    for(let i = 0 ; i < numeroDeLetras ; i++) {
        
        setTimeout(() => {
            const letra = document.createElement('span');
            letra.append(elemento.dataset.texto[i]);
            elemento.append(letra);
        }, 100 * i);
    }
    // Cambiamos la clase del cursor cuando termine la animación de letras.
    setTimeout(() => {
        // Obtenemos los cursores.
        const cursores = [...elemento.closest('.hero__header').querySelectorAll('.hero__cursor')];
        
        // Obtenemos el index del cursor actual.
        const indexCursorActual = cursores.indexOf(cursor);

        // Comprobamos que el cursor no sea el ultimo.
        if(indexCursorActual < cursores.length - 1) {
            //Si no es el ultimo, ocultamos el cursor.
            cursor.classList.remove('hero__cursor--visible');
        } else {
            // Si es el ultimo, le pasamos la clase de active.
            cursor.classList.add('hero__cursor--active')
        }
    }, numeroDeLetras * 100);

    // Retornamos una promesa para saber cuando la animacion acabo.
    return new Promise((resolve) => {
        setTimeout(resolve, numeroDeLetras * 100);
    });
};

export default animarTexto;