import { useEffect, useRef } from "react";
import Tagify from "@yaireo/tagify";
import "@yaireo/tagify/dist/tagify.css";

export default function InputTagify({
    value = [],
    suggestions = [],
    onChange,
}) {
    const inputRef = useRef();
    const tagifyInstance = useRef();

    useEffect(() => {
        if (!inputRef.current) return;

        tagifyInstance.current = new Tagify(inputRef.current, {
            whitelist: suggestions,
            enforceWhitelist: false,
            maxTags: 10,
            dropdown: {
                maxItems: 20,
                classname: "tags-look",
                enabled: 0,
                closeOnSelect: false,
            },
        });

        tagifyInstance.current.addTags(value);

        tagifyInstance.current.on("change", (e) => {
            const clean = tagifyInstance.current.getCleanValue();
            onChange?.(clean);
        });

        return () => {
            try {
                tagifyInstance.current.destroy();
            } catch (err) {
                console.warn("Tagify destroy error:", err.message);
            }
        };
    }, []);

    return (
        <input
            ref={inputRef}
            name="tags"
            className="w-full rounded-md border p-2"
            placeholder="Type to add tags. Use comma to separate tags and new tag"
        />
    );
}
