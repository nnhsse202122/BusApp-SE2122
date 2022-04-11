const cacheName = 'busapp-v1'
const content = [
    '/views',
    '/views/index.ejs',
    '/views/include',
    '/views/inclide/indexContent.ejs'

]
self.addEventListener('install',(e)=>{
    e.waitUntil(async ()=>{
        const cache = await caches.open(cacheName);
        await cache.addAll(content);
    })
})