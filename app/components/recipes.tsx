import { useParams } from "@remix-run/react"
import React from "react"
import { classNames } from "~/utils/misc"
import { TimeIcon } from "./icons"

type RecipePageWrapperProps = {
	children: React.ReactNode
}
export function RecipePageWrapper({ children }: RecipePageWrapperProps) {
	return <div className="h-full lg:flex">{children}</div>
}

type RecipeListWrapperProps = {
	children: React.ReactNode
}
export function RecipeListWrapper({ children }: RecipeListWrapperProps) {
	const params = useParams()
	return (
		<div
			className={classNames(
				"overflow-auto lg:block lg:w-1/3 lg:pr-4",
				params.recipeId ? "hidden" : ""
			)}
		>
			{children}
			<br />
		</div>
	)
}

type RecipeDetailWrapperProps = {
	children: React.ReactNode
}
export function RecipeDetailWrapper({ children }: RecipeDetailWrapperProps) {
	return <div className="overflow-auto pl-4 pr-4 lg:w-2/3">{children}</div>
}

function useDelayedBool(value: boolean | undefined, delay: number) {
	const [delayed, setDelayed] = React.useState(false)
	const timeoutId = React.useRef<number>()
	React.useEffect(() => {
		if (value) {
			timeoutId.current = window.setTimeout(() => {
				setDelayed(true)
			}, delay)
		} else {
			window.clearTimeout(timeoutId.current)
			setDelayed(false)
		}
		return () => window.clearTimeout(timeoutId.current)
	}, [value, delay])

	return delayed
}

type RecipeCardProps = {
	name: string
	totalTime: string
	mealPlanMultiplier: number | null
	imageUrl?: string
	isActive?: boolean
	isLoading?: boolean
}
export function RecipeCard({
	name,
	totalTime,
	mealPlanMultiplier,
	imageUrl,
	isActive,
	isLoading,
}: RecipeCardProps) {
	const delayedLoading = useDelayedBool(isLoading, 500)
	return (
		<div
			className={classNames(
				"group flex rounded-md border-2 shadow-md",
				"hover:border-primary hover:text-primary",
				isActive ? "border-primary text-primary" : "border-white",
				isLoading ? "border-gray-500 text-gray-500" : ""
			)}
		>
			<div className="my-4 ml-3 h-14 w-14 overflow-hidden rounded-full">
				<img
					src={imageUrl}
					alt={`recipe named ${name}`}
					className="h-full w-full object-cover"
				/>
			</div>
			<div className="flex-grow p-4">
				<h3 className="mb-1 text-left font-semibold">
					{name}
					{mealPlanMultiplier !== null ? (
						<>&nbsp;(x{mealPlanMultiplier})</>
					) : null}
					{delayedLoading ? "..." : ""}
				</h3>
				<div
					className={classNames(
						"flex font-light",
						"group-hover:text-primary-light",
						isActive ? "text-primary-light" : "text-gray-500",
						isLoading ? "text-gray-500" : ""
					)}
				>
					<TimeIcon />
					<p className="ml-1">{totalTime}</p>
				</div>
			</div>
		</div>
	)
}
