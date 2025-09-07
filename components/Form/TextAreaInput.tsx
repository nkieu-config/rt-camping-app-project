import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface TextAreaInputProps {
  name: string;
  LabelText?: string;
  defaultValue?: string;
}

function TextAreaInput({ name, LabelText, defaultValue }: TextAreaInputProps) {
  return (
    <div className="col-span-2 mb-4">
      <Label className="mb-4 capitalize" htmlFor={name}>
        {LabelText || name}
      </Label>
      <Textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        rows={4}
        required
      />
    </div>
  );
}
export default TextAreaInput;
