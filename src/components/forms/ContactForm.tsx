import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { submitContact } from "../../lib/api";
import {
  Field,
  TextInput,
  TextArea,
  SubmitButton,
  FormStatus,
  type Status,
} from "./formControls";

function ContactForm() {
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
      await submitContact(
        {
          name: fd.get("name") as string,
          email: (fd.get("email") as string) || undefined,
          phone: (fd.get("phone") as string) || undefined,
          subject: (fd.get("subject") as string) || undefined,
          message: fd.get("message") as string,
        },
        user?.$id,
      );
      form.reset();
      setStatus({
        type: "success",
        message: "Thank you for reaching out. We'll get back to you soon.",
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
        <Field label="Full name" required>
          <TextInput
            name="name"
            required
            placeholder="Jane Doe"
            defaultValue={user?.name ?? ""}
          />
        </Field>
        <Field label="Subject">
          <TextInput name="subject" placeholder="How can we help?" />
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
      <Field label="Message" required>
        <TextArea name="message" required placeholder="Type your message..." />
      </Field>
      <FormStatus status={status} />
      <SubmitButton loading={loading}>Send message</SubmitButton>
    </form>
  );
}

export default ContactForm;
