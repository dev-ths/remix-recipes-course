export async function loader() {
	const data = `.my-class{
    color: #abc123;
  }`

	return new Response(data, {
		headers: { "Content-Type": "text/css" },
	})
}

/* MIME Type Examples */

// RESOURCE ROUTE EXAMPLE: Image file
// export function loader() {
// 	const imagePath = path.join(process.cwd(), "assets", "image.jpg")
// 	const image = fs.readFileSync(imagePath)
// 	return new Response(image, {
// 		headers: { "Content-Type": "image/jpeg" },
// 	})
// }

// RESOURCE ROUTE EXAMPLE: PDF document file
// export function loader() {
// 	const pdfPath = path.join(process.cwd(), "assets", "document.pdf")
// 	const pdf = fs.readFileSync(pdfPath)
// 	return new Response(image, {
// 		headers: { "Content-Type": "application/pdf" },
// 	})
// }

// RESOURCE ROUTE EXAMPLE: HTML (hyper text markup language)
// export function loader() {
// 	const htmlContent = `
// 	<!DOCTYPE html>
// 	<html>
// 		<head>
// 			<title>Simple HTML Page</title>
// 		</head>
// 		<Body>
// 			<h1>This is a simple HTML page</h1>
// 		</Body>
// 	</html>
// 	`
// 	return new Response(htmlContent, {
// 		headers: { "Content-Type": "text/plain" },
// 	})
// }

// RESOURCE ROUTE EXAMPLE: CSS
// export async function loader() {
// 	const data = `.my-class {
//     color: #abc123;
//   }`
// }

// RESOURCE ROUTE EXAMPLE: Javascript
// export function loader() {
// 	const jsContent = `console.log("Hello from the script!);`
// 	return new Response(jsContent, {
// 		headers: { "Content-Type": "application/javascript" },
// 	})
// }

/* RESOURCE/API ROUTE V1-A: basic remix-json-helper json
export async function loader() {
	const data = { message: "Hello from the resource route" }

	return json(data)
}
 */
/* RESOURCE/API ROUTE V1-B: basic JSON without remix helper
export async function loader() {
	const data = { message: "Hello from the resource route" }

	return new Response(
		JSON.stringify({ headers: { "Content-Type": "application/json" } })
	)
}
 */

/* RESOURCE/API ROUTE V2-A: incorrect data transfer due to mismatch of data versus content-type header
export async function loader() {
	const data = `.my-class{
    color: #abc123;
  }`

	return new Response(JSON.stringify(data), {
		headers: { "Content-Type": "application/json" },
	})
} */
/* RESOURCE/API ROUTE V2-B: MIME (Multipurpose Internet Mail Extension) type set appropriately for css => text/css
export async function loader() {
	const data = `.my-class {
    color: #abc123;
  }` 


	return new Response(data, {
		headers: { "Content-Type": "text/css" },
	})
} */
