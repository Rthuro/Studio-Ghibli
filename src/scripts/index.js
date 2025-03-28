import { FilmsAPI } from "../api/config.js";

const displayFilmContainer = document.getElementById('displayFilmContainer');

document.addEventListener('DOMContentLoaded', ()=>{
    document.querySelector('h1').classList.add('animate-appear');
    fetchData();

    
});

const fetchData = async ()=>{
    try{
        const res = await fetch(FilmsAPI);
        const data = await res.json();
        data.map((film)=>displayFilm(film));
        const cards = document.querySelectorAll('.obsAppear');

        if(cards){
            const observer = new IntersectionObserver((entries)=>{
                entries.forEach(entry=>{
                  entry.target.classList.toggle('appear', entry.isIntersecting)
                })
            })

            cards.forEach( f =>{
                observer.observe(f);
            })
        }
    }catch(e){
        console.error(e);
    }
}

const displayFilm = (data)=>{
    const {title, original_title, image, movie_banner, description, director, id}  = data;
    return displayFilmContainer.innerHTML += 
    `
        <a id="${id}" href="/src/pages/film.html?id=${id}" class="obsAppear opacity-0 flex gap-2 bg-zinc-900 rounded-md max-w-[500px] h-fit text-white overflow-hidden shadow-md transition-opacity duration-700">
            <img src="${image}" class="max-h-[250px] h-[250px] ">
            <div class="py-3 pl-2 pr-3 flex-col flex gap-2 justify-between">
                <div class="flex-col flex gap-2">
                    <p class="text-md text-zinc-100 font-medium">${title}</p>
                    <p class="text-md text-zinc-400">${original_title}</p>
                    <p class="text-xs text-start text-wrap mb-3 font-light]">${truncateText(description)}</p>
                </div>
                <div class="flex justify-between items-center text-sm">
                    <p>${director}</p>
                    <p class="text-amber-300 font-light">view more</p>
                </div>
            </div>
        </a>
    `;
}
function truncateText(text){
    if(text.length >= 200){
        return text.substring(0, 200) + " ...";
    }
    return text;
}