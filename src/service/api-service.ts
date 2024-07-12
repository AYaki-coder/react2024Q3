import { ApiResponse } from '../types';

export class ApiService {
  async getAllPersons(value: string, page?: string): Promise<ApiResponse> {
    const link = this.createLink(value, page);
    const data = await fetch(link).then((response: Response): Promise<ApiResponse> => {
      if (!response.ok) {
        throw new Error(response.statusText || `${response.status}`);
      } else {
        return response.json();
      }
    });
    return data;
  }

  private createLink(value: string, page: string = '1'): string {
    const searchValue = value.toLowerCase().trim();
    return `https://swapi.dev/api/people/?search=${searchValue}&page=${page}`;
  }
}
