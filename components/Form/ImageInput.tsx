import { Input } from "../ui/input";
import { Label } from "../ui/label";

function ImageInput() {
  const name = "image";
  return (
    <div className="mt-4">
      <Label className="mb-4 capitalize">{name}</Label>
      <Input id={name} name={name} type="file" required accept="image/*" />
    </div>
  );
}
export default ImageInput;
