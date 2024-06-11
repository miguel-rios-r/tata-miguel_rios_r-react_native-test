class HTTP {

  private BASE_URL = "";

  constructor(){
    this.BASE_URL = "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros"
  }

  private async executeHttpRequest (method: string, path: string, bodyData?: string | null, id?: string) {
    let formatedPath = path;
    let body = ""
    
    if (id){
      formatedPath = `${path}?id=${id}`
    }
    
    if (bodyData){
      body = bodyData;
    }

    try {
      const response = await fetch(`${this.BASE_URL}${formatedPath}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'authorId': '12345',
        },
        body
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      // console.error('Fetch error:', error);
      return null;
    }
  }

  public async get(path: string) {
    return await this.executeHttpRequest('GET', path);
  }

  public async post(path: string, bodyData: string) {
    return await this.executeHttpRequest('POST', path, bodyData);
  }

  public async put(path: string, bodyData: string, id: string) {
    return await this.executeHttpRequest('PUT', path, bodyData, id)
  }

  public async delete(path: string, id: string) {
    return await this.executeHttpRequest('DELETE', path, null, id);
  }
}

export default new HTTP;