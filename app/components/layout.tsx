import { NavLink as RemixNavLink, Outlet } from "@remix-run/react"
import { classNames } from "~/utils/misc"

type PageLayoutProps = {
	title: string
	links: Array<{ to: string; label: string }>
}
export function PageLayout({ title, links }: PageLayoutProps) {
	return (
		<div className="flex h-full flex-col">
			<h1 className="my-4 text-2xl font-bold">{title}</h1>
			<nav className="mt-2 border-b-2 pb-2">
				{links.map(({ to, label }) => (
					<NavLink
						key={label}
						to={to}
					>
						{label}
					</NavLink>
				))}
			</nav>
			<div className="overflow-y-auto py-4">
				<Outlet />
			</div>
		</div>
	)
}

type NavLinkProps = {
	to: string
	children: React.ReactNode
}

function NavLink({ to, children }: NavLinkProps) {
	return (
		<RemixNavLink
			to={to}
			className={({ isActive }) =>
				classNames(
					"px-2 pb-2.5 hover:text-gray-500 md:px-4",
					isActive ? "border-b-2 border-b-primary" : ""
				)
			}
		>
			{children}
		</RemixNavLink>
	)
}
