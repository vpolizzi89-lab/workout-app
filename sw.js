const C="vwt-v19",F=["./","./index.html","./manifest.json","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(u=>new Request(u,{cache:"reload"})))));self.skipWaiting()});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);
  // Only same-origin GETs are handled; Apps Script / any other request goes straight to the network.
  if(e.request.method!=="GET"||u.origin!==location.origin)return;
  // Pages: network first (always fresh when online), cache as offline fallback.
  if(e.request.mode==="navigate"||u.pathname.endsWith("/")||u.pathname.endsWith(".html")){
    e.respondWith(fetch(e.request,{cache:"no-store"}).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put("./index.html",c));return r}).catch(()=>caches.match("./index.html")));return}
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request)))});
