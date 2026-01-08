import{a as q,S,i as n}from"./assets/vendor-CNqCr-V-.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();async function m(a,e=1){const o=await q.get("https://pixabay.com/api/",{params:{key:"53503669-da6de2716d59628c83ce4fe17",q:a,image_type:"photo",orientation:"horizontal",safesearch:"true",page:e,per_page:15}});return{hits:o.data.hits,totalHits:o.data.totalHits}}const y=document.querySelector(".gallery"),g=document.querySelector(".loader"),v=document.querySelector(".more");let p=null;function b(a){let e=a.map(s=>`
    <li>
    <div class="li-el">
     <a href="${s.largeImageURL}" class="link"><img src="${s.webformatURL}" alt="${s.tags}"/></a>
      <div class="img-desc">
       <div class="label">
        <span class="name">Likes</span>
        <span class="value">${s.likes}</span>
       </div>
       <div class="label">
        <span class="name">Views</span>
        <span class="value">${s.views}</span>
       </div>
       <div class="label">
        <span class="name">Comments</span>
        <span class="value">${s.comments}</span>
       </div>
       <div class="label">
        <span class="name">Downloads </span>
        <span class="value">${s.downloads}</span>
       </div>
      </div>
      </div>
    </li>
    `).join("");y.innerHTML+=e,p?p.refresh():p=new S(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250})}function R(){y.innerHTML=""}function L(){g.style.display="inline-block"}function d(){g.style.display="none"}function w(){v.style.display="block"}function l(){v.style.display="none"}const h=document.querySelector(".form"),$=document.querySelector(".more");let c="",f=1,i=1;const x=15;h.addEventListener("submit",async a=>{if(a.preventDefault(),c=h.elements["search-text"].value.trim(),c===""){n.show({message:"Please enter a search query!",backgroundColor:"#EF4040",messageColor:"#ffffff",position:"topRight",maxWidth:"432px"});return}i=1,R(),l(),L();try{const e=await m(c,i);if(f=Math.ceil(e.totalHits/x),d(),!e.hits||e.hits.length===0){n.error({message:" Sorry, there are no images matching your search query. Please try again!",backgroundColor:"#EF4040",messageColor:"#ffffff",position:"topRight",maxWidth:"432px"});return}b(e.hits),i<f?w():n.error({position:"topRight",message:"We're sorry, but you've reached the end of search results."})}catch(e){d(),n.error({message:`Error: ${e.message}`,position:"topRight"})}});$.addEventListener("click",async a=>{a.preventDefault(),i+=1,L(),l();try{const e=await m(c,i);if(d(),!e||e.hits.length===0){l();return}b(e.hits);const s=document.querySelector(".gallery li");if(s){const o=s.getBoundingClientRect();window.scrollBy({top:o.height*2,behavior:"smooth"})}i>=f?(l(),n.error({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):w()}catch(e){d(),n.error({message:`Error: ${e.message}`,position:"topRight"})}});
//# sourceMappingURL=index.js.map
