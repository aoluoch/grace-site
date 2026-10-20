import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Field,
  TextInput,
  PasswordInput,
  SubmitButton,
  FormStatus,
  type Status,
} from "../components/forms/formControls";

function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const password = fd.get("password") as string;
    if (password.length < 8) {
      setStatus({
        type: "error",
        message: "Password must be at least 8 characters.",
      });
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      await signup(
        fd.get("email") as string,
        password,
        fd.get("name") as string,
      );
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setStatus({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "Unable to create your account. Please try again.",
      });
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#efefef] px-4 py-12">
      <div className="w-full max-w-md rounded-xl border border-[#dcdcdc] bg-white p-7 shadow-sm sm:p-9">
        <div className="mb-6 h-[3px] w-14 bg-[#B38E34]" />
        <h1 className="text-2xl font-semibold text-[#202163]">
          Join Grace Arena
        </h1>
        <p className="mt-1 text-sm text-[#676767]">
          Create a member account to register for events, submit requests and
          manage your preferences.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Field label="Full name" required>
            <TextInput name="name" required autoComplete="name" />
          </Field>
          <Field label="Email" required>
            <TextInput type="email" name="email" required autoComplete="email" />
          </Field>
          <Field label="Password" required hint="At least 8 characters.">
            <PasswordInput name="password" required autoComplete="new-password" />
          </Field>
          <FormStatus status={status} />
          <SubmitButton loading={loading}>Create account</SubmitButton>
        </form>
        <p className="mt-6 text-sm text-[#676767]">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-[#202163] hover:text-[#B38E34]">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Signup;
