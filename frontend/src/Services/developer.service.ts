import BaseService from './base.service';

export default class DeveloperService extends BaseService {

  list(keyword: string | null = null): Promise<Response> {
    return this.get(`/developer${keyword ? '?k=' + keyword : ''}`);
  }

  view(id: number): Promise<Response> {
    return this.get(`/developer/${id}`);
  }

  store(form: any): Promise<Response> {
    return this.post('/developer', form);
  }

  update(id: number, form: any): Promise<Response> {
    return this.put(`/developer/${id}`, form);
  }

  destroy(id: number): Promise<Response> {
    return this.delete(`/developer/${id}`);
  }
}
