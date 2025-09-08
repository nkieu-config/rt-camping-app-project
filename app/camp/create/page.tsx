import dynamic from "next/dynamic";
import { createLandmarkAction } from "@/actions/actions";
import FormButton from "@/components/Form/FormButton";
import FormContainer from "@/components/Form/FormContainer";
import FormInput from "@/components/Form/FormInput";
import CategoryInput from "@/components/Form/CategoryInput";
import TextAreaInput from "@/components/Form/TextAreaInput";
import ProvinceInput from "@/components/Form/ProvinceInput";
import MapLandmark from "@/components/Map/MapLandmark";

async function page() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-6">
      <h1 className="mt-6 mb-10 text-center text-3xl font-semibold capitalize">
        Create Landmark
      </h1>
      <div className="mx-auto max-w-3xl rounded-lg border p-10">
        <FormContainer action={createLandmarkAction}>
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              name="name"
              label="Landmark Name"
              type="text"
              placeholder="e.g. Phuket Beach"
            />
            <CategoryInput />
            <TextAreaInput name="description" />
            <FormInput
              name="price"
              label="Price"
              type="number"
              placeholder="e.g. 1500 baht"
            />
            <ProvinceInput />
          </div>

          <MapLandmark />

          <FormButton
            className="mt-6 w-full"
            text="Create Landmark"
            size="lg"
          />
        </FormContainer>
      </div>
    </section>
  );
}
export default page;
