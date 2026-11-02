import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { submitProfessionalHelp } from "../../lib/api";
import { HELP_KINDS, type HelpKind } from "../../lib/professionalHelp";
import {
  Field,
  TextInput,
  Select,
  SubmitButton,
  FormStatus,
  type Status,
} from "./formControls";

function ProfessionalHelpForm() {
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
      await submitProfessionalHelp(
        {
          fullName: (fd.get("fullName") as string).trim(),
          email: (fd.get("email") as string).trim(),
          phone: (fd.get("phone") as string).trim(),
          helpType: fd.get("helpType") as HelpKind,
        },
        user?.$id,
      );
      form.reset();
      setStatus({
        type: "success",
        message:
          "Your request has been received. A member of the professional care team will be in touch.",
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
    <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
      <Field label="Full name" required>
        <TextInput
          name="fullName"
          required
          autoComplete="off"
          placeholder="Jane Doe"
        />
      </Field>
      <Field label="Email" required>
        <TextInput
          type="email"
          name="email"
          required
          autoComplete="off"
          placeholder="you@example.com"
        />
      </Field>
      <Field label="Phone number" required>
        <TextInput
          name="phone"
          required
          autoComplete="off"
          placeholder="07..."
        />
      </Field>
      <Field label="Kind of help you need" required>
        <Select name="helpType" required defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          {HELP_KINDS.map((kind) => (
            <option key={kind.value} value={kind.value}>
              {kind.label}
            </option>
          ))}
        </Select>
      </Field>
      <FormStatus status={status} />
      <SubmitButton loading={loading}>Send request</SubmitButton>
    </form>
  );
}

export default ProfessionalHelpForm;
