import { Suspense } from "react";
import { Callback } from "@/components/parts/Callback";

const AuthCallback = () => {
  return (
    <Suspense fallback={<div>Loading callback...</div>}>
      <Callback />
    </Suspense>
  );
};

export default AuthCallback;
