import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { dark } from "@clerk/themes";
import SignInPage from "~/components/SignInPage";

const publicPages: Array<string> = [];

const MyApp: AppType = ({ Component, pageProps }) => {
  const { pathname } = useRouter();

  const isPublicPage = publicPages.includes(pathname);

  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      {isPublicPage ? (
        <>
          <Component {...pageProps} />
        </>
      ) : (
        <>
          <SignedIn>
            {/*<Layout>*/}
            <Component {...pageProps} />
            {/*</Layout>*/}
          </SignedIn>
          <SignedOut>
            <SignInPage />
          </SignedOut>
        </>
      )}
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
