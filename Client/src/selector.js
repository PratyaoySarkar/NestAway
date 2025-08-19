import { selector } from 'recoil';
import axios from 'axios';

// This selector fetches the list of places from your API.
export const placesSelector = selector({
  key: 'placesSelector',
  get: async () => {
    try {
      const response = await axios.get('/places');
      return response.data; 
    } catch (error) {
      console.error("Failed to fetch places:", error);
      throw error; 
    }
  },
});