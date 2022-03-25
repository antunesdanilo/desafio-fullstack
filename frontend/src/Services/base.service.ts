import axios from 'axios';

import notifyService from './notify.service';

export default class BaseService {
  public url: string = 'http://localhost:3333';
  private axios: any;
  public headers = {};

  async http(metodo: string, path: string, dados: any = null) {
    if (metodo !== 'get') {
      notifyService.loading()
    }
    this.axios = axios.create({
      baseURL: this.url,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    try {
      const response = await this.axios({
        method: metodo,
        url: this.url + path,
        data: dados || {},
      });
      return this.handle(response);
    } catch (error) {
        return this.handleError(error);
    }
  }

  handle(resposta: any) {
    if (resposta.data.data) {
      return resposta.data.data;
    }
    if ([201, 204].includes(resposta.status)) {
      return;
    }
    return this.handleError(resposta);
  }

  handleError(error: any) {
    let e: any;
    if (error.response) {
      if (error.response.data.errors) {
        e = error.response.data.errors[0];
      } else {
        e = error.response.data;
      }
    } else {
      e = error.data;
    }
    notifyService.loaded('error', e.message)
    return Promise.reject(e);
  }

  // Requisições de consulta
  get(path: string): Promise<Response> {
    return this.http('get', path);
  }

  // Requisições de Inserção
  post(path: string, dados: any = null): Promise<Response> {
    return this.http('post', path, dados).then(r => {
      notifyService.loaded('success', 'Inserido com sucesso')
      return r;
    });
  }

  // Requisições de Atualização
  put(path: string, dados: any = null): Promise<Response> {
    return this.http('put', path, dados).then(r => {
      notifyService.loaded('success', 'Atualizado com sucesso')
      return r;
    });
  }

  // Requisições de Remoção
  delete(path: string): Promise<Response> {
    return this.http('delete', path).then(r => {
      notifyService.loaded('success', 'Removido com sucesso');
      return r;
    });
  }
}
