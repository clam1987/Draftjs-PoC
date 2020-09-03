import axios from "axios";

const GET = () => {
    return axios.get("api/announcements")
}

const POST = data => {
    return axios.post("api/announcements", data)
}

export default { GET, POST }