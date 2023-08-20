import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-20 ">
      <h1 className="text-center text-3xl">
        You need to sign in to use this app!
      </h1>
      <SignIn />
    </div>
  );
};

export default SignInPage;
