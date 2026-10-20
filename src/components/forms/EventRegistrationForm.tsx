import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { registerForEvent } from "../../lib/api";
import {
  Field,
  TextInput,
  TextArea,
  Select,
  SubmitButton,
  FormStatus,
  type Status,
} from "./formControls";

interface EventRegistrationFormProps {
  eventId: string;
  eventTitle?: string;
}

function EventRegistrationForm({
  eventId,
  eventTitle,
}: EventRegistrationFormProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const [reference, setReference] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setLoading(true);
    setStatus(null);
    try {
      const row = await registerForEvent(
        {
          eventId,
          eventTitle,
          name: fd.get("name") as string,
          email: (fd.get("email") as string) || undefined,
          phone: (fd.get("phone") as string) || undefined,
          attendanceType: fd.get("attendanceType") as "in_person" | "online",
          notes: (fd.get("notes") as string) || undefined,
        },
        user?.$id,
      );
      form.reset();
      setReference((row as { reference?: string }).reference ?? null);
      setStatus({
        type: "success",
        message: "You're registered! A confirmation reference is shown below.",
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
        <Field label="Attendance" required>
          <Select name="attendanceType" defaultValue="in_person">
            <option value="in_person">In person</option>
            <option value="online">Online</option>
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
      <Field label="Accessibility or logistical needs (optional)">
        <TextArea name="notes" placeholder="Let us know how we can help..." />
      </Field>
      <FormStatus status={status} />
      {reference && (
        <p className="rounded-md bg-[#efeff3] px-4 py-3 text-sm font-semibold text-[#1f2167]">
          Your registration reference:{" "}
          <span className="text-[#B38E34]">{reference}</span>
        </p>
      )}
      <SubmitButton loading={loading}>Register for this event</SubmitButton>
    </form>
  );
}

export default EventRegistrationForm;
