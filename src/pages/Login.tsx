import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
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

  const from = (location.state as { from?: string } | null)?.from ?? "/dashboard";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    setStatus(null);
    try {
      await login(fd.get("email") as string, fd.get("password") as string);
      navigate(from, { replace: true });
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
