const URL = "https://japceibal.github.io/japflix_api/movies-data.json";

const getPeliculas = async () => {
  try{
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  }
  catch (error){
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  
   let button = document.getElementById("btnBuscar"); 

   button.addEventListener("click", function busquedaPeliculas() {
    let busqueda = document.getElementById("inputBuscar").value.toLowerCase();

    getPeliculas()
      .then((data) => {
        const resultados = data.filter(pelicula => {
            return (
                pelicula.title.toLowerCase().includes(busqueda) ||
                pelicula.genres.some(genero => genero.name.toLowerCase().includes(busqueda)) ||
                pelicula.tagline.toLowerCase().includes(busqueda) ||
                pelicula.overview.toLowerCase().includes(busqueda)
            );
        });
        mostrarPeliculas(resultados);
      })
    
    
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

                const genres = peliculas.genres;

                let generosArray = [];
                for(let item of genres){
                  generosArray.push(item.name);
                }
                
                element.innerHTML = `
                <section class="section">
                  <div class="container my-2 py-2 text-dark">
                    <div class="row d-flex justify-content-center">
                      <div class="col-md-12 col-lg-10 col-xl-12"
                      <div class="card mb-2">
                        <div class="card-body">
                          <div class="d-flex flex-start">
                            <div class="w-100">
                              <div class="d-flex justify-content-between align-items-center mb-3" 
                              data-bs-toggle="offcanvas" data-bs-target="#offcanvas-${peliculas.id}" aria-controls="offcanvasExample">
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
                </section>
                <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvas-${peliculas.id}" aria-labelledby="offcanvasLabel">
                  <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="title">${peliculas.title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                  </div>
                  <div class="offcanvas-body" id="overview">
                    <p>${peliculas.overview}</p>
                  </div>
                  <div class="offcanvas-footer border border-secondary-subtle py-1 px-2">
                    <div class="dropdown float-end">
                      <a href="#" class="btn btn-secondary dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        More
                      </a>
                      <ul class="dropdown-menu">
                        <li><a href="#" class="dropdown-item">Year: ${peliculas.release_date.split("-")[0]}</a></li>
                        <li><a href="#" class="dropdown-item">Runtime: ${peliculas.runtime} mins</a></li>
                        <li><a href="#" class="dropdown-item">Budget: $${peliculas.budget}</a></li>
                        <li><a href="#" class="dropdown-item">Revenue: $${peliculas.revenue}</a></li>
                      </ul>
                    </div>
                    <p>${generosArray.join(" - ")}</p>
                  </div>
                </div>
                `;

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