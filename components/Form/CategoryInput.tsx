import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/utils/data";

function CategoryInput({ defaultValue }: { defaultValue?: string }) {
  const name = "category";

  return (
    <div className="mb-4 flex flex-col gap-4">
      <Label className="capitalize" htmlFor={name}>
        {name}
      </Label>

      <Select
        name={name}
        defaultValue={defaultValue || categories[0].label}
        required
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.label} value={category.label}>
              <span className="ml-0.5 flex items-center gap-3 capitalize">
                <category.icon />
                {category.label}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
export default CategoryInput;
