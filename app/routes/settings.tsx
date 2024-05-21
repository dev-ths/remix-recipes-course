import { PageLayout } from "~/components/layout"

export default function Settings() {
	return (
		<PageLayout
			title="Settings"
			links={[{ to: "app", label: "App" }]}
		/>
	)
}

/* ZTM Settings Page From start of course
import {ErrorBoundaryComponent,json,LoaderFunction} from "@remix-run/node"
import {Link,Outlet, useLoaderData} from "remix-run/react"
import {ErrorBoundary} from "./app/recipes/$recipeId"

export const loader: LoaderFunction = () => {
  return json({message:"hello, there"})
}

export default function Settings(){
  const data = useLoaderData()
  return <div>
    <h1>Settings</h1>
    <p>This is the settings page</p>
    <p>Message from the loader: {data.message}</p>
    <nav>
      <Link to "app">App</Link>
      <Link to "profile">Profile</Link>
    </nav>
    <Outlet/>
  </div>
}

export const ErrorBoundary: ErrorBoundaryComponent = () => {
  return <div>Hey, an unexpected error occurred</div>
}
 */
