const API_URL = 'http://localhost:8000/api';

export async function fetchEvents(){
    const response = await fetch(`${API_URL}/events/`);
    if(!response.ok){
        throw new Error('Failed to fetch events');
    }
    return await response.json();
}