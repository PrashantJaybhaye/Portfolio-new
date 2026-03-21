import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Prashant Jaybhaye | Portfolio",
		short_name: "Prashant",
		description: "Personal portfolio and blog of Prashant Jaybhaye, showcasing projects, articles, and work.",
		start_url: "/",
		id: "com.prashantjaybhaye.portfolio",
		display: "standalone",
		background_color: "#0A0A0A",
		theme_color: "#0A0A0A",
		icons: [
			{
				src: "/me.jpg",
				sizes: "any",
				type: "image/jpeg",
				purpose: "any",
			}
		],
	};
}