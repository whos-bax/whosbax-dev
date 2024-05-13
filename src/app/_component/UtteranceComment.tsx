"use client";

export default function UtteranceComment() {

    return (
        <section
            ref={elem => {
                if (!elem) {
                    return;
                }
                const scriptElem = document.createElement("script");
                scriptElem.src = "https://utteranc.es/client.js";
                scriptElem.async = true;
                scriptElem.crossOrigin = "anonymous";
                scriptElem.setAttribute("repo", "whos-bax/whosbax-dev-comment");
                scriptElem.setAttribute("issue-term", "pathname");
                scriptElem.setAttribute("label", "comment");
                scriptElem.setAttribute("theme", "github-light");
                elem.appendChild(scriptElem);
            }}
        />
    )
}
