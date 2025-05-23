import { AxiosInstance } from 'axios';

export default class DataService {
  constructor(private axios: AxiosInstance) {}

  async fetchDataList(
    pageType: string,
    searchOptions: {
      searchBy: string;
      searchValue: string;
      page: number;
      pageSize: number;
      userID?: string;
    },
  ) {
    const apiSearchParam = {
      search_by: searchOptions.searchBy,
      search_value: searchOptions.searchValue,
      page: searchOptions.page,
      page_size: searchOptions.pageSize,
      user_id: searchOptions.userID,
    };
    const apiUrl = `${process.env.REACT_APP_API_ENDPOINT}/${pageType}`;
    try {
      const request = await this.axios.get(apiUrl, { params: apiSearchParam });
      const response = await request.data;
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  async fetchDataById(pageType: string, itemId: string) {
    const apiUrl = `${process.env.REACT_APP_API_ENDPOINT}/${pageType}/${itemId}`;
    try {
      const request = await this.axios.get(apiUrl);
      const response = await request.data;
      return response;
    } catch (error) {
      console.error('Error fetching data by ID:', error);
      throw error;
    }
  }

  async addData(
    pageType: string,
    data: {
      any: [];
    },
  ) {
    try {
      // const axiosConfig = {
      //   headers: {
      //     Accept: 'application/json',
      //     // Authorization: `Bearer ${obj.token}`
      //   },
      // };

      const apiUrl = `${process.env.REACT_APP_API_ENDPOINT}/${pageType}`;
      const request = await this.axios.post(apiUrl, data);

      const response = await request.data;
      console.log(response);
      return {
        data: response,
        successMsg: '성공적으로 생성했습니다.',
        error: null,
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        data: null,
        successMsg: null,
        error: 'Cannot add',
      };
    }
  }

  async deleteData(pageType: string, ids: string[]) {
    const apiUrl = `${process.env.REACT_APP_API_ENDPOINT}/${pageType}`;
    try {
      const request = await this.axios.delete(apiUrl, { data: { ids } });
      const response = request.data;
      return response;
    } catch (error) {
      console.error('Error delete data:', error);
      throw error;
    }
  }

  async deleteDataById(pageType: string, id: string) {
    const apiUrl = `${process.env.REACT_APP_API_ENDPOINT}/${pageType}`;
    try {
      const request = await this.axios.delete(apiUrl);
      const response = request.data;
      return response;
    } catch (error) {
      console.error('Error delete data: ', error);
      throw error;
    }
  }

  async editData(
    pageType: string,
    updatedData: {
      any: [];
    },
  ) {
    const apiUrl = `${process.env.REACT_APP_API_ENDPOINT}/${pageType}`;
    try {
      const request = await this.axios.put(apiUrl, updatedData);
      const response = request.data;
      return response;
    } catch (error) {
      console.error('Error edit data:', error);
      throw error;
    }
  }

  async editdataById(
    pageType: string,
    id: string,
    updatedData: {
      content: string;
      title: string;
      password?: string;
    },
  ) {
    const apiUrl = `${pageType}/${id}`;
    try {
      const response = await this.axios.put(apiUrl, updatedData);
      return response.data;
    } catch (error) {
      console.error('Error editing data: ', error);
      throw error;
    }
  }

  async addCampaignData(
    pageType: string,
    data: {
      title: string;
      content: string;
      link: string;
      image: File;
      image_name: string;
    },
  ) {
    const formData = new FormData();
    formData.append('file', data.image, data.image.name);
    const apiUrl = `${process.env.REACT_APP_API_ENDPOINT}/${pageType}`;
    try {
      const assetResponse = await this.axios.post('assets', formData);

      const mainData = {
        title: data.title,
        content: data.content,
        link: data.link,
        image: assetResponse.data.filename,
        image_name: assetResponse.data.original_name,
      };

      const response = await this.axios.post(apiUrl, mainData);

      return { assetResponse: assetResponse.data, mainResponse: response.data };
    } catch (error) {
      console.error('Error posting data: ', error);
      throw error;
    }
  }

  async editCampaignData(
    pageType: string,
    data: {
      id: string;
      title: string;
      content: string;
      link: string;
      image: File;
      image_name: string;
    },
  ) {
    const apiUrl = `${pageType}`;
    const formData = new FormData();
    formData.append('file', data.image, data.image.name);

    try {
      const assetResponse = await this.axios.post('assets', formData);

      const mainData = {
        id: data.id,
        title: data.title,
        content: data.content,
        link: data.link,
        image: assetResponse.data.filename,
        image_name: assetResponse.data.original_name,
      };

      const response = await this.axios.put(apiUrl, mainData);

      return { assetResponse: assetResponse.data, mainResponse: response.data };
    } catch (error) {
      console.error('Error putting data: ', error);
      throw error;
    }
  }
}
