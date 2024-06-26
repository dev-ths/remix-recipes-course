import { json } from "@remix-run/node"
import { requireLoggedInUser } from "./auth.server"
import db from "~/db.server"

export async function canChangeRecipe(request: Request, recipeId: string) {
	const user = await requireLoggedInUser(request)
	const recipe = await db.recipe.findUnique({ where: { id: recipeId } })

	if (recipe === null) {
		throw json({ message: "A recipe with that id does not exist" }, { status: 404 })
	}

	if (recipe.userId !== user.id) {
		throw json({ message: "You are not authorized to view this recipe" }, { status: 401 })
	}
}
