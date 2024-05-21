import { Form, Link, useActionData } from "@remix-run/react"
import ReactModal from "react-modal"
import {
	DeleteButton,
	ErrorMessage,
	IconInput,
	PrimaryButton,
} from "~/components/forms"
import { XIcon } from "~/components/icons"
import { useRecipeContext } from "../$recipeId"
import { ActionFunctionArgs, json, redirect } from "@remix-run/node"
import { canChangeRecipe } from "~/utils/abilities.server"
import db from "~/db.server"
import { z } from "zod"
import { validateForm } from "~/utils/validation"

if (typeof window !== "undefined") {
	ReactModal.setAppElement("body")
}

const updateMealPlanSchema = z.object({
	mealPlanMultiplier: z.preprocess(
		(value) => parseInt(String(value)), // value is originally unknown => cast to string and then parse as integer
		z.number().min(1) // second argument which is the expected type zod should be validating the input against
	),
}) //preprocess => transform passed in value as raw string due to forms parsing everything as strings => cast to integer or a function which creates that type => validates the value against the expected type which was the second argument

export async function action({ request, params }: ActionFunctionArgs) {
	const recipeId = String(params.recipeId)
	await canChangeRecipe(request, recipeId)

	const formData = await request.formData()

	switch (formData.get("_action")) {
		case "updateMealPlan": {
			return validateForm(
				formData,
				updateMealPlanSchema,
				async ({ mealPlanMultiplier }) => {
					await db.recipe.update({
						where: { id: recipeId },
						data: { mealPlanMultiplier },
					})
					return redirect("..")
				},
				(errors) => json({ errors }, { status: 400 })
			)
		}
		case "removeFromMealPlan": {
			await db.recipe.update({
				where: { id: recipeId },
				data: { mealPlanMultiplier: null },
			})
			return redirect("..")
		}
		default: {
			return null
		}
	}
}
//"replace" used below to ensure modal doesn't create new entry in the history tab => otherwise user can use back or forward to close
export default function UpdateMealPlanModal() {
	const { recipeName, mealPlanMultiplier } = useRecipeContext()
	const actionData = useActionData()

	return (
		<ReactModal
			isOpen
			className="md:mx-auto md:mt-24 md:h-fit lg:w-1/2"
		>
			<div className="rounded-md bg-white p-4 shadow-md">
				<div className="mb-8 flex justify-between">
					<h1 className="text-lg font-bold">Update Meal Plan</h1>
					<Link
						to=".."
						replace
					>
						<XIcon />
					</Link>
				</div>
				<Form
					method="post"
					reloadDocument
				>
					<h2 className="mb-2">{recipeName}</h2>
					<IconInput
						icon={<XIcon />}
						defaultValue={mealPlanMultiplier ?? 1}
						type="number"
						autoComplete="off"
						name="mealPlanMultiplier"
					/>
					<ErrorMessage>{actionData?.errors?.mealPlanMultiplier}</ErrorMessage>
					<div className="mt-8 flex justify-end gap-4">
						{mealPlanMultiplier !== null ? (
							<DeleteButton
								name="_action"
								value="removeFromMealPlan"
							>
								Remove from Meal Plan
							</DeleteButton>
						) : null}
						<PrimaryButton
							name="_action"
							value="updateMealPlan"
						>
							Save
						</PrimaryButton>
					</div>
				</Form>
			</div>
		</ReactModal>
	)
}
