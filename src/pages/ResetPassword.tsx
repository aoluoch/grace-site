import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { confirmPasswordRecovery } from "../lib/api";
import {
  Field,
  PasswordInput,
  SubmitButton,
  FormStatus,
  type Status,
} from "../components/forms/formControls";

function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const userId = params.get("userId") ?? "";
  const secret = params.get("secret") ?? "";
  const validLink = Boolean(userId && secret);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const password = fd.get("password") as string;
    const confirm = fd.get("confirm") as string;

    if (password.length < 8) {
      setStatus({
        type: "error",
        message: "Password must be at least 8 characters.",
      });
      return;
    }
    if (password !== confirm) {
      setStatus({ type: "error", message: "Passwords do not match." });
      return;
    }

    setLoading(true);
    setStatus(null);
    try {
      await confirmPasswordRecovery(userId, secret, password);
      setDone(true);
      setStatus({
        type: "success",
        message: "Your password has been reset. You can now sign in.",
      });
      setTimeout(() => navigate("/login", { replace: true }), 1800);
    } catch (err) {
      setStatus({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "This reset link is invalid or has expired. Please request a new one.",
      });
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#efefef] px-4 py-12">
      <div className="w-full max-w-md rounded-xl border border-[#dcdcdc] bg-white p-7 shadow-sm sm:p-9">
        <div className="mb-6 h-[3px] w-14 bg-[#B38E34]" />
        <h1 className="text-2xl font-semibold text-[#202163]">
          Choose a new password
        </h1>

        {!validLink ? (
          <>
            <p className="mt-2 text-sm text-[#676767]">
              This reset link is missing or invalid. Please request a new one.
            </p>
            <Link
              to="/forgot-password"
              className="mt-6 inline-flex font-semibold text-[#202163] hover:text-[#B38E34]"
            >
              Request a new link
            </Link>
          </>
        ) : (
          <>
            <p className="mt-1 text-sm text-[#676767]">
              Enter a new password for your Grace Arena account.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <Field label="New password" required hint="At least 8 characters.">
                <PasswordInput
                  name="password"
                  required
                  autoComplete="new-password"
                  disabled={done}
                />
              </Field>
              <Field label="Confirm new password" required>
                <PasswordInput
                  name="confirm"
                  required
                  autoComplete="new-password"
                  disabled={done}
                />
              </Field>
              <FormStatus status={status} />
              {!done && (
                <SubmitButton loading={loading}>Reset password</SubmitButton>
              )}
            </form>
            <p className="mt-6 text-sm text-[#676767]">
              <Link
                to="/login"
                className="font-semibold text-[#202163] hover:text-[#B38E34]"
              >
                Back to sign in
              </Link>
            </p>
          </>
        )}
      </div>
    </main>
  );
}

export default ResetPassword;
