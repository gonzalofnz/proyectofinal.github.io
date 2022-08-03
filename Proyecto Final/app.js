//FETCH USADO CON EL FIN DE CONECTARLO A api.json 
const fetchData = async () => {
    try {
        const res = await fetch('api.json')
        const data = await res.json()
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

// Array de productos
const productos = {
    producto1: {
      nombre: 'Mouse',
      precio: '4500',
      descripcion: 'mouse tradicional. A diferencia de los modelos convencionales, los mejores mouse gamer son visualmente mucho más atractivos.',
      srcImg: 'https://s3-sa-east-1.amazonaws.com/saasargentina/twIa9uceTfTpbH4ZDwdX/imagen'
    },
    producto2: {
      nombre: 'Teclado',
      precio: '11999',
      descripcion: 'Un teclado estándar dispone de 1/2KRO, lo que solo permite un máximo de dos pulsaciones al mismo tiempo. Un teclado gaming, por lo general, cuenta con 6KRO.',
      srcImg: 'https://tecnocompro.com/pub/media/catalog/product/cache/f2fda30fa08589bc3d50957538fec3cf/1/_/1_13.png'
    },
    producto3: {
      nombre: 'Placa de video',
      precio: '120000',
      descripcion: 'Nvidia es el fabricante líder de placas de video; su calidad asegura una experiencia positiva en el desarrollo del motor gráfico de tu computadora.',
      srcImg: 'https://www.tryhardware.com.ar/wp-content/uploads/2022/05/Placa-de-Video-Asus-GeForce-RTX-3080-Ti-12GB-GDDR6X-TUF-Gaming-600x600.jpg'
    },
    producto4: {
      nombre: 'Headset', 
      precio: '8200',
      descripcion: 'Los audífonos utilizan estas partes para ayudar a canalizar y amplificar el sonido de tu entorno en tu oído: micrófono (detecta sonido), amplificador (aumenta el sonido). ',
      srcImg: 'https://www.venex.com.ar/products_images/1534799941_1429219484957260301909173.jpg'
    },
    producto5: {
        nombre: 'Silla gamer',
        precio: '29999',
        descripcion: 'es una silla ergonómica diseñada específicamente para jugadores. Te evita los desagradables dolores de espalda y las distensiones musculares. ',
        srcImg: 'https://www.mueblesrey.com/4206-medium_default/silla-gamer-nitro.jpg'
      },
      producto6: {
        nombre: 'Monitor gamer',
        precio: '39999',
        descripcion: 'Los monitores para gaming se llaman así porque están diseñados para las necesidades muy específicas de los videojuegos. ',
        srcImg: 'https://www.fullh4rd.com.ar/img/productos/Pics_Prod/monitor-gamer-24-samsung-g35-odyssey-144hz-0.jpg'
      },
      producto7: {
        nombre: 'Combo gamer',
        precio: '150000',
        descripcion: 'Los monitores para gaming se llaman así porque están diseñados para las necesidades muy específicas de los videojuegos. ',
        srcImg: './img/a4672493299562a34fe4f5c3c2abf853.png'
      },
      producto8: {
        nombre: 'Laptop gamer',
        precio: '79999',
        descripcion: 'Los monitores para gaming se llaman así porque están diseñados para las necesidades muy específicas de los videojuegos. ',
        srcImg: './img/notebookgamer-removebg-preview.png'
      }
  }
  
  // Capturo el template de los productos
  const templateProd = document.getElementById('template-prod').content
  const contenedorProd = document.querySelector('.contenedor-productos')
  const fragment = document.createDocumentFragment()

  // TODO LO RELACIONADO AL CARRITO DE COMPRA
  let carrito = {}
  const templateTabla = document.getElementById('agregar-producto-al-carro').content
  const tbodyCarrito = document.getElementById('carrito-body')
  const fragmentTabla = document.createDocumentFragment()
  const templateFoot = document.getElementById('tfooter').content
  const tfootCarrito = document.getElementById('footer')
 

  document.addEventListener('DOMContentLoaded', e => {
    fetchData()
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
    }
});
// ESTO ES TODO LO RELACIONADO A AGREGAR LOS PRODUCTOS AL DOM
    Object.values(productos).forEach( producto => {
      templateProd.querySelector('.div-info .nombre-prod').textContent = producto.nombre
      templateProd.querySelector('.div-precio-boton .precio').textContent = producto.precio
      templateProd.querySelector('.div-info .descripcion-prod').textContent = producto.descripcion
      templateProd.querySelector('.contenedor-img img').setAttribute('alt', producto.nombre)
      templateProd.querySelector('.contenedor-img img').setAttribute('src', producto.srcImg)
      const clone = templateProd.cloneNode(true)
      fragment.appendChild(clone)
    })
    contenedorProd.appendChild(fragment)
    localStorage.setItem('carrito', JSON.stringify(carrito))
  
  contenedorProd.addEventListener('click', e => {
    
    if(e.target.textContent === "Agregar") {
      setCarrito(e.target.parentElement.parentElement)
    }
    e.stopPropagation();
  })
  const setCarrito = e => {
    const pivoteCarrito = {
      nombre: e.querySelector('.div-info .nombre-prod').textContent,
      precio: e.querySelector('.div-precio-boton .precio').textContent,
      cantidad: 1
    }
    if(carrito.hasOwnProperty(pivoteCarrito.nombre)){
      carrito[pivoteCarrito.nombre].cantidad += 1
    } else {
      carrito[pivoteCarrito.nombre] = {...pivoteCarrito}
    }
    pintarTabla(carrito)
  }
  
  const pintarTabla = objetoCarrito => {
    Object.values(objetoCarrito).forEach( objeto => {
      const cloneTabla = templateTabla.cloneNode(true)
      cloneTabla.getElementById('producto').textContent = objeto.nombre
      cloneTabla.getElementById('cant').textContent = objeto.cantidad
      cloneTabla.getElementById('precio-uni').textContent = objeto.precio
      let precioTotal = parseFloat(objeto.precio) * objeto.cantidad
      cloneTabla.getElementById('precio-total-prod').textContent = precioTotal.toFixed(2)
      fragmentTabla.appendChild(cloneTabla)
    })
    tbodyCarrito.innerHTML = ''
    tbodyCarrito.appendChild(fragmentTabla)
    pintarFooter()
  }
  const pintarFooter = () => {
    tfootCarrito.innerHTML = ''
    if(Object.keys(carrito).length === 0) {
      tfootCarrito.innerHTML = '<tr><td colspan = 4>¡No hay ningun elemento en el carrito!</td></tr>'
    } else {
      const total = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + (cantidad * precio),0)
      templateFoot.getElementById('total-a-pagar').textContent = total.toFixed(2)
      const cloneFoot = templateFoot.cloneNode(true)
      fragment.appendChild(cloneFoot)
      tfootCarrito.appendChild(fragment)
      //Boton Vaciar carrito
      const botonVaciar = document.getElementById('vaciar-tabla')
  botonVaciar.addEventListener('click', () => {
        carrito = {}
        pintarTabla(carrito)
        pintarFooter()
        Swal.fire({
          title: 'Haz vaciado el carrito',
          icon: 'info',
          confirmButtonText: 'Ok'
        })
      }) 
     
      //Botones aumentar y disminuir cantidades
       
    }
  }

  
  tbodyCarrito.addEventListener('click', e => {
    
    if(e.target.classList.contains('button')) {
      aumentarDisminuir(e.target)
    }
  })
  const aumentarDisminuir = boton => {
    if(boton.textContent === '+'){
      const indicador = boton.parentElement.parentElement.firstElementChild.textContent
      Object.values(carrito).forEach( elemento => {
        if(elemento.nombre === indicador) {
        carrito[elemento.nombre].cantidad++  
        }
      })
    }
    if(boton.textContent === '-') {
      const indicador = boton.parentElement.parentElement.firstElementChild.textContent
      Object.values(carrito).forEach( elemento => {
        if(elemento.nombre === indicador) {
        carrito[elemento.nombre].cantidad--
          if(carrito[elemento.nombre].cantidad === 0) {
            delete carrito[elemento.nombre]
          }
        }
      })
    }
    pintarTabla(carrito)
    pintarFooter()
  }

      function pololo() {
        document.getElementById("pololo")
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Haz agregado el producto al carrito',
          showConfirmButton: false,
          timer: 2000
        })
      }