import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { submitAppointment } from "../../lib/api";
import {
  Field,
  TextInput,
  TextArea,
  Select,
  SubmitButton,
  FormStatus,
  type Status,
} from "./formControls";

function AppointmentForm() {
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
      const rawDate = fd.get("preferredDate") as string;
      await submitAppointment(
        {
          name: fd.get("name") as string,
          email: (fd.get("email") as string) || undefined,
          phone: (fd.get("phone") as string) || undefined,
          type: fd.get("type") as
            | "pastoral"
            | "counseling"
            | "prayer"
            | "prophetic"
            | "other",
          preferredDate: rawDate ? new Date(rawDate).toISOString() : undefined,
          note: (fd.get("note") as string) || undefined,
        },
        user?.$id,
      );
      form.reset();
      setStatus({
        type: "success",
        message:
          "Your appointment request has been submitted. Our team will confirm a time with you.",
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
        <Field label="Appointment type" required>
          <Select name="type" required defaultValue="pastoral">
            <option value="pastoral">Pastoral visit</option>
            <option value="counseling">Counseling</option>
            <option value="prayer">Prayer / ministration</option>
            <option value="prophetic">Prophetic session</option>
            <option value="other">Other</option>
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
        <Field label="Preferred date & time">
          <TextInput type="datetime-local" name="preferredDate" />
        </Field>
      </div>
      <Field label="Anything we should know? (optional)">
        <TextArea name="note" placeholder="Share any helpful context..." />
      </Field>
      <FormStatus status={status} />
      <SubmitButton loading={loading}>Request appointment</SubmitButton>
    </form>
  );
}

export default AppointmentForm;
