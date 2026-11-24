var V="lsa-os-v7",CORE=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"],
CDN=["https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js","https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(V).then(function(c){return Promise.all([c.addAll(CORE)].concat(CDN.map(function(u){return fetch(u,{mode:"no-cors"}).then(function(r){return c.put(u,r)}).catch(function(){})})))}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V}).map(function(x){return caches.delete(x)}))}).then(function(){return clients.claim()}))});
function guarda(req,res){var cp=res.clone();caches.open(V).then(function(c){c.put(req,cp)});return res}
self.addEventListener("fetch",function(e){var r=e.request;if(r.method!=="GET")return;
 if(new URL(r.url).origin===location.origin){e.respondWith(fetch(r).then(function(res){return guarda(r,res)}).catch(function(){return caches.match(r,{ignoreSearch:true}).then(function(m){return m||caches.match("index.html")})}))}
 else{e.respondWith(caches.match(r).then(function(m){return m||fetch(r).then(function(res){return guarda(r,res)})}))}});
