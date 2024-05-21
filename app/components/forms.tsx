import { Form, useSearchParams, useNavigation } from "@remix-run/react"
import type {
	ButtonHTMLAttributes,
	HTMLAttributes,
	InputHTMLAttributes,
	ReactNode,
} from "react"
import React from "react"
import { classNames } from "~/utils/misc"
import { SearchIcon } from "./icons"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean
}

export function Button({ children, className, ...props }: ButtonProps) {
	return (
		<button
			{...props}
			className={classNames(
				"flex justify-center rounded-md px-3 py-2",
				className
			)}
		>
			{children}
		</button>
	)
}

export function PrimaryButton({ className, isLoading, ...props }: ButtonProps) {
	return (
		<Button
			{...props}
			className={classNames(
				"bg-primary text-white hover:bg-primary-light",
				isLoading ? "bg-primary-light" : "",
				className
			)}
		/>
	)
}

export function DeleteButton({ className, isLoading, ...props }: ButtonProps) {
	return (
		<Button
			{...props}
			className={classNames(
				"border-2 border-red-600 text-red-600",
				"hover:bg-red-600 hover:text-white",
				isLoading ? "border-red-400 text-red-400" : "",
				className
			)}
		/>
	)
}

interface ErrorMessageProps extends HTMLAttributes<HTMLParagraphElement> {}

export function ErrorMessage({ className, ...props }: ErrorMessageProps) {
	return props.children ? (
		<p
			{...props}
			className={classNames("text-xs text-red-600", className)}
		/>
	) : null
}

interface PrimaryInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function PrimaryInput({ className, ...props }: PrimaryInputProps) {
	return (
		<input
			{...props}
			className={classNames(
				"w-full border-2 border-gray-200 outline-none",
				"rounded-md p-2 focus:border-primary",
				className
			)}
		/>
	)
}

type SearchBarProps = {
	placeholder: string
	className?: string
}
export function SearchBar({ placeholder, className }: SearchBarProps) {
	const [searchParams] = useSearchParams()
	const navigation = useNavigation()
	const isSearching = navigation.formData?.has("q")
	return (
		<Form
			className={classNames(
				"flex rounded-md border-2 border-gray-300",
				"focus-within:border-primary",
				isSearching ? "animate-pulse" : "",
				className
			)}
		>
			<button className="mr-1 px-2">
				<SearchIcon />
			</button>
			<input
				defaultValue={searchParams.get("q") ?? ""}
				type="text"
				name="q"
				autoComplete="off"
				placeholder={placeholder}
				className="w-full rounded-md px-2 py-3 outline-none"
			/>
			{Array.from(searchParams.entries()).map(([name, value], index) =>
				name !== "q" ? (
					<input
						key={index}
						name={name}
						value={value}
						type="hidden"
					/>
				) : null
			)}
		</Form>
	)
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	error?: boolean
}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	function Input({ error, className, ...props }, ref) {
		return (
			<input
				ref={ref}
				className={classNames(
					"w-full outline-none",
					"border-b-2 border-b-background focus:border-b-primary",
					error ? "border-b-red-600" : "",
					className
				)}
				{...props}
			/>
		)
	}
)

interface IconInputProps extends InputHTMLAttributes<HTMLInputElement> {
	icon: ReactNode
}

export function IconInput({ icon, ...props }: IconInputProps) {
	return (
		<div
			className={classNames(
				"flex items-stretch rounded-md border-2 border-gray-300",
				"focus-within:border-primary"
			)}
		>
			<div className="flex flex-col justify-center px-2">{icon}</div>
			<input
				className="w-full rounded-md px-2 py-3 outline-none"
				{...props}
			/>
		</div>
	)
}
