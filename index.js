// addEventListener('fetch', event => {
//   event.respondWith(handleRequest(event.request))
// })
/**
 * Respond with hello worker text
 * @param {Request} request
 */


//array of links for linktree
const myLinks = [{ name: "My Portfolio", url: "https://laurenharpole.github.io/port/index.html" }, { name: "My Github", url: "https://github.com/laurenharpole" }, { name: "My Favorite YouTuber", url: "https://www.youtube.com/c/veritasium" }, { name: "My Favorite Wegmans Treat", url: "https://assets-prd-weg.unataops.com/web/product_large/dd65f6f8e9e57adfe81e9c1c9522df587f553ada.jpg" }]

//class for links
class LinksTransformer {
  constructor(links) {
    this.links = links
  }

  async element(element) {
    this.links.forEach((link) => {
    element.append(`<a href="${link.url}">${link.name}</a>`, {html: true});
    //element.setAttribute("background", "bg-green-100")
  });
  return element;
  }
}

//array of links for social medias
const mySocials = [{url: "https://www.linkedin.com/feed/" , svg: '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="in linkedin portfolio social media" id="in_linkedin_portfolio_social_media"><path d="M6.5,3A3.5,3.5,0,1,0,10,6.5,3.5,3.5,0,0,0,6.5,3Zm0,5A1.5,1.5,0,1,1,8,6.5,1.5,1.5,0,0,1,6.5,8Z"/><path d="M9,11H4a1,1,0,0,0,0,2H8V27H5V16a1,1,0,0,0-2,0V28a1,1,0,0,0,1,1H9a1,1,0,0,0,1-1V12A1,1,0,0,0,9,11Z"/><path d="M27.34,12.68A5.94,5.94,0,0,0,23,11H22a7.84,7.84,0,0,0-4,.89A1,1,0,0,0,17,11H12a1,1,0,0,0-1,1V28a1,1,0,0,0,1,1h5a1,1,0,0,0,1-1V19a2,2,0,0,1,4,0v9a1,1,0,0,0,1,1h5a1,1,0,0,0,1-1V17A5.9,5.9,0,0,0,27.34,12.68ZM27,27H24V19a4,4,0,0,0-8,0v8H13V13h3v1a1,1,0,0,0,.62.92,1,1,0,0,0,1.09-.21c.95-1,1.7-1.71,4.29-1.71h1a4,4,0,0,1,2.92,1.09A4,4,0,0,1,27,17Z"/></g></svg>'}, {url: "mailto:lrh72@cornell.edu" , svg: '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="mail email e-mail letter" id="mail_email_e-mail_letter"><path d="M28,13a1,1,0,0,0-1,1v8a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1V14a1,1,0,0,0-2,0v8a3,3,0,0,0,.88,2.12A3,3,0,0,0,6,25H26a3,3,0,0,0,2.12-.88A3,3,0,0,0,29,22V14A1,1,0,0,0,28,13Z"/><path d="M15.4,18.8a1,1,0,0,0,1.2,0L28.41,9.94a1,1,0,0,0,.3-1.23,3.06,3.06,0,0,0-.59-.83A3,3,0,0,0,26,7H6a3,3,0,0,0-2.12.88,3.06,3.06,0,0,0-.59.83,1,1,0,0,0,.3,1.23ZM6,9H26a.9.9,0,0,1,.28,0L16,16.75,5.72,9A.9.9,0,0,1,6,9Z"/></g></svg>'}]

//class for social media links (seen as svgs)
class SocialTransformer {
  constructor(links) {
    this.links = links
  }

  async element(element) {
    this.links.forEach((link) => {
    element.append(`<a href="${link.url}">${link.svg}</a>`, {html: true});
    //element.setAttribute("background", "bg-green-100")
  });
  return element;
  }
}

//class to set the background color
class bgMaker{
  async element(element){
     element.setAttribute("class", "h-24 bg-gradient-to-r from-indigo-100 to-blue-500")
  }
}

//show links array or linktree page based on url ending
addEventListener("fetch", (event) => {
  let url = event.request.url
  if(url.endsWith("/links")){
    event.respondWith(linksHandler(event.request));
  }
  else {
    event.respondWith(handler(event.request))
  }
});

//return the content of myLinks
async function linksHandler(request) {
    let link = JSON.stringify(myLinks)
    const body =  {
       method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8"
      },
    }
    return new Response(link, body);
}


async function handler(request) {
  const fetchResponse = await fetch(
      "https://static-links-page.signalnerve.workers.dev"
    );
  const socialtransform = new SocialTransformer(mySocials);
  const linktransform = new LinksTransformer(myLinks);
  const bg = new bgMaker();
  return new HTMLRewriter()
  .on("div#links", linktransform)
  .on("div#social", socialtransform)
  .on("div#social", {element: (element) => {
    element.removeAttribute("style");
  }})
  .on("div#profile", {element: (element) => {
    element.removeAttribute("style");
  }})
  .on("img#avatar", {element: (element) => {
    element.removeAttribute("style");
    element.setAttribute("src", "https://media-exp1.licdn.com/dms/image/C4E03AQGKvc5JJAudtg/profile-displayphoto-shrink_100_100/0?e=1608768000&v=beta&t=7JEEing0vXwIZbT2SSC03dsnkF5tU9rblc0hqyMxYhA");
  }})
  .on("h1", {element: (element) => {
    element.setInnerContent("Lauren Harpole");
  }})

  .on("title", {element: (element) => {
    element.setInnerContent("Lauren Harpole");
  }})
  .on("body",bg)
  .transform(fetchResponse);
}
