(self.webpackChunkmarketplace_template_poc=self.webpackChunkmarketplace_template_poc||[]).push([[641],{9992:function(){const r=function(){const e=this;e.init=()=>{r.colors(),r.typography(),r.icons(),r.clipboard(),r.flashes()},e.init()};r.colors=()=>{const e=this;e.settings={},e.settings.container=document.querySelector("#colors"),e.settings.propertiesList=e.settings.container.querySelectorAll("dl"),e.init=()=>{e.showBackgroundClass(),e.showBackgroundColor()};function o(t){return t.indexOf("#")!=-1?t:(t=t.replace("rgba","").replace("rgb","").replace("(","").replace(")",""),t=t.split(","),"#"+("0"+parseInt(t[0],10).toString(16)).slice(-2)+("0"+parseInt(t[1],10).toString(16)).slice(-2)+("0"+parseInt(t[2],10).toString(16)).slice(-2))}e.showBackgroundClass=()=>{e.settings.propertiesList.forEach(t=>{let n="";Array.from(t.parentElement.querySelector(".styleGuide-colorBox").children).forEach(s=>{n+="<li>"+Array.from(s.classList).filter(i=>i.startsWith("bg-"))+"</li>"}),t.querySelector(".styleGuide-className ul").insertAdjacentHTML("beforeend",n.replaceAll("bg",""))})},e.showBackgroundColor=()=>{e.settings.propertiesList.forEach(t=>{let n="";Array.from(t.parentElement.querySelector(".styleGuide-colorBox").children).forEach(s=>{n+="<li>"+o(window.getComputedStyle(s).getPropertyValue("background-color"))+"</li>"}),t.querySelector(".styleGuide-color ul").insertAdjacentHTML("beforeend",n)})},e.init()},r.icons=()=>{const e=this;e.settings={},e.settings.container=document.querySelector("#icons"),e.settings.iconName="data-icon",e.settings.icons=e.settings.container.querySelectorAll(`[${e.settings.iconName}]`),e.init=()=>{e.wrap(),e.showNames(),e.clipboard()},e.wrap=()=>{e.settings.icons.forEach(o=>{let t=document.createElement("li");t.classList.add("flex","flex-col","items-center","cursor-pointer"),o.parentNode.insertBefore(t,o),t.appendChild(o)})},e.showNames=()=>{e.settings.icons.forEach(o=>{o.parentElement.insertAdjacentHTML("beforeend",o.getAttribute(e.settings.iconName))})},e.clipboard=()=>{e.settings.icons.forEach(o=>{o.parentElement.addEventListener("click",()=>{let t=o.parentElement.childNodes[1].textContent.trim();navigator.clipboard.writeText(`{% render 'theme/simple/ui/icon', icon: '${t}' %}`).then(()=>{o.parentElement.classList.add("text-confirmation"),setTimeout(()=>{o.parentElement.classList.remove("text-confirmation")},800)},()=>{new Error("Could not copy the code to clipboard")})})})},e.init()},r.typography=()=>{const e=this;e.settings={},e.settings.container=document.querySelector("#typography"),e.settings.typographyExample="styleGuide-example",e.init=()=>{e.showTextInfo()},e.showTextInfo=()=>{Array.from(e.settings.container.children).filter(t=>t.matches("div")).forEach(t=>{let n=window.getComputedStyle(t.querySelector("."+e.settings.typographyExample).firstElementChild);t.querySelector(".styleGuide-class")&&(t.querySelector(".styleGuide-class").textContent=t.querySelector("."+e.settings.typographyExample).firstElementChild.classList),t.querySelector(".styleGuide-color").textContent=n.getPropertyValue("color"),t.querySelector(".styleGuide-font").textContent=n.getPropertyValue("font-family"),t.querySelector(".styleGuide-size").textContent=n.getPropertyValue("font-size"),t.querySelector(".styleGuide-fontWeight").textContent=n.getPropertyValue("font-weight"),t.querySelector(".styleGuide-lineHeight").textContent=n.getPropertyValue("line-height")})},e.init()},r.clipboard=()=>{const e=this;e.settings={},e.settings.code=document.querySelectorAll(".styleGuide-code"),e.settings.button=document.querySelector("#styleGuide-copyButton"),e.settings.buttonSelector=".styleGuide-copy",e.init=()=>{e.addCopyButton(),e.clipboard()},e.addCopyButton=()=>{e.settings.code.forEach(o=>{o.appendChild(e.settings.button.content.cloneNode(!0))})},e.clipboard=()=>{document.addEventListener("click",o=>{if(o.target.matches(e.settings.buttonSelector)){let t=o.target.parentElement.childNodes[0].textContent.trim();navigator.clipboard.writeText(t).then(()=>{o.target.classList.add("text-confirmation"),setTimeout(()=>{o.target.classList.remove("text-confirmation")},800)},()=>{new Error("Could not copy the code to clipboard")})}})},r.flashes=()=>{document.querySelector("#flashes").style.position="static",document.querySelector("#styleGuide-flashes .styleGuide-example").appendChild(document.querySelector("#flashes"))},e.init()},new r}}]);