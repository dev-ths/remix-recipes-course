import { createCookie } from "@remix-run/node"

if (typeof process.env.AUTH_COOKIE_SECRET !== "string") {
	throw new Error("Missing env: AUTH_COOKIE_SECRET")
}

/* sessionCookie kept separate from other cookies because it is destroyed when user logs out */
export const sessionCookie = createCookie("remix-recipes__session", {
	secrets: [process.env.AUTH_COOKIE_SECRET],
	httpOnly: true,
	secure: true,
})

/* themeCookie is kept separate, separation of concerns regarding cookie logic, works independent of whether there is a logged in user */
// themeCookie is unsecured because it doesn't hold any sensitive data
// secrets attribute left undefined is somewhat beneficial, as cookie no longer has a signature, and therefore the cookie has slightly less data to transfer over the network
export const themeCookie = createCookie("remix-recipes__theme")
