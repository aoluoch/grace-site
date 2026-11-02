import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { accountHome } from "../lib/api";
import { SESSION_SIGNOUT_KEY } from "../lib/sessionTimeout";
import {
  Field,
  TextInput,
  PasswordInput,
  SubmitButton,
  FormStatus,
  type Status,
} from "../components/forms/formControls";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  const locationState = location.state as { from?: string; reason?: string } | null;
  const from = locationState?.from ?? "/dashboard";
  const [signedOutForInactivity, setSignedOutForInactivity] = useState(
    locationState?.reason === "inactivity",
  );

  useEffect(() => {
    if (locationState?.reason === "inactivity") {
      setSignedOutForInactivity(true);
    }
    try {
      if (sessionStorage.getItem(SESSION_SIGNOUT_KEY) === "inactivity") {
        sessionStorage.removeItem(SESSION_SIGNOUT_KEY);
        setSignedOutForInactivity(true);
      }
    } catch {
      /* Notice is optional when storage is blocked. */
    }
  }, [locationState?.reason]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    setStatus(null);
    try {
      const signedIn = await login(
        fd.get("email") as string,
        fd.get("password") as string,
      );
      navigate(accountHome(signedIn, from), { replace: true });
    } catch (err) {
      setStatus({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "Unable to sign in. Check your details and try again.",
      });
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#efefef] px-4 py-12">
      <div className="w-full max-w-md rounded-xl border border-[#dcdcdc] bg-white p-7 shadow-sm sm:p-9">
        <div className="mb-6 h-[3px] w-14 bg-[#B38E34]" />
        <h1 className="text-2xl font-semibold text-[#202163]">Welcome back</h1>
        <p className="mt-1 text-sm text-[#676767]">
          Sign in to access your Grace Arena member area.
        </p>
        {signedOutForInactivity && (
          <p className="mt-4 rounded-md border border-[#B38E34]/40 bg-[#B38E34]/10 px-4 py-3 text-sm text-[#202163]">
            You were signed out after 15 minutes without activity. Sign in again
            to continue.
          </p>
        )}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Field label="Email" required>
            <TextInput type="email" name="email" required autoComplete="email" />
          </Field>
          <Field label="Password" required>
            <PasswordInput name="password" required autoComplete="current-password" />
          </Field>
          <div className="-mt-1 text-right">
            <Link
              to="/forgot-password"
              className="text-sm font-semibold text-[#202163] hover:text-[#B38E34]"
            >
              Forgot password?
            </Link>
          </div>
          <FormStatus status={status} />
          <SubmitButton loading={loading}>Sign in</SubmitButton>
        </form>
        <p className="mt-6 text-sm text-[#676767]">
          New here?{" "}
          <Link to="/signup" className="font-semibold text-[#202163] hover:text-[#B38E34]">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
