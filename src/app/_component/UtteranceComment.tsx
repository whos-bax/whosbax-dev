"use client";

import { useEffect, useRef } from "react";

export default function UtteranceComment() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const elem = ref.current;
        if (!elem) return;

        const existingScript = elem.querySelector(".utterances");
        if (existingScript) return;

        const scriptElem = document.createElement("script");
        scriptElem.src = "https://utteranc.es/client.js";
        scriptElem.async = true;
        scriptElem.crossOrigin = "anonymous";
        scriptElem.setAttribute("repo", "whos-bax/whosbax-dev-comment");
        scriptElem.setAttribute("issue-term", "pathname");
        scriptElem.setAttribute("label", "comment");
        scriptElem.setAttribute("theme", "github-light");
        elem.appendChild(scriptElem);

        return () => {
            const utterances = elem.querySelector(".utterances");
            if (utterances) {
                utterances.remove();
            }
        };
    }, []);

    return <section ref={ref} />;
}
