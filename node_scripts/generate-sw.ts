//@ts-ignore
const { injectManifest } = require("workbox-build");

injectManifest({
	globDirectory: "build/",
	globPatterns: ["**/*.{js,css,html}"],
	swSrc: "public/sw.js",
	swDest: "build/sw.js",
})
	.then(({ count, size, warnings }: IManifestInjection) => {
		if (warnings.length > 0) {
			console.warn("Warnings encountered while injecting the manifest:", warnings.join("\n"));
		}

		console.log(`Injected a manifest which will precache ${count} files, totaling ${size} bytes.`);
	})
	.catch((err: Error) => {
		console.error(err);
	});

interface IManifestInjection {
	count: number;
	size: number;
	warnings: string[];
}
