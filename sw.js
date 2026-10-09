const V='ea-v1';
const SHELL=['./','./index.html','./manifest.webmanifest','./lib/three.min.js','./icons/icon-192.png','./icons/icon-512.png','./icons/maskable-512.png','./icons/apple-touch-icon.png',
'./fonts/vazirmatn-arabic-300-normal.woff2','./fonts/vazirmatn-arabic-500-normal.woff2','./fonts/vazirmatn-arabic-700-normal.woff2','./fonts/vazirmatn-arabic-900-normal.woff2',
'./fonts/vazirmatn-latin-300-normal.woff2','./fonts/vazirmatn-latin-500-normal.woff2','./fonts/vazirmatn-latin-700-normal.woff2','./fonts/vazirmatn-latin-900-normal.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(SHELL.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>hit||fetch(e.request).then(r=>{
    if(r&&r.ok&&new URL(e.request.url).origin===location.origin){const cp=r.clone();caches.open(V).then(c=>c.put(e.request,cp))}
    return r}).catch(()=>caches.match('./index.html'))))});
