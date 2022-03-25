import BaseService from './base.service';

export default class LevelService extends BaseService {

  list(keyword: string | null = null): Promise<Response> {
    return this.get(`/level${keyword ? '?k=' + keyword : ''}`);
  }

  view(id: number): Promise<Response> {
    return this.get(`/level/${id}`);
  }

  store(form: any): Promise<Response> {
    return this.post('/level', form);
  }

  update(id: number, form: any): Promise<Response> {
    return this.put(`/level/${id}`, form);
  }

  destroy(id: number): Promise<Response> {
    return this.delete(`/level/${id}`);
  }
}
