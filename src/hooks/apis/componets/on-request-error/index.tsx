import { toast } from "sonner";

export default function onRequestError(
	error: unknown,
	_variables: unknown,
	_context: unknown,
	_mutation: unknown
) {
	if (!navigator.onLine) return;

	const message =
		error instanceof Error ? error.message : "Something went wrong. Please try again.";

	toast.error(message);
}
