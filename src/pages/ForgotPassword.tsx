import { useState } from "react";
import { Link } from "react-router-dom";
import { requestPasswordRecovery } from "../lib/api";
import {
  Field,
  TextInput,
  SubmitButton,
  FormStatus,
  type Status,
} from "../components/forms/formControls";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = (fd.get("email") as string)?.trim();
    setLoading(true);
    setStatus(null);
    try {
      await requestPasswordRecovery(email);
      setSent(true);
      setStatus({
        type: "success",
        message:
          "If an account exists for that email, a password reset link is on its way. Check your inbox (and spam).",
      });
    } catch {
      // Don't reveal whether the email exists.
      setSent(true);
      setStatus({
        type: "success",
        message:
          "If an account exists for that email, a password reset link is on its way. Check your inbox (and spam).",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#efefef] px-4 py-12">
      <div className="w-full max-w-md rounded-xl border border-[#dcdcdc] bg-white p-7 shadow-sm sm:p-9">
        <div className="mb-6 h-[3px] w-14 bg-[#B38E34]" />
        <h1 className="text-2xl font-semibold text-[#202163]">
          Reset your password
        </h1>
        <p className="mt-1 text-sm text-[#676767]">
          Enter the email linked to your Grace Arena account and we&apos;ll send
          you a secure link to set a new password.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Field label="Email" required>
            <TextInput
              type="email"
              name="email"
              required
              autoComplete="email"
              disabled={sent}
            />
          </Field>
          <FormStatus status={status} />
          {!sent && (
            <SubmitButton loading={loading}>Send reset link</SubmitButton>
          )}
        </form>
        <p className="mt-6 text-sm text-[#676767]">
          Remembered it?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#202163] hover:text-[#B38E34]"
          >
            Back to sign in
          </Link>
        </p>
      </div>
    </main>
  );
}

export default ForgotPassword;
