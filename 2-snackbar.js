import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{i as r}from"./assets/vendor-BbbuE1sJ.js";const f=document.querySelector(".js-form");f.addEventListener("submit",m);function m(t){t.preventDefault();const s=t.currentTarget.elements,i=s.state.value,o=s.delay.value;new Promise((e,n)=>{i==="fulfilled"?e(o):n(o)}).then(e=>setTimeout(()=>{r.success({message:`✅ Fulfilled promise in ${e}ms`,position:"topRight"})},e)).catch(e=>setTimeout(()=>{r.error({message:`❌ Rejected promise in ${e}ms`,position:"topRight",titleColor:"#ffffff",messageColor:"#ffffff",backgroundColor:"#EF4040"})},e)),t.currentTarget.reset()}
//# sourceMappingURL=2-snackbar.js.map
