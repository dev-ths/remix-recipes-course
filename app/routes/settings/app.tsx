import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node"
import { Form, useActionData, useLoaderData } from "@remix-run/react"
import { z } from "zod"
import { PrimaryButton } from "~/components/forms"
import { themeCookie } from "~/cookies"
import { validateForm } from "~/utils/validation"

// loader reads the cookie, sets default value on the dropdown with the chosen theme, or enforces "green" as the default value
export async function loader({ request }: LoaderFunctionArgs) {
	const cookieHeader = request.headers.get("cookie")

	const theme = await themeCookie.parse(cookieHeader)

	// check if key/value pair theme exists in the cookie, if it doesn't exist return "green" as that is the default value, if it does exist return the theme value
	return {
		theme: typeof theme !== "string" ? "green" : theme,
	}
}

const themeSchema = z.object({
	theme: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()

	return validateForm(
		formData,
		themeSchema,
		async ({ theme }) =>
			json(
				{ theme },
				{
					headers: {
						"Set-Cookie": await themeCookie.serialize(theme), //sets value as base64 encoded conversion of "red" => "InllbGxvdyI%3D"
					},
				}
			),
		(errors) => json({ errors }, { status: 400 })
	)
}

export default function App() {
	const data = useLoaderData<typeof loader>()
	const actionData = useActionData()

	return (
		// Form needs to use method "post" because it changes the theme data, which is stored in a cookie, which changes something, which means it needs to be handled in an action
		<Form
			method="post"
			reloadDocument
		>
			<div className="mb-4 flex flex-col">
				<label htmlFor="theme">Theme</label>
				<select
					id="theme"
					name="theme"
					className="mt-2 w-full rounded-md border-2 border-gray-200 p-2 md:w-64"
					defaultValue={actionData?.theme ?? data.theme}
				>
					<option value="red">Red</option>
					<option value="orange">Orange</option>
					<option value="yellow">Yellow</option>
					<option value="green">Green</option>
					<option value="blue">Blue</option>
					<option value="purple">Purple</option>
				</select>
			</div>
			<PrimaryButton>Save</PrimaryButton>
		</Form>
	)
}

/* JAVASCRIPT ENHANCED FORM NOTES => How Remix works internally
-doesn't reload the document
-sends request to the "action" first
-sends request to GET the "loader" data second
-javascript enhanced form submits that request with 1 request, and then calls all the loaders on the page / matched route

-NOTE:choice depends on whether you need an enhanced form, or a form which reloads the document

-theme changes when all the stylesheets are reloaded on the page
-some variation of form/Form/fetcher.Form is needed to submit the data to the server

-NOTE: remix does not reload stylesheets when a javascript enhanced form is submitted => only calls the action and the matched loaders for the page
-in order to reload the stylesheets, we need to refresh the entire page

-ANSWER: needs a form which reloads the document, without page navigation, and return the updated theme value from the action
*/

/* 
import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  json,
} from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { z } from "zod";
import { PrimaryButton } from "~/components/forms";
import { themeCookie } from "~/cookies";
import { validateForm } from "~/utils/validation";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("cookie");
  const theme = await themeCookie.parse(cookieHeader);

  return { theme: typeof theme !== "string" ? "green" : theme };
}

const themeSchema = z.object({
  theme: z.string(),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  return validateForm(
    formData,
    themeSchema,
    async ({ theme }) =>
      json(
        { theme },
        {
          headers: { "Set-Cookie": await themeCookie.serialize(theme) },
        }
      ),
    (errors) => json({ errors }, { status: 400 })
  );
}

export default function App() {
  const data = useLoaderData<typeof loader>();
  const actionData = useActionData<any>();
  return (
    <Form reloadDocument method="post">
      <div className="mb-4 flex flex-col">
        <label htmlFor="theme">Theme</label>
        <select
          id="theme"
          name="theme"
          className="p-2 mt-2 border-2 border-gray-200 rounded-md w-full md:w-64"
          defaultValue={actionData?.theme ?? data.theme}
        >
          <option value="red">Red</option>
          <option value="orange">Orange</option>
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="purple">Purple</option>
        </select>
      </div>
      <PrimaryButton>Save</PrimaryButton>
    </Form>
  );
}
 */
