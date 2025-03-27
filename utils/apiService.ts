export const apiService = async <T>(endpoint: string, method: string = 'GET', data: any = null): Promise<T> => {
  const config = useRuntimeConfig();
  const url = `${config.public.BASE_URL}${endpoint}`;

  // Log the request URL and method
  // console.log('Request URL:', url);
  // console.log('Request Method:', method);
  // console.log('Request Data:', data);

  const headers: HeadersInit = {
    'X-API-Key': config.public.API_KEY || '',
  };

  // Set Content-Type for non-GET methods and non-FormData requests
  if (method !== 'GET' && data && !(data instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const options: RequestInit = {
    method,
    headers,
  };

  // If there's data, add it to the request body
  if (data) {
    options.body = data instanceof FormData ? data : JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);

    // Log the response status
    console.log('Response Status:', response.status);

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const contentType = response.headers.get('Content-Type');

    // Log the response headers
    // console.log('Response Headers:', response.headers);

    let responseData: T;

    if (contentType?.includes('application/json')) {
      responseData = await response.json();
      // Log the JSON response
      console.log('Response JSON:', responseData);
    } else if (contentType?.includes('application/octet-stream')) {
      responseData = (await response.blob()) as unknown as T;
      // Log the blob response
      console.log('Response Blob:', responseData);
    } else {
      responseData = (await response.text()) as unknown as T;
      // Log the text response
      console.log('Response Text:', responseData);
    }

    return responseData;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
