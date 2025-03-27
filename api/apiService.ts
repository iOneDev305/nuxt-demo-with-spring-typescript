const apiService = async <T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data: FormData | Record<string, any> | null = null
  ): Promise<T | string | Blob> => {
  
    const url = `/api${endpoint}`;
  
    // Define headers as Record<string, string> to handle content-type safely
    const headers: Record<string, string> = {
      'X-API-Key': useRuntimeConfig().public.API_KEY || '',
    };
  
    // Conditionally add 'Content-Type' if necessary
    if (method !== 'GET' && data) {
      headers['Content-Type'] = 'application/json';
    }
  
    const options: RequestInit = {
      method,
      headers, // Now this is a plain object with type Record<string, string>
    };
  
    if (data) {
      if (data instanceof FormData) {
        // Remove 'Content-Type' header when sending FormData
        delete headers['Content-Type'];
        options.body = data;
      } else {
        options.body = JSON.stringify(data); // Stringify data for JSON requests
      }
    }
  
    try {
      const response = await fetch(url, options);
      console.log('Response status:', response.status);
  
      const contentType = response.headers.get('Content-Type');
      let responseData: T | string | Blob;
  
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
        console.log('API Response:', responseData);
      } else if (contentType && contentType.includes('application/octet-stream')) {
        responseData = await response.blob(); // Handle binary file response
      } else {
        responseData = await response.text(); // Default fallback for other content types
      }
  
      return responseData;
    } catch (error) {
      console.error('API Error:', error);
      throw error; // Rethrow error for handling by the caller
    }
  };
  
  export default apiService;
  