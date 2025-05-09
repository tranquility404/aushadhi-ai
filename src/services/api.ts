import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.aushadhiai.com';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authApiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// authApiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("authToken"); // Retrieve token
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// authApiClient.interceptors.response.use(
//   (response) => response, // Pass valid responses
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem("authToken")
//       window.location.href = "/login"; // Redirect to login
//     }
//     return Promise.reject(error); // Reject other errors
//   }
// );

export interface ScreeningRequest {
  diseaseName: string;
}

export interface ScreeningResponse {
      disease_protien: string;
      protien_id: string;
      percentage_contro: number;
      Associated_pathway: string;
}

// export async function startScreening(diseaseName: string): Promise<ScreeningResponse> {
//   try {
//     await new Promise(resolve => setTimeout(resolve, 5000));
    
//     return {
//       success: true,
//       message: `Virtual screening initiated for ${diseaseName}`,
//       data: {
//         targets: [
//           {
//             id: 'T001',
//             name: 'ACE2 Receptor',
//             confidence: 0.89,
//             pathways: ['Cardiovascular', 'Pulmonary']
//           },
//           {
//             id: 'T002',
//             name: 'TNF-alpha',
//             confidence: 0.76,
//             pathways: ['Inflammatory', 'Immune']
//           },
//           {
//             id: 'T003',
//             name: 'IL-6 Receptor',
//             confidence: 0.81,
//             pathways: ['Inflammatory', 'Cytokine']
//           }
//         ]
//       }
//     };
//   } catch (error) {
//     console.error('Error during screening:', error);
//     return {
//       success: false,
//       message: 'Failed to initiate screening. Please try again.'
//     };
//   }
// }
