import { ApiResponse, Person } from '../types';

class ApiService {
  async getAllPersons(value: string, page?: string): Promise<ApiResponse> {
    const link = this.createLink(value, page);
    return this.getData<ApiResponse>(link);
  }

  async getPerson(id: string): Promise<Person> {
    const link = `https://swapi.dev/api/people/${id}`;
    return this.getData<Person>(link);
  }

  private async getData<T>(link: string): Promise<T> {
    const data = await fetch(link).then((response: Response): Promise<T> => {
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

const apiService = new ApiService();

export { apiService, ApiService };
