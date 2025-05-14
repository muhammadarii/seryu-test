import axios from "axios";

export const FetchLogin = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
      }
    );
    const requestToken = response.data.request_token;

    window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${window.location.origin}/auth/callback`;
  } catch (error) {
    console.error("Error fetching request token:", error);
    throw error;
  }
};
