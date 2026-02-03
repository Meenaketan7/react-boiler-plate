import { ReactNode } from "react";
import NoNetwork from "./components/no-network";
import { useNetworkStatus } from "@/hooks/use-network-status";

export function NetworkGate({ children }: { children: ReactNode }) {
	const isOnline = useNetworkStatus();

	if (!isOnline) {
		return <NoNetwork />;
	}

	return <>{children}</>;
}
