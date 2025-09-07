import { createProfileAction } from "@/actions/actions";
import FormButton from "@/components/Form/FormButton";
import FormContainer from "@/components/Form/FormContainer";
import FormInput from "@/components/Form/FormInput";

async function page() {
  return (
    <section>
      <h1 className="mt-4 mb-8 text-2xl font-semibold capitalize">
        Create Profile
      </h1>
      <div className="max-w-lg rounded-lg border p-10">
        <FormContainer action={createProfileAction}>
          <div className="flex flex-col gap-2">
            <FormInput
              name="firstName"
              label="First Name"
              type="text"
              placeholder="John"
            />
            <FormInput
              name="lastName"
              label="Last Name"
              type="text"
              placeholder="Doe"
            />
            <FormInput
              name="userName"
              label="User Name"
              type="text"
              placeholder="johndoe"
            />
            <FormButton text="Create Profile" size="lg" />
          </div>
        </FormContainer>
      </div>
    </section>
  );
}
export default page;
