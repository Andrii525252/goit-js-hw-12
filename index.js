import{a as y,S as g,i as a}from"./assets/vendor-DxEWe7lX.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const h="50361154-ffd6605c63a72c4acdaa235b2",b="https://pixabay.com/api/";async function L(s){const o={key:h,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0};return(await y.get(b,{params:o})).data}const l=document.querySelector(".gallery"),u=document.querySelector(".loader"),p=new g(".gallery a",{captionsData:"alt",captionDelay:250});p.on("closed.simplelightbox",()=>{document.body.style.overflow="auto"});function v(s){const o=s.map(({webformatURL:r,largeImageURL:n,tags:e,likes:t,views:i,comments:f,downloads:m})=>`<li class="gallery-item">
           <a href="${n}">
             <img src="${r}" alt="${e}" />
           </a>
           <div class="info">
             <p><b>Likes:</b> ${t}</p>
             <p><b>Views:</b> ${i}</p>
             <p><b>Comments:</b> ${f}</p>
             <p><b>Downloads:</b> ${m}</p>
           </div>
         </li>`).join("");l.insertAdjacentHTML("beforeend",o),p.refresh()}function w(){l.innerHTML=""}function S(){u.classList.add("visible")}function c(){u.classList.remove("visible")}const d=document.querySelector(".form"),q=d.querySelector('input[name="search-text"]');d.addEventListener("submit",async s=>{s.preventDefault();const o=q.value.trim();if(!o){a.warning({message:"Будь ласка, введіть пошуковий запит.",position:"topRight"});return}w(),S();try{const r=await L(o);if(c(),!r.hits.length){a.info({message:"На жаль, зображень за вашим запитом не знайдено.",position:"topRight"});return}v(r.hits)}catch(r){c(),a.error({message:"Сталася помилка. Спробуйте пізніше.",position:"topRight"}),console.error(r)}});
//# sourceMappingURL=index.js.map
