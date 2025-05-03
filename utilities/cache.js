class Cache {
    constructor(cacheConfig) {
      this.cachingEnabled = (cacheConfig.enabled == 'Y' ? true : false);
      const serverType = cacheConfig.server_type;
      const server = cacheConfig.servers;
      const options = cacheConfig.options;
      if (this.cachingEnabled) {
        if (serverType === 'memcached') {
          const Memcache = require('../cache/memcache.js').Memcache;
          this.obj = new Memcache(server, options);
        } else if (serverType === 'redis') {
          const Redis = require('../cache/redis.js');
          this.obj = new Redis(options);
        }
      }
    }
    
    async get(key) {
      return await this.obj.get(key);
    }
    
    async set({key, data, lifetime}) {
      return await this.obj.set({key, data, lifetime});
    }
    
    async del(key) {
      return await this.obj.del(key);
    }
  
    async getKeysByPrefix(prefix) {
      return await this.obj.getKeysByPrefix(prefix);
    }
    
    async delByPrefix(prefix) {
      return await this.obj.delByPrefix(prefix);
    }
    
    async fetch({key, lifetime, fetchFunction}) {
      if (this.cachingEnabled) {
        try {
          const data = await this.get(key);
          if (data) {
            return data;
          } else {
            const dataToCache = await fetchFunction();
            await this.set({key, data: dataToCache, lifetime});
            return dataToCache;
          }
        } catch (e) {
          const dataToCache = await fetchFunction();
          await this.set({key, data: dataToCache, lifetime});
          return dataToCache;
        }
      } else {
        return await fetchFunction();
      }
    }
  
    async setLifeTime({key, lifetime}) {
      return await this.obj.setLifetime({key, lifetime});
    }
  
    async add({key, data}) {
      return await this.obj.add({key, data});
    }
  
    async getMem({key}) {
      return await this.obj.getMem({key});
    }
  
    async check({key, data}) {
      return await this.obj.check({key, data});
    }
  
    async remove({key, data}) {
      return await this.obj.remove({key, data});
    }
  }
  module.exports = Cache;
  