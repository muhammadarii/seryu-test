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
  } catch (err) {
    console.error("Error fetching request token:", err);
    throw err;
  }
};

export const FetchSession = async (requestToken: string) => {
  try {
    const response = await axios.post(
      `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      {
        request_token: requestToken,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error("Error fetching session:", err);
    throw err;
  }
};
