'use strict';
// <    >  =>

const botonesEmail = document.querySelectorAll('[data-action="abrir-ventana-correo"]');
const ventanaCorreo = document.getElementById('ventana-correo');

botonesEmail.forEach((boton) =>
	boton.addEventListener('click', (e) => {
		e.preventDefault();
		ventanaCorreo.classList.add('ventana--active');
	})
);

// Eventlistener para cerrar ventana con el boton.
ventanaCorreo.querySelector('button[data-action="cerrar-ventana"]').addEventListener('click', (e) => {
	e.preventDefault();
	ventanaCorreo.classList.remove('ventana--active');
});

// Eventlistener para cerrar ventana con el overlay.
ventanaCorreo.querySelector('.ventana__overlay').addEventListener('click', (e) => {
	e.preventDefault();
	if (e.target.matches('.ventana__overlay')) {
		ventanaCorreo.classList.remove('ventana--active');
	}
});

const galeria = document.getElementById('trabajos');
const observador = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting) {
        const trabajos = galeria.querySelectorAll('.trabajos__imagenes a');
        trabajos.forEach((trabajo, index) => {
            setTimeout(() => {
                trabajo.classList.add('trabajos__trabajo--visible');
            }, 200 * index); 
        });
    }
}, {
    rootMargin: '0px 0px 0px 0px',
    threshold: 0.5,
});

observador.observe(galeria);

const trabajos = document.getElementById('trabajos');
const ventanaTrabajos = document.getElementById('ventana-trabajos');

const datos = [
	{
		id: '1',
		titulo: 'Galeria de fotos',
		texto: 'Esta es una galería interactiva desarrollada con JavaScript Vanilla que ofrece una experiencia envolvente para explorar mis viajes alrededor del mundo. Con una interfaz elegante y minimalista, los usuarios pueden navegar por diferentes categorías de imágenes organizadas por continentes, accediendo a fotografías de lugares emblemáticos.',
		fecha: '20 de febrero de 2023',
	},
	{
		id: '2',
		titulo: 'App de peliculas',
		texto: 'Esta aplicación te ofrece una experiencia completa para descubrir películas de acuerdo a tus gustos y preferencias. Con un diseño moderno, intuitivo y fácil de navegar, podrás explorar una amplia variedad de títulos organizados por género, año de lanzamiento y tipo de contenido (películas o series).',
		fecha: '10 de Junio de 2024',
	},
	{
		id: '3',
		titulo: 'Formulario interactivo',
		texto: 'Este formulario te permite realizar transferencias de dinero de manera rápida y segura, siguiendo un proceso guiado paso a paso. Su diseño moderno y minimalista facilita la navegación, asegurando que cada usuario pueda completar su transacción sin complicaciones.',
		fecha: '22 de Noviembre de 2024',
	},
	{
		id: '4',
		titulo: 'Web de marketing',
		texto: 'SEOMX es una agencia innovadora especializada en estrategias de SEO y marketing digital, diseñada para potenciar la visibilidad online de empresas y emprendedores. Con un enfoque creativo y basado en datos, ofrecemos soluciones personalizadas que maximizan el impacto de cada negocio en el mundo digital.',
		fecha: '3 de Marzo de 2024',
	},
	{
		id: '5',
		titulo: 'Tienda interactiva',
		texto: 'Es una plataforma moderna y dinámica donde los amantes de los tenis pueden explorar, personalizar y comprar su par ideal con una experiencia interactiva y fluida. Diseñada con JavaScript Vanilla, esta tienda en línea ofrece una interfaz intuitiva y atractiva, optimizada para una navegación rápida y sin distracciones.',
		fecha: '26 de Julio de 2023',
	},
	{
		id: '6',
		titulo: 'Landing page | Coffe',
		texto: 'La landing page interactiva donde el café cobra vida. Diseñada con un estilo moderno y minimalista, esta plataforma ofrece una experiencia envolvente para los amantes del café.',
		fecha: '22 de Noviembre de 2024',
	},
];

trabajos.addEventListener('click', (e) => {
	e.preventDefault();

	// Comprobamos que el usuario de click en un trabajo
	const trabajoClickeado = e.target.closest('.trabajos__trabajo');

	if (trabajoClickeado) {
		// Obtenemos el id del trabajo clickeado
		const id = trabajoClickeado.dataset.id;

		// Extraemos la info del trabajo
		const trabajo = datos.filter((trabajo) => {
			if (trabajo.id === id) {
				return trabajo;
			}
		});

		ventanaTrabajos.querySelector('.ventana__titulo').innerText = trabajo[0].titulo;
		ventanaTrabajos.querySelector('.ventana__fecha').innerText = trabajo[0].fecha;
		ventanaTrabajos.querySelector('.ventana__parrafo').innerText = trabajo[0].texto;
		ventanaTrabajos.querySelector('.ventana__imagen').src = trabajoClickeado.querySelector('img').src;
	}
	ventanaTrabajos.classList.add('ventana--active');
});

// Eventlistener para cerrar ventana con el boton.
ventanaTrabajos.querySelector('button[data-action="cerrar-ventana"]').addEventListener('click', (e) => {
	e.preventDefault();
	ventanaTrabajos.classList.remove('ventana--active');
});

// Eventlistener para cerrar ventana con el overlay.
ventanaTrabajos.querySelector('.ventana__overlay').addEventListener('click', (e) => {
	e.preventDefault();
	if (e.target.matches('.ventana__overlay')) {
		ventanaTrabajos.classList.remove('ventana--active');
	}
});

const slider = document.getElementById('slider');

// Variable que guarda el estado de si tenemos el click presionado.
let clickPresionado = false;
let coordenadaInicial;
let scrollLeft; // Guardamos la posicion del scroll del slider

const presiona = (e) => {
	// console.log('presiona');
	clickPresionado = true;

	// e.pageX - Coordenada horizontal del evento. En que coordenada dimos click con respecto al documento.
	// slider.offsetLeft - El espacio entre el slider y la parte izquierda del documento.
	coordenadaInicial = e.pageX - slider.offsetLeft;
	scrollLeft = slider.scrollLeft;

	console.log('startX: ', e.pageX);
	console.log('slider.offsetLeft: ', slider.offsetLeft);
	console.log('scrollLeft: ', slider.scrollLeft);
};
const mueve = (e) => {
	if (!clickPresionado) {
		return;
	}

	// console.log('mueve');
	// Espaciado entre la coordenada de inicio del slider y donde dimos click.
	const espaciado = e.pageX - slider.offsetLeft;
	const distanciaRecorrida = espaciado - coordenadaInicial;

	console.log('distancia: ', distanciaRecorrida);
	console.log('scrollLeft: ', scrollLeft);

	// Desplazamos el scroll.
	// A la posicion inicial del scroll cuando dimos click le restamos la distancia.
	slider.scrollLeft = scrollLeft - distanciaRecorrida;
};
const suelta = (e) => {
	// console.log('suelta');
	clickPresionado = false;
};

slider.addEventListener('mousedown', presiona);
slider.addEventListener('mousemove', mueve);
slider.addEventListener('mouseup', suelta);

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
            cursor.classList.add('hero__cursor--active');
        }
    }, numeroDeLetras * 100);

    // Retornamos una promesa para saber cuando la animacion acabo.
    return new Promise((resolve) => {
        setTimeout(resolve, numeroDeLetras * 100);
    });
};

window.addEventListener('load', async() => {
    await animarTexto(document.querySelector('.hero__titulo--uno'));
    await animarTexto(document.querySelector('.hero__titulo--dos'));

    document.querySelectorAll('.hero__burbuja')[0].classList.add('hero__burbuja--active-1');
    document.querySelectorAll('.hero__burbuja')[1].classList.add('hero__burbuja--active-2');
});
//# sourceMappingURL=bundle.js.map
