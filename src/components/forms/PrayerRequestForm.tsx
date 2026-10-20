import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { submitPrayerRequest } from "../../lib/api";
import {
  Field,
  TextInput,
  TextArea,
  Select,
  SubmitButton,
  FormStatus,
  type Status,
} from "./formControls";

function PrayerRequestForm() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const consent = fd.get("consent") === "on";
    if (!consent) {
      setStatus({
        type: "error",
        message: "Please confirm consent so our prayer team can follow up.",
      });
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      await submitPrayerRequest(
        {
          name: (fd.get("name") as string) || undefined,
          email: (fd.get("email") as string) || undefined,
          phone: (fd.get("phone") as string) || undefined,
          contactPreference: fd.get("contactPreference") as
            | "email"
            | "phone"
            | "none",
          request: fd.get("request") as string,
          consent,
        },
        user?.$id,
      );
      form.reset();
      setStatus({
        type: "success",
        message:
          "Your prayer request has been received. Our prayer team will stand with you in faith.",
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
            autoComplete="name"
            defaultValue={user?.name ?? ""}
          />
        </Field>
        <Field label="How should we reach you?">
          <Select name="contactPreference" defaultValue="none">
            <option value="none">Prefer not to be contacted</option>
            <option value="email">By email</option>
            <option value="phone">By phone</option>
          </Select>
        </Field>
        <Field label="Email (optional)">
          <TextInput
            type="email"
            name="email"
            placeholder="you@example.com"
            defaultValue={user?.email ?? ""}
          />
        </Field>
        <Field label="Phone (optional)">
          <TextInput name="phone" placeholder="+254 ..." />
        </Field>
      </div>
      <Field label="Your prayer request" required>
        <TextArea
          name="request"
          required
          placeholder="Share what you'd like us to pray about..."
        />
      </Field>
      <label className="flex items-start gap-2 text-sm text-[#212121]">
        <input type="checkbox" name="consent" className="mt-1" />
        <span>
          I consent to Grace Arena's authorized prayer team viewing and praying
          over this request.
        </span>
      </label>
      <FormStatus status={status} />
      <SubmitButton loading={loading}>Send prayer request</SubmitButton>
    </form>
  );
}

export default PrayerRequestForm;
