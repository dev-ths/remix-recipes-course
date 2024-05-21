import { LoaderFunctionArgs } from "@remix-run/node"
import { themeCookie } from "~/cookies"

export async function loader({ request }: LoaderFunctionArgs) {
	const cookieHeader = request.headers.get("cookie")
	const cookieValue = await themeCookie.parse(cookieHeader) //themeCookie comes from the variable named to hold the remix utility function to createCookie

	const theme = getTheme(cookieValue)

	const data = `
    :root {
      --color-primary: ${theme.colorPrimary};
      --color-primary-light: ${theme.colorPrimaryLight};
    }
  `

	return new Response(data, {
		headers: { "Content-Type": "text/css" },
	})
}

// takes color value from the cookie, and return color value for the primary & primary-light hex values
function getTheme(color: string) {
	switch (color) {
		case "red": {
			return {
				colorPrimary: "#f22524",
				colorPrimaryLight: "#f56665",
			}
		}
		case "orange": {
			return {
				colorPrimary: "#ff4b00",
				colorPrimaryLight: "#ff814d",
			}
		}
		case "yellow": {
			return {
				colorPrimary: "#cc9800",
				colorPrimaryLight: "#ffbf00",
			}
		}
		case "blue": {
			return {
				colorPrimary: "#01a3e1",
				colorPrimaryLight: "#30c5fe",
			}
		}
		case "purple": {
			return {
				colorPrimary: "#5325c0",
				colorPrimaryLight: "#8666d2",
			}
		}
		default: {
			return {
				colorPrimary: "#00743e",
				colorPrimaryLight: "#4c9d77",
			}
		}
	}
}

/* CSS Resource Route explanation */
//:root pseudo class used to create variable, and then "key" is added as the name

/* CSS Resource Route V1: primary only
export function loader() {
	const data = `
    :root {
      --color-primary: #00743e
    }
  `

	return new Response(data, {
		headers: { "Content-Type": "text/css" },
	})
} */

/* CSS Resource Route V2: primary & primary-light served by theme[.]css => [] used to escape remix routing because without [.], it would instead be theme/css

export function loader() {
	const data = `
    :root {
      --color-primary: #00743e;
      --color-primary-light: #4c9d77;
    }
  `

	return new Response(data, {
		headers: { "Content-Type": "text/css" },
	})
}
 */

/* import { type LoaderFunctionArgs } from "@remix-run/node";
import { themeCookie } from "~/cookies";
import {loader} from "./app/my-resource-route-example"

function getTheme(color: string) {
  switch (color) {
    case "red": {
      return {
        colorPrimary: "#f22524",
        colorPrimaryLight: "#f56665",
      };
    }
    case "orange": {
      return {
        colorPrimary: "#ff4b00",
        colorPrimaryLight: "#ff814d",
      };
    }
    case "yellow": {
      return {
        colorPrimary: "#cc9800",
        colorPrimaryLight: "#ffbf00",
      };
    }
    case "blue": {
      return {
        colorPrimary: "#01a3e1",
        colorPrimaryLight: "#30c5fe",
      };
    }
    case "purple": {
      return {
        colorPrimary: "#5325c0",
        colorPrimaryLight: "#8666d2",
      };
    }
    default: {
      return {
        colorPrimary: "#00743e",
        colorPrimaryLight: "#4c9d77",
      };
    }
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("cookie");
  const cookieValue = await themeCookie.parse(cookieHeader);

  const theme = getTheme(cookieValue);

  const data = `
    :root {
      --color-primary: ${theme.colorPrimary};
      --color-primary-light: ${theme.colorPrimaryLight};
    }
  `;

  return new Response(data, {
    headers: { "content-type": "text/css" },
  });
}
 */
