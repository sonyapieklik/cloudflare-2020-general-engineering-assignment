const links = [
{
	"name": "GitHub",
		"url": "https://github.com/sonyapieklik/",
},
{
	"name": "LinkedIn",
	"url": "https://www.linkedin.com/in/sonya-pieklik/",
},
{
	"name": "Current Project: Best Hydraulic Fracking Crew",
	"url": "https://github.com/sonyapieklik/best-frac-crew",
},
];

const avatarUrl = 'https://secureservercdn.net/198.71.233.47/oja.f78.myftpupload.com/wp-content/uploads/2020/01/flit-2018-sonya-pieklik.png';

const social = [
{
	"svg" : "https://simpleicons.org/icons/facebook.svg",
		"url" : "https://www.facebook.com/sonya.pieklik",
},
{
	"svg" : "https://simpleicons.org/icons/twitter.svg",
	"url": "https://twitter.com/sonyapieklik",
},
{
	"svg" : "https://simpleicons.org/icons/instagram.svg",
	"url": "https://www.instagram.com/sonyapieklik/?hl=en",
}

];

addEventListener('fetch', event => {
		event.respondWith(handleRequest(event.request))
		})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
	if(request.url.includes("/links") && request.url.endsWith("/links")){
		return new Response(JSON.stringify(links, null, 2), {
headers: { 'content-type': 'application/json;charset=UTF-8' },
})
}
else {
	const init = { headers: {"content-type": "text/html;charset=UTF-8",},}
	const response = await fetch("https://static-links-page.signalnerve.workers.dev", init);
	return rewriter.transform(response);
}
}
class LinksTransformer {

	constructor(attributeName) {
		this.attributeName = attributeName;
	}

	async element(element) {
		// Append links to links div
		var i;
		for (i = 0; i < links.length; i++) {
			element.append('\n        ');
			element.append('<a href=' + links[i].url + '>'
					+ links[i].name + '</a>', {html: true});
		}
		element.append('\n      ');

	}
}

class ListTransformer {

	constructor(social) {
		this.social = social;
	}

	async element(element) {
		element.setAttribute("style", "")
			const newContent = this.social.map(social => `<a href=${social.url}><img src=${social.svg}></a>`).join("")
			element.setInnerContent(newContent, {html:true})
	}
}

class RemoveTransformer {
	constructor(obj) {
		this.obj = obj
	}

	async element(element) {
		element.removeAttribute(this.obj)
	}
}

const rewriter = new HTMLRewriter()
	.on("div#links", new LinksTransformer("href"))
	.on("div#profile", { element: e => e.removeAttribute('style') })
	.on("img#avatar", { element: e => e.setAttribute('src', avatarUrl) })
	.on("h1#name", { element: e => e.setInnerContent("Sonya Pieklik") })
	.on("body", {element: e => e.setAttribute("class", "bg-orange-200")})
	.on("div#social", new RemoveTransformer("style"))
	.on("div#social", new ListTransformer(social))


