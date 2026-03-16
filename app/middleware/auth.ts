import { authClient } from "~/lib/client";
export default defineNuxtRouteMiddleware(async (to, from) => {
	const { data: session } = await authClient.useSession(useFetch); 
	if (!session.value) {
		if (to.path.startsWith('/admin')) {
			return navigateTo("/auth/login");
		}
	}
	if (session.value) {
		if (to.path === "/auth/login") {
			return navigateTo("/admin");
		}
	}
});