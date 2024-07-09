import { ApiResponse } from '../types';

export class ApiService {
  async getAllPersons(value: string): Promise<ApiResponse> {
    const link = this.createLink(value);
    const data = await fetch(link).then((response: Response): Promise<ApiResponse> => {
      if (!response.ok) {
        throw new Error(response.statusText || `${response.status}`);
      } else {
        return response.json();
      }
    });
    return data;
  }

  private createLink(value: string): string {
    const searchValue = value.toLowerCase().trim();
    return `https://swapi.dev/api/people/?search=${searchValue}`;
  }
}
