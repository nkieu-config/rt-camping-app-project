import { createLandmarkAction } from "@/actions/actions";
import FormButton from "@/components/Form/FormButton";
import FormContainer from "@/components/Form/FormContainer";
import FormInput from "@/components/Form/FormInput";

async function page() {
  return (
    <section>
      <h1 className="mt-4 mb-8 text-2xl font-semibold capitalize">
        Create Landmark
      </h1>
      <div className="max-w-lg rounded-lg border p-10">
        <FormContainer action={createLandmarkAction}>
          <div className="flex flex-col gap-2">
            <FormInput
              name="name"
              label="Landmark Name"
              type="text"
              placeholder="Stonehenge"
            />
            <FormButton text="Create Landmark" size="lg" />
          </div>
        </FormContainer>
      </div>
    </section>
  );
}
export default page;
