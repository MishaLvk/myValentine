document.addEventListener("DOMContentLoaded",(function(){var e=document.querySelector(".envelope"),t=document.querySelector(".envelope__top"),n=document.querySelectorAll(".photo"),o=!1,c=0;function u(t){o=t,e.classList.toggle("open",o),e.classList.toggle("closed",!o)}function d(e){e.preventDefault();var t=e.target,n=e.clientX-t.getBoundingClientRect().left,o=e.clientY-t.getBoundingClientRect().top;function c(e,c){t.style.position="absolute",t.style.zIndex=1e3,t.style.left=e-n+"px",t.style.top=c-o+"px"}function u(e){c(e.pageX,e.pageY)}function d(e){var t=e.touches[0];c(t.pageX,t.pageY)}function s(){document.removeEventListener("mousemove",u),document.removeEventListener("touchmove",d),document.removeEventListener("mouseup",s),document.removeEventListener("touchend",s)}document.addEventListener("mousemove",u),document.addEventListener("touchmove",d),document.addEventListener("mouseup",s),document.addEventListener("touchend",s)}e.classList.add("closed"),t.addEventListener("click",(function(){return u(!o)})),e.addEventListener("touchstart",(function(e){c=e.touches[0].clientY})),e.addEventListener("touchend",(function(e){var t=e.changedTouches[0].clientY;t-c>20?u(!1):c-t>20&&u(!0)})),n.forEach((function(e){e.addEventListener("mousedown",d),e.addEventListener("touchstart",d)}))}));
//# sourceMappingURL=index.1c14c61e.js.map
