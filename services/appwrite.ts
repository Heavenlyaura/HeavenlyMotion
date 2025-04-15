import { Client, Databases, ID, Query, Account } from "react-native-appwrite";
import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { router } from "expo-router";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const METRIC_COLLECTION_ID =
  process.env.EXPO_PUBLIC_APPWRTIE_METRIC_COLLECTION_ID!;
const USER_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRTIE_USER_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!); // Your project ID

const database = new Databases(client);
const account = new Account(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      METRIC_COLLECTION_ID,
      [Query.equal("searchTerm", query)]
    );

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];

      await database.updateDocument(
        DATABASE_ID,
        METRIC_COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      await database.createDocument(
        DATABASE_ID,
        METRIC_COLLECTION_ID,
        ID.unique(),
        {
          title: movie.title,
          searchTerm: query,
          movie_id: movie.id,
          count: 1,
          poster_url: "http://image.tmdb.org/t/p/w500" + movie.poster_path,
        }
      );
    }
  } catch (error) {
    console.error("Failed to list documents:", error);
  }
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      METRIC_COLLECTION_ID,
      [Query.limit(5), Query.orderDesc("count")]
    );
    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.error("Failed to fetch trending movies:", error);
    return undefined;
  }
};

// Function to handle OAuth2 authentication flow
export async function startOAuthFlow(provider: any): Promise<void> {
  try {
    // Create a deep link URI that works across Expo environments
    const deepLink = new URL(makeRedirectUri({ preferLocalhost: true }));
    if (!deepLink.hostname) {
      deepLink.hostname = "localhost";
    }
    const scheme = `${deepLink.protocol}//`; // e.g. 'exp://' or 'playground://'

    // Generate the OAuth2 login URL
    const loginUrl = await account.createOAuth2Token(
      provider, // OAuth2 provider (e.g., 'google', 'facebook', etc.)
      `${deepLink}`, // Redirect URI for success
      `${deepLink}` // Redirect URI for failure
    );

    // Open the login URL and wait for redirect
    const result = (await WebBrowser.openAuthSessionAsync(
      `${loginUrl}`,
      scheme
    )) as unknown as AuthResults;

    // Extract credentials from the OAuth redirect URL
    const url = new URL(result.url);
    const secret = url.searchParams.get("secret");
    const userId = url.searchParams.get("userId");

    // If credentials are found, create a session
    if (secret && userId) {
      try {
        await account.createSession(userId, secret);
        const user = await account.get();
        const create = await createUser(user.email, user.name, userId);
        if (create) {
          router.push("/");
        }
      } catch (error) {
        console.error("User creation failed, deleting session:", error);
      }
    } else {
      console.log("OAuth authentication failed");
    }
  } catch (error) {
    console.error("Error during OAuth flow", error);
  }
}

const createUser = async (email: string, name: string, userId: string) => {
  try {
    // Check if the user already exists
    const existingUser = await database.listDocuments(
      DATABASE_ID,
      USER_COLLECTION_ID,
      [Query.equal("email", email)]
    );

    if (existingUser.total > 0) {
      return existingUser;
    }

    const result = await database.createDocument(
      DATABASE_ID,
      USER_COLLECTION_ID,
      userId,
      {
        email: email,
        name: name,
        userID: ID.unique(),
      }
    );
    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    await account.deleteSession("current");
  }
};
