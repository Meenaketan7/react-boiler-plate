import { MutationCache, onlineManager, QueryClient } from "@tanstack/react-query";

import onRequestError from "./componets/on-request-error";
onlineManager.setEventListener((setOnline) => {
	const onlineHandler = () => setOnline(true);
	const offlineHandler = () => setOnline(false);

	window.addEventListener("online", onlineHandler);
	window.addEventListener("offline", offlineHandler);

	return () => {
		window.removeEventListener("online", onlineHandler);
		window.removeEventListener("offline", offlineHandler);
	};
});
export const queryClient = new QueryClient({
	mutationCache: new MutationCache({
		onError: (error, variables, context, mutation) => {
			//  don't fire API error when offline
			if (!onlineManager.isOnline()) return;

			onRequestError(error, variables, context, mutation);
		}
	}),
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			//no retry when offline
			retry: (failureCount) => {
				if (!onlineManager.isOnline()) return false;
				return failureCount < 2;
			},
			networkMode: "online"
		},
		mutations: {
			// pause when offline

			networkMode: "online"
		}
	}
});
