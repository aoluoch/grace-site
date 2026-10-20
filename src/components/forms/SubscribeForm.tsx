import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { subscribe } from "../../lib/api";
import { ORGANIZATIONS } from "../../lib/appwrite";
import {
  Field,
  TextInput,
  Select,
  SubmitButton,
  FormStatus,
  type Status,
} from "./formControls";

function SubscribeForm() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const emailOptIn = fd.get("emailOptIn") === "on";
    const smsOptIn = fd.get("smsOptIn") === "on";
    const email = (fd.get("email") as string) || "";
    const phone = (fd.get("phone") as string) || "";

    if (!emailOptIn && !smsOptIn) {
      setStatus({
        type: "error",
        message: "Choose at least one channel (email or SMS) to subscribe.",
      });
      return;
    }
    if (emailOptIn && !email) {
      setStatus({ type: "error", message: "Please provide an email to receive email updates." });
      return;
    }
    if (smsOptIn && !phone) {
      setStatus({ type: "error", message: "Please provide a phone number to receive SMS updates." });
      return;
    }

    setLoading(true);
    setStatus(null);
    try {
      await subscribe(
        {
          name: (fd.get("name") as string) || undefined,
          email: email || undefined,
          phone: phone || undefined,
          organization: fd.get("organization") as string,
          emailOptIn,
          smsOptIn,
        },
        user?.$id,
      );
      form.reset();
      setStatus({
        type: "success",
        message: "You're subscribed! Watch out for approved ministry updates.",
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
        <Field label="Your name">
          <TextInput
            name="name"
            placeholder="Jane Doe"
            defaultValue={user?.name ?? ""}
          />
        </Field>
        <Field label="Which ministry updates?">
          <Select name="organization" defaultValue="grace_arena_kenya">
            {ORGANIZATIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Email">
          <TextInput
            type="email"
            name="email"
            placeholder="you@example.com"
            defaultValue={user?.email ?? ""}
          />
        </Field>
        <Field label="Phone">
          <TextInput name="phone" placeholder="+254 ..." />
        </Field>
      </div>
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm text-[#212121]">
          <input type="checkbox" name="emailOptIn" defaultChecked />
          Send me email updates
        </label>
        <label className="flex items-center gap-2 text-sm text-[#212121]">
          <input type="checkbox" name="smsOptIn" />
          Send me SMS updates
        </label>
      </div>
      <FormStatus status={status} />
      <SubmitButton loading={loading}>Subscribe</SubmitButton>
    </form>
  );
}

export default SubscribeForm;
