import { WifiOff, RefreshCw } from "lucide-react";

export default function NoNetwork() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center text-foreground">
			<WifiOff className="mb-6 h-16 w-16 text-primary" />

			<h1 className="mb-2 text-3xl font-semibold">No Internet Connection</h1>
			<p className="mb-8 max-w-md text-muted-foreground">
				Your network seems to be offline. Please check your connection and try again.
			</p>

			<button
				onClick={() => window.location.reload()}
				className="flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-primary-foreground"
			>
				<RefreshCw className="h-4 w-4" />
				Retry
			</button>
		</div>
	);
}
