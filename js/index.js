const URL = "https://japceibal.github.io/japflix_api/movies-data.json";

fetch(URL
   /* headers: {
        'Content-Type': 'application/json',
}*/
)
.then(response => response.json())
.then(data => {
    peliculas = data;
})
.catch(error=> console.log(error));

document.addEventListener("DOMContentLoaded", () => {
   let button = document.getElementById("btnBuscar"); 
   

   button.addEventListener("click", function busquedaPeliculas() {
    let busqueda = document.getElementById("inputBuscar").value.toLowerCase();
    
    const resultados = peliculas.filter(pelicula => {
        return (
            pelicula.title.toLowerCase().includes(busqueda) ||
            pelicula.genres.some(genero => genero.name.toLowerCase().includes(busqueda)) ||
            pelicula.tagline.toLowerCase().includes(busqueda) ||
            pelicula.overview.toLowerCase().includes(busqueda)
        );
    });
    mostrarPeliculas(resultados)
});

});
function mostrarPeliculas(resultados){
    let container = document.getElementById("lista");
    
        container.innerHTML = "";
        if(resultados.length === 0){
            container.innerHTML = "No encontrado."
        }else{
            resultados.forEach(peliculas => {
                var element = document.createElement("li");
                
                element.innerHTML = `
                <section class="section">
                <div class="container my-2 py-2 text-dark">
                 <div class="row d-flex justify-content-center">
                  <div class="col-md-12 col-lg-10 col-xl-12"
                   <div class="card mb-2">
                     <div class="card-body">
                       <div class="d-flex flex-start">
                         <div class="w-100">
                           <div class="d-flex justify-content-between align-items-center mb-3">
                             <h6 class="text-primary fw-bold mb-0">
                               ${peliculas.title}
                               <span class="text-secondary ms-2" id="comment"><br>${peliculas.tagline}</span>
                               </h6>
                           <div class="d-flex justify-content-between align-items-center">
                           <div class="d-flex flex-row">
                               ${scoreStars(peliculas.vote_average)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </section>`;

              container.appendChild(element);
            });
        }
    } 
    
    function scoreStars(score) {
        let starsHtml = "";
        for (let i = 1; i <= 10; i+=2) {
          if (i <= score) {
            starsHtml += `<i class="fa fa-star text-warning me-2"></i>`
          } else {
            starsHtml += `<i class="fa fa-star-o text-warning"></i>`
          }
        }
        return starsHtml
      }
      
    

    
/*

album.innerHTML = ``
container.appendChild(container);
*/
/*
<div class="boton-desplegable">
 <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
  More
 </button>
  <ul class="boton-desplegable-menu">
   <li><a class="dropdown-item" >Año:${pelicula.release_date}</a></li>
   <li><a class="dropdown-item" >Duracion:${pelicula.runtime}</a></li>
   <li><a class="dropdown-item" >Presupuesto:${pelicula.budget}</a></li>
   <li><a class="dropdown-item" >Ganancias:${pelicula.revenue}</a></li>
  </ul>
</div>*/