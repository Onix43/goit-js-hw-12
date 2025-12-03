import{a as S,S as $,i as d}from"./assets/vendor-CNqCr-V-.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))p(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&p(i)}).observe(document,{childList:!0,subtree:!0});function e(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function p(a){if(a.ep)return;a.ep=!0;const s=e(a);fetch(a.href,s)}})();async function m(r,t){return await S(`https://pixabay.com/api/?${t.toString()}`,{params:{key:"53503669-da6de2716d59628c83ce4fe17",q:`${r}`,image_type:"photo",orientation:"horizontal",safesearch:"true"}}).then(e=>({hits:e.data.hits,totalHits:e.data.totalHits})).catch(e=>console.log(e))}const h=document.querySelector(".gallery"),y=document.querySelector(".loader"),g=document.querySelector(".more");let c=null;function v(r){let t=r.map(e=>`
    <li>
    <div class="li-el">
     <a href="${e.largeImageURL}" class="link"><img src="${e.webformatURL}" alt="${e.tags}"/></a>
      <div class="img-desc">
       <div class="label">
        <span class="name">Likes</span>
        <span class="value">${e.likes}</span>
       </div>
       <div class="label">
        <span class="name">Views</span>
        <span class="value">${e.views}</span>
       </div>
       <div class="label">
        <span class="name">Comments</span>
        <span class="value">${e.comments}</span>
       </div>
       <div class="label">
        <span class="name">Downloads </span>
        <span class="value">${e.downloads}</span>
       </div>
      </div>
      </div>
    </li>
    `).join("");h.innerHTML+=t,c?c.refresh():c=new $(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250})}function q(){h.innerHTML=""}function b(){y.style.display="inline-block"}function l(){y.style.display="none"}function L(){g.style.display="block"}function u(){g.style.display="none"}const f=document.querySelector(".form"),x=document.querySelector(".more");let n="",w=1,o=new URLSearchParams({page:1,per_page:15});f.addEventListener("submit",async r=>{if(r.preventDefault(),n=f.elements["search-text"].value.trim(),n===""){d.show({message:"Please enter a search query!",backgroundColor:"#EF4040",messageColor:"#ffffff",position:"topRight",maxWidth:"432px"});return}o.set("page",1),q(),u(),b();try{const t=await m(n,o);if(w=Math.ceil(t.totalHits/Number(o.get("per_page"))),l(),!t||t.hits.length===0){d.show({message:" Sorry, there are no images matching your search query. Please try again!",backgroundColor:"#EF4040",messageColor:"#ffffff",position:"topRight",maxWidth:"432px"});return}v(t.hits),L()}catch(t){l(),console.log(`Error: ${t.message}`)}});x.addEventListener("click",async r=>{r.preventDefault();let t=Number(o.get("page"));if(t>=w)return u(),d.error({position:"topRight",message:"We're sorry, but you've reached the end of search results."});o.set("page",t+1),b();try{const e=await m(n,o);if(l(),!e||e.hits.length===0){u();return}v(e.hits),window.scrollBy({top:500,behavior:"smooth"}),L()}catch(e){l(),console.log(`Error: ${e.message}`)}});
//# sourceMappingURL=index.js.map
