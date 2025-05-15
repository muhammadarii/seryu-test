import axios from "axios";

export const FetchLogin = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/authentication/token/new?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
      }
    );
    const requestToken = response.data.request_token;

    window.location.href = `${process.env.NEXT_PUBLIC_CALLBACK_URL}/authenticate/${requestToken}?redirect_to=${window.location.origin}/auth/callback`;
  } catch (err) {
    console.error("Error fetching request token:", err);
    throw err;
  }
};

export const FetchSession = async (requestToken: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/authentication/session/new?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
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
