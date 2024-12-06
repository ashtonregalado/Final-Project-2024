import axios from "axios";

export default async function fetchFromDB() {
    let content: string;
    try {
        const response = await axios.get('http://localhost:3000/pisti');
        content = response.data;
        console.log(response.data);
        return content;
    } catch {
        console.log("way gagana");
    }
}

