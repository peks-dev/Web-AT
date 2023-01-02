// window.addEventListener('load', quitar logo de carga)
      
//FUNCIONES

    // nav-bar site open-close

        // Traer elementos al DOM
            const openCloseIcons = document.querySelectorAll('.main-nav__burger-icon');
            const iconOPen = document.getElementById('menu__icon-open');
            const iconClose = document.getElementById('menu__icon-close');
            const navBar = document.querySelector('.main-nav');
            const links = document.querySelector('.main-nav__links');

        // Creacion de la logica

        // añadir evento a cada boton 
        openCloseIcons.forEach((elemento)=>{
            elemento.addEventListener('click',(e)=>{
                
                // Estado: Menu cerrado //
                if(e.target.id == "menu__icon-close"){
                    /*esconder img*/
                    iconClose.style.display = "none"
                    /*aparecer img*/
                    iconOPen.style.display = "block"
                    /*aparecer links*/
                    links.style.display = "none"
                    
                //Estado menu abierto //
                } else {
                    /*esconder img*/
                    iconOPen.style.display = "none"
                    /*aparecer img*/
                    iconClose.style.display = "block"
                    /*aparecer links*/
                    links.style.display = "flex"
                    links.style.height = "30vh"
                    navBar.style.borderRadius = "0 0rem 5rem 5rem";
                }
            })
        })
    /////////////////////////////////////////////////////////////////////////

    // Galeria dinamica    
    const botonesFiltro = document.querySelectorAll(".gallery__filter-button")
    const galleryContainer = document.getElementById('gallery-imgs-container')

  // Revolver imagenes
  const shuffleArray = array => {
    for (let i = array.length -1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
   }
   return array; 
   };

   let imgsRevueltas = shuffleArray(trabajos);
   var galleryDom = []
  

     // Funcion principal

        function pintarImg(imagen){

            //crear contenedor div
            let crearDiv = document.createElement('div');
            crearDiv.setAttribute('class','gallery__img-wrapper');
            crearDiv.setAttribute('data-category',imagen.categoria);

            //crear img
            let crearImg = document.createElement('img')
            crearImg.setAttribute('class','gallery__img-wrapper-item');
            crearImg.setAttribute('src', imagen.foto);

            //meterla al div
            crearDiv.appendChild(crearImg);

             //meter al contenedor todo
             galleryContainer.appendChild(crearDiv);

             //Añadirla al array del DOM
             galleryDom.push(crearDiv)
        }


    // Iniciar galleria

        function firstImgs(){

            // Recorrer el listado de imagenes y pintarlas

            for(i=0;i < 12;i++){
                pintarImg(imgsRevueltas[i]); 
                imgsRevueltas.splice(i,1);
            }
        }
        firstImgs();


    // Cargar más imagenes a la galeria
        
        let cargarButton = document.getElementById('boton-cargar')
        let botonTodos = document.getElementById('todos')

        function filteredArray(array, argumento){
            return array.filter(elemntArray => elemntArray.categoria.includes(argumento))
          }

        function cargarMas(){

            let stop = galleryDom.length
            let imgsFaltantes = imgsRevueltas.slice(stop, imgsRevueltas.length)
            let botonActivo = botonTodos.getAttribute('class')
            
            //
            if(botonActivo === 'gallery__filter-button filter-button--active'){
                for(i=0;i<5;i++){
                    pintarImg(imgsRevueltas[i])
                    imgsRevueltas.splice(i,1);
                }
            } else {
                botonesFiltro.forEach((boton, i)=>{
                    if(boton.classList.contains('filter-button--active')){
                        let botonCategoria = boton.getAttribute('data-category')
                        
                        let contador = 0
                        for(i=0; i<imgsRevueltas.length;i++){
                            if((imgsRevueltas[i].categoria === botonCategoria) && (contador < 5)){
                                pintarImg(imgsRevueltas[i])
                                imgsRevueltas.splice(i,1);
                                contador++
                            } 
                        }                      

                    }
                })
            }

            
        }
        cargarButton.addEventListener('click',cargarMas)

        let srcGalleryDom = []

        botonTodos.addEventListener('click', ()=>{
    
           for(i=0;i<galleryDom.length;i++){
            let obtenerImagen = galleryDom[i].children[0].getAttribute('src')
            srcGalleryDom.push(obtenerImagen)

        console.log(srcGalleryDom)

           }
        })

         //Lightbox

            /*
            click img
                añadir clase ACTIVO a lightbox 
                obtener SRC de la imagen clickeada
                add src a la imagen del lightbox

            click al boton cerrar
                remover clase ACTIVO a lightbox
            */

                
                const lightbox = document.querySelector('.lightbox')
                const imgLightbox = document.querySelector('.lightbox__img-item')
                const botonLightbox = document.querySelector('.lightbox__button')

                galleryContainer.addEventListener('click',(e)=>{
                    if(e.target && e.target.tagName === "IMG"){
                        lightbox.classList.add('lightbox--active')
                        let imgSource = e.target.getAttribute('src')

                        imgLightbox.setAttribute('src', imgSource)    
                    }
                })

                botonLightbox.addEventListener('click',()=>{
                    lightbox.classList.remove('lightbox--active')
                })
               
        
        
        // Filtro galeria dinámica

        // CLICK boton
        

        botonesFiltro.forEach((boton, i) => {
            boton.addEventListener('click', (evento)=>{
                botonesFiltro.forEach((boton,i)=>{

                    // Quitar clase ACTIVO a TODOS los botones filtro
                    boton.classList.remove('filter-button--active')
                })
                // Añadir clase ACTIVO al boton clickeado
                evento.target.classList.add('filter-button--active')

                // Regresar al inicio de la seccion
                let sectionGallery = document.getElementById('gallery')
                sectionGallery.scrollIntoView({block:'start',behavior:'smooth'})

            
                // Filtrar imagenes
                let botonClikeado = evento.target.getAttribute('data-category')
                galleryDom.forEach((imagenT)=>{
                    // Añadir clase ACTIVO
                    if(imagenT.getAttribute('data-category') == botonClikeado){
                       imagenT.classList = 'gallery__img-wrapper'
                      
                    // Boton todos
                    } else if(botonClikeado == 'todos') {
                        imagenT.classList = 'gallery__img-wrapper'

                    // Añadir clase HIDE
                    } else {
                        imagenT.classList = 'gallery__img-wrapper--hide'
                    }
                    
                }) 
            })
        })


    /////////////////////////////////////////////////////////////////////////

        // Accordeon

        const toggle = document.querySelectorAll(".accordeon__toggle")  
        const subToggle = document.querySelectorAll(".accordeon__toggle-sub")
        const accordeon = document.querySelector(".accordeon")
        const h3 = document.querySelectorAll(".h3")
        const h4 = document.querySelectorAll(".h4")


       // click toggle
       h3.forEach((cadaH3, i)=>{
        h3[i].addEventListener("click",()=>{
            //remover clase ACTIVO sub-toggles
            subToggle.forEach((cadaSubToggle, i)=>{
                subToggle[i].classList.remove("sub--active")
            })
            //remover clase ACTIVO toggles
            toggle.forEach((cadaToggle, i)=>{
                toggle[i].classList.remove("toggle--active")
                
            })
            //añadir clase ACTIVO al toggle CLIKEADO
            toggle[i].classList.add("toggle--active")
        })
        // click toggle
        h4.forEach((cadaH4, i)=>{
            h4[i].addEventListener("click",()=>{
                //remover clase ACTIVO sub-toggles
                subToggle.forEach((cadaSubToggle, i)=>{
                    subToggle[i].classList.remove("sub--active")
                })
                //añadir clase ACTIVO al sub-toggle CLIKEADO
                subToggle[i].classList.add("sub--active")
            })
        })
    })

        

    /////////////////////////////////////////////////////////////////////////

    // section proyects

        // Arrow next 
        const arrowLeft = document.getElementById('arrow-left')
        const arrowRigth = document.getElementById('arrow-right')
        const sliderCards = document.querySelector('.slider__cards')
        const sliderDotes = document.querySelectorAll('.slider__dotes-item')

        let position = 0


        arrowRigth.addEventListener('click', ()=>{
            if(position <= 33.3){
                position = position + 33.3
                sliderCards.style.transform =`translateX(-${position}%)`;
                
                if(position == 33.3){
                    sliderDotes.forEach((dote, i)=>{
                        sliderDotes[i].classList.remove('slider__dotes-item--active')
                    })
                    sliderDotes[1].classList.add('slider__dotes-item--active')
                } else {
                    sliderDotes.forEach((dote, i)=>{
                        sliderDotes[i].classList.remove('slider__dotes-item--active')
                    })
                    sliderDotes[2].classList.add('slider__dotes-item--active')
                }
            }
        })
        arrowLeft.addEventListener('click',()=>{
            if(position >= 33.3){
                position = position - 33.3
                sliderCards.style.transform =`translateX(-${position}%)`;
                
                if(position == 0){
                    sliderDotes.forEach((dote, i)=>{
                        sliderDotes[i].classList.remove('slider__dotes-item--active')
                    })
                    sliderDotes[0].classList.add('slider__dotes-item--active')
                }else{
                    sliderDotes.forEach((dote, i)=>{
                        sliderDotes[i].classList.remove('slider__dotes-item--active')
                    })
                    sliderDotes[1].classList.add('slider__dotes-item--active')
                }
                 
            }
        })

        

        // Slider modal
        const buttonModalClose = document.querySelector('.slider__modal-close')
        const sliderModal = document.querySelector('.slider__modal')
        const buttonProyects = document.querySelectorAll('.button-proyect')

        const nameProyect = document.getElementById('proyect-name')
        const descriptionProyect = document.getElementById('description-proyect')
        const imgWood = document.getElementById('img-wood')
        const nameWood = document.getElementById('name-wood')
        const imgsModalContainer = document.getElementById('modal-container-gallery')


        // Activar modal
        buttonProyects.forEach((button, i)=>{

            //Saber que boton se clickeo
            buttonProyects[i].addEventListener("click",()=>{
                // cambiar clase al modal
                sliderModal.classList.add("slider__modal-container--active")
                // Insertar nombre del proyecto
                nameProyect.innerHTML = proyects[i].name
                // Insertar descripción del proyecto
                descriptionProyect.innerHTML = proyects[i].description
                //Insertar img de la madera
                imgWood.setAttribute('src',`./assets/woods/${proyects[i].woods}.jpg`)
                // Insertar nombre de la madera
                nameWood.innerHTML = proyects[i].woods
                //Imagenes modal

                
                proyects[i].imgs.forEach((img,i)=>{
                    
                    let createImgModal = document.createElement('img')
                    createImgModal.setAttribute('src',img.url)
                    createImgModal.setAttribute('class','img-proyect-modal')
                    imgsModalContainer.appendChild(createImgModal)
                

                })

            })

        })


        // Desactivar modal
        buttonModalClose.addEventListener("click",()=>{
            sliderModal.classList.remove("slider__modal-container--active")
            let imgsModalDom = document.querySelectorAll('.img-proyect-modal')
            for(i=0;i<imgsModalDom.length;i++){
                imgsModalContainer.removeChild(imgsModalDom[i])
            }
        })

    // Cookies
        const cookieBanner = document.querySelector('.cookies')
        const cookieBackground = document.querySelector('.cookies-background')
        const acceptCookies = document.getElementById('accept-cookies')
        const negateCookies = document.getElementById('negate-cookies')

        if(!localStorage.getItem('cookies-aceptadas')){
            cookieBanner.classList.add('cookies--active')
            cookieBackground.classList.add('cookies-background--active')
        }

        


        acceptCookies.addEventListener('click',()=>{
            cookieBanner.classList.remove('cookies--active')
            cookieBackground.classList.remove('cookies-background--active')

            localStorage.setItem('cookies-aceptadas', true)
        })

    // Soport icon nav
        const sectionFaqs = document.getElementById('faqs')
        const buttonSupport = document.getElementById('icon-support')

        buttonSupport.addEventListener('click',()=>{
            sectionFaqs.scrollIntoView({block:'start',behavior:'smooth'})
        })

    

        
    




