import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getUsers() {
    try {
      const checkCache = await this.cacheManager.get('entries');
      console.log(
        '🚀 ~ file: app.service.ts:13 ~ AppService ~ getUsers ~ checkCache:',
        checkCache,
      );
      if (checkCache) {
        console.log('from cache');
        return checkCache;
      }
      const response = await axios
        .get('https://api.publicapis.org/entries')
        .then((res) => res.data);

      await this.cacheManager.set('entries', response);
      console.log('from api');
      return response;
    } catch (error) {
      throw error;
    }
  }
}
