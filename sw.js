const CACHE='aiflowguide-v1';
const CORE=['/','/jobs/latest.html','/jobs/pakistan-government-jobs.html','/jobs/global-government-jobs.html','/guides/','/tools/','/about.html','/contact.html','/privacy.html','/disclaimer.html','/terms.html','/assets/css/styles.css','/assets/js/site.js','/manifest.webmanifest','/jobs/data/jobs.json'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('/404.html'))))});
