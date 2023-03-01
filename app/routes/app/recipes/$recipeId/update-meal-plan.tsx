import { Dialog } from "@reach/dialog";
import { Form, Link } from "@remix-run/react";
import { DeleteButton, IconInput, PrimaryButton } from "~/components/forms";
import { XIcon } from "~/components/icons";
import { classNames } from "~/utils/misc";

export default function UpdateMealPlanModal() {
  return (
    <Dialog
      isOpen
      className={classNames(
        "rounded-md p-4 m-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)]",
        "md:h-fit lg:w-1/2 md:mx-auto md:mt-24"
      )}
    >
      <div className="flex justify-between mb-8">
        <h1 className="text-lg font-bold">Update Meal Plan</h1>
        <Link to="..">
          <XIcon />
        </Link>
      </div>
      <Form method="post" reloadDocument>
        <h2 className="mb-2">Recipe Name</h2>
        <IconInput
          icon={<XIcon />}
          defaultValue={1}
          type="number"
          autoComplete="off"
          name="mealPlanMultiplier"
        />
        <div className="flex justify-end gap-4 mt-8">
          <DeleteButton name="_action" value="removeFromMealPlan">
            Remove from Meal Plan
          </DeleteButton>
          <PrimaryButton name="_action" value="updateMealPlan">
            Save
          </PrimaryButton>
        </div>
      </Form>
    </Dialog>
  );
}
