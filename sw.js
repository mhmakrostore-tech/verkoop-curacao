const CACHE='verkoop-curacao-shell-v1';
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','./index.html'])).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(self.clients.claim())});
self.addEventListener('fetch',event=>{
 const r=event.request;if(r.method!=='GET')return;
 const u=new URL(r.url);
 if(u.hostname.includes('firestore.googleapis.com')||u.hostname.includes('identitytoolkit.googleapis.com')||u.hostname.includes('securetoken.googleapis.com'))return;
 if(u.origin===self.location.origin || ['www.gstatic.com','cdn.jsdelivr.net','cdnjs.cloudflare.com','unpkg.com'].includes(u.hostname)){
  event.respondWith(fetch(r).then(response=>{
    if(response.ok || response.type==='opaque'){const clone=response.clone();caches.open(CACHE).then(c=>c.put(r,clone)).catch(()=>{});}
    return response;
  }).catch(()=>caches.match(r)));
 }
});
