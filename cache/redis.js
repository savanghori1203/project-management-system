const ioredis = require('ioredis');

class Redis {
  constructor(options) {
    const redisOptions = {
      password: options.password,
    };
    if (options.sentinels) {
      redisOptions.sentinels = options.sentinels;
      redisOptions.name = options.name;
    } else {
      redisOptions.host = options.host;
      if (options.port) {
        redisOptions.port = options.port;
      }
    }
    this.client = new ioredis(redisOptions);
  }

  async del(key) {
    return await this.client.del(key);
  }

  async getKeysByPrefix(prefix) {
    const keys = await this.client.keys(`${prefix}*`);
    if (keys.length) await this.client.del(keys);

  }

  async get(key) {
    const data = await this.client.get(key);
    if (data) {
      const parseData = JSON.parse(data);
      return parseData['data'];
    } else {
      return null;
    }
  }

  async getByPrefix(prefix) {
    const keys = await this.client.keys(`${prefix}*`);
    return keys;
  }

  async set({key, data, lifetime}) {
    const keyData = {data: data};
    const json = JSON.stringify(keyData);
    await this.client.set(key, json);
    if (lifetime) {
      await this.client.expire(key, lifetime);
    }
    return true;
  }

  async setLifetime({key, lifetime}) {
    await this.client.expire(key, lifetime);
    return true;
  }

  async delByPrefix(prefix, reCheck = false) {
    // const keys = await this.client.keys(`${prefix}*`);
    // if (keys.length) await this.client.del(keys);
    const redisKeyCheckCount = process.env.REDIS_KEY_CHECK_COUNT ? process.env.REDIS_KEY_CHECK_COUNT : 100;
    const stream = this.client.scanStream({match: `${prefix}*`, count: redisKeyCheckCount});
    let keysCount = 0;
    stream.on('data', (resultKeys) => {
      stream.pause();
      keysCount = resultKeys.length;
      Promise.all(resultKeys.map(async (key) => {
        await this.client.del(key.toString());
      })).then(() => {
        stream.resume();
      });
    });
    stream.on('end', async () => {
      if (!reCheck) {
        await this.delByPrefix(prefix, reCheck = true);
      }
    });
    return keysCount;
  }
    async add({key, data}) {
      await this.client.sadd(key, data);
      return true;
    }

    async getMem({key}) {
      const data = await this.client.smembers(key);
      if (data) {
        return data;
      } else {
        return null;
      }
    }

    async check({key, data}) {
      return await this.client.sismember(key, data);
    }

    async remove({key, data}) {
      await this.client.srem(key, data);
      return true;
    }
}

module.exports = Redis;
