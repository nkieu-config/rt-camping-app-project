import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type FormInputProps = {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
};

function FormInput(props: FormInputProps) {
  const { name, type, label, placeholder, defaultValue } = props;

  return (
    <div className="mb-4 flex flex-col gap-3">
      <Label htmlFor={name}>{label}</Label>
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </div>
  );
}
export default FormInput;
