import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { provinces } from "@/utils/data";

function ProvinceInput({ defaultValue }: { defaultValue?: string }) {
  const name = "province";

  return (
    <div className="mb-4 flex flex-col gap-4">
      <Label className="capitalize" htmlFor={name}>
        {name}
      </Label>

      <Select
        name={name}
        defaultValue={defaultValue || provinces[0].PROVINCE_NAME}
        required
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {provinces.map((province) => (
            <SelectItem
              key={province.PROVINCE_ID}
              value={province.PROVINCE_NAME}
            >
              <span className="ml-0.5 flex items-center gap-3 capitalize">
                {province.PROVINCE_NAME}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
export default ProvinceInput;
