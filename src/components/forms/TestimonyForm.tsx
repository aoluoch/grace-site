import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { submitTestimony } from "../../lib/api";
import {
  Field,
  TextInput,
  TextArea,
  SubmitButton,
  FormStatus,
  type Status,
} from "./formControls";

function TestimonyForm() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setLoading(true);
    setStatus(null);
    try {
      await submitTestimony(
        {
          name: (fd.get("name") as string) || undefined,
          email: (fd.get("email") as string) || undefined,
          title: fd.get("title") as string,
          body: fd.get("body") as string,
        },
        user?.$id,
      );
      form.reset();
      setStatus({
        type: "success",
        message:
          "Thank you for sharing! Your testimony will be reviewed before publication.",
      });
    } catch {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again in a moment.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name (optional)">
          <TextInput
            name="name"
            placeholder="Jane Doe"
            defaultValue={user?.name ?? ""}
          />
        </Field>
        <Field label="Email (optional)">
          <TextInput
            type="email"
            name="email"
            placeholder="you@example.com"
            defaultValue={user?.email ?? ""}
          />
        </Field>
      </div>
      <Field label="Testimony title" required>
        <TextInput name="title" required placeholder="God turned it around" />
      </Field>
      <Field label="Your testimony" required>
        <TextArea name="body" required placeholder="Share what God has done..." />
      </Field>
      <FormStatus status={status} />
      <SubmitButton loading={loading}>Share testimony</SubmitButton>
    </form>
  );
}

export default TestimonyForm;
