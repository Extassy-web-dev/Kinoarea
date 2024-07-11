import axios from "axios";

let apiKey = "3f1bf8880aed2afe04a9b7bc8ab1b4c7";
let apiUrl = "https://api.themoviedb.org/3";
let accesToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjFiZjg4ODBhZWQyYWZlMDRhOWI3YmM4YWIxYjRjNyIsInN1YiI6IjY2MzhiMGUyY2VlMmY2MDEyYzg5ZWRiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5gT1VINi_Rd7sYh-S_m84xqczb49dLTXOdLPX2jCDqg"
export async function fetchData(path) {
	try {
		const res = axios.get(`${apiUrl}${path}`, {
			params: {
				api_key: apiKey,
				page: 1,
				include_adult: "false",
				language: "ru-RU"
			},
			headers: {
				accept: "aplication/json",
				Authorization: `Bearer ${accesToken}`,
			},
		});

		return res;
	} catch (error) {
		throw error;
	}
}
