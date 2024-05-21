import { redirect } from "@remix-run/node"

export function loader() {
	return redirect("/discover")
}

/* INDEX V1: pre-cache discovery page section
export default function Index() {
	return (
		<div>
			<PageDescription
				header="Home"
				message="Welcome home!"
			/>
		</div>
	)
}
 */
