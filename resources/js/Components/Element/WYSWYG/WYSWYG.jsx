import { useState, useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
    ClassicEditor,
    AccessibilityHelp,
    Alignment,
    Autoformat,
    AutoImage,
    AutoLink,
    Autosave,
    BalloonToolbar,
    BlockQuote,
    BlockToolbar,
    Bold,
    Code,
    CodeBlock,
    Essentials,
    FindAndReplace,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    FullPage,
    GeneralHtmlSupport,
    Heading,
    Highlight,
    HorizontalLine,
    HtmlComment,
    HtmlEmbed,
    ImageBlock,
    ImageCaption,
    ImageInline,
    ImageInsertViaUrl,
    ImageResize,
    ImageStyle,
    ImageTextAlternative,
    ImageToolbar,
    Indent,
    IndentBlock,
    Italic,
    Link,
    LinkImage,
    List,
    ListProperties,
    Markdown,
    MediaEmbed,
    PageBreak,
    Paragraph,
    PasteFromOffice,
    RemoveFormat,
    SelectAll,
    ShowBlocks,
    SimpleUploadAdapter,
    SourceEditing,
    SpecialCharacters,
    SpecialCharactersArrows,
    SpecialCharactersCurrency,
    SpecialCharactersEssentials,
    SpecialCharactersLatin,
    SpecialCharactersMathematical,
    SpecialCharactersText,
    Strikethrough,
    Style,
    Subscript,
    Superscript,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TextTransformation,
    TodoList,
    Underline,
    Undo,
    StandardEditingMode,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";

const WYSWYG = ({ data = null, onChange, offsetTop = null }) => {
    const editorContainerRef = useRef(null);
    const editorRef = useRef(null);
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const [shouldNotGroup, setShouldNotGroup] = useState(
        window.innerWidth >= 768
    );
    const [editorKey, setEditorKey] = useState("editor-default");
    const [offset, setOffset] = useState(48);

    const handleChangeContent = (event, editor) => {
        const data = editor.getData();
        onChange(data);
    };

    useEffect(() => {
        setIsLayoutReady(true);

        const handleResize = () => {
            const isMobileOrTablet = window.innerWidth <= 768;
            setShouldNotGroup(!isMobileOrTablet);

            setEditorKey(isMobileOrTablet ? "editor-mobile" : "editor-desktop");
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            setIsLayoutReady(false);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const navbar = document.querySelector("#navHead");
        const offset = navbar?.offsetHeight || null;
        setOffset(offset);
    }, []);

    const editorConfig = {
        ui: {
            viewportOffset: {
                top: offset || 48,
            },
            heightOffset: 100,
        },
        toolbar: {
            items: [
                "undo",
                "redo",
                "|",
                "sourceEditing",
                "showBlocks",
                "findAndReplace",
                "selectAll",
                "|",
                "heading",
                "style",
                "|",
                "fontSize",
                "fontFamily",
                "fontColor",
                "fontBackgroundColor",
                "|",
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "subscript",
                "superscript",
                "code",
                "removeFormat",
                "|",
                "specialCharacters",
                "horizontalLine",
                "pageBreak",
                "link",
                "insertImageViaUrl",
                "mediaEmbed",
                "insertTable",
                "highlight",
                "blockQuote",
                "codeBlock",
                "htmlEmbed",
                "|",
                "alignment",
                "|",
                "bulletedList",
                "numberedList",
                "todoList",
                "outdent",
                "indent",
                "|",
                "accessibilityHelp",
                "restrictedEditingException",
            ],
            shouldNotGroupWhenFull: shouldNotGroup,
        },
        plugins: [
            AccessibilityHelp,
            Alignment,
            Autoformat,
            AutoImage,
            AutoLink,
            Autosave,
            BalloonToolbar,
            BlockQuote,
            BlockToolbar,
            Bold,
            Code,
            CodeBlock,
            Essentials,
            FindAndReplace,
            FontBackgroundColor,
            FontColor,
            FontFamily,
            FontSize,
            FullPage,
            GeneralHtmlSupport,
            Heading,
            Highlight,
            HorizontalLine,
            HtmlComment,
            HtmlEmbed,
            ImageBlock,
            ImageCaption,
            ImageInline,
            ImageInsertViaUrl,
            ImageResize,
            ImageStyle,
            ImageTextAlternative,
            ImageToolbar,
            Indent,
            IndentBlock,
            Italic,
            Link,
            LinkImage,
            List,
            ListProperties,
            Markdown,
            MediaEmbed,
            PageBreak,
            Paragraph,
            PasteFromOffice,
            RemoveFormat,
            SelectAll,
            ShowBlocks,
            SimpleUploadAdapter,
            SourceEditing,
            SpecialCharacters,
            SpecialCharactersArrows,
            SpecialCharactersCurrency,
            SpecialCharactersEssentials,
            SpecialCharactersLatin,
            SpecialCharactersMathematical,
            SpecialCharactersText,
            Strikethrough,
            Style,
            Subscript,
            Superscript,
            Table,
            TableCaption,
            TableCellProperties,
            TableColumnResize,
            TableProperties,
            TableToolbar,
            TextTransformation,
            TodoList,
            Underline,
            Undo,
            StandardEditingMode,
        ],
        balloonToolbar: [
            "bold",
            "italic",
            "|",
            "link",
            "|",
            "bulletedList",
            "numberedList",
        ],
        blockToolbar: [
            "fontSize",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "bold",
            "italic",
            "|",
            "link",
            "insertTable",
            "|",
            "bulletedList",
            "numberedList",
            "outdent",
            "indent",
        ],
        fontFamily: {
            options: [
                "Lato, sans-serif",
                "Poppins, sans-serif",
                "Arial, Helvetica, sans-serif",
                "Courier New, Courier, monospace",
                "Georgia, serif",
                "Lucida Sans Unicode, Lucida Grande, sans-serif",
                "Tahoma, Geneva, sans-serif",
                "Times New Roman, Times, serif",
                "Trebuchet MS, Helvetica, sans-serif",
                "Verdana, Geneva, sans-serif",
            ],
        },
        fontSize: {
            options: [10, 12, 14, "default", 18, 20, 22],
            supportAllValues: true,
        },
        heading: {
            options: [
                {
                    model: "paragraph",
                    title: "Paragraph",
                    class: "ck-heading_paragraph",
                },
                {
                    model: "heading1",
                    view: "h1",
                    title: "Heading 1",
                    class: "ck-heading_heading1",
                },
                {
                    model: "heading2",
                    view: "h2",
                    title: "Heading 2",
                    class: "ck-heading_heading2",
                },
                {
                    model: "heading3",
                    view: "h3",
                    title: "Heading 3",
                    class: "ck-heading_heading3",
                },
                {
                    model: "heading4",
                    view: "h4",
                    title: "Heading 4",
                    class: "ck-heading_heading4",
                },
                {
                    model: "heading5",
                    view: "h5",
                    title: "Heading 5",
                    class: "ck-heading_heading5",
                },
                {
                    model: "heading6",
                    view: "h6",
                    title: "Heading 6",
                    class: "ck-heading_heading6",
                },
            ],
        },
        htmlSupport: {
            allow: [
                {
                    name: /^.*$/,
                    styles: true,
                    attributes: true,
                    classes: true,
                },
            ],
        },
        image: {
            toolbar: [
                "toggleImageCaption",
                "imageTextAlternative",
                "|",
                "imageStyle:inline",
                "imageStyle:wrapText",
                "imageStyle:breakText",
                "|",
                "resizeImage",
            ],
        },
        link: {
            addTargetToExternalLinks: true,
            defaultProtocol: "https://",
            decorators: {
                toggleDownloadable: {
                    mode: "manual",
                    label: "Downloadable",
                    attributes: {
                        download: "file",
                    },
                },
            },
        },
        list: {
            properties: {
                styles: true,
                startIndex: true,
                reversed: true,
            },
        },
        menuBar: {
            isVisible: true,
        },
        placeholder: "Type or paste your content here!",
        style: {
            definitions: [
                {
                    name: "Article category",
                    element: "h3",
                    classes: ["category"],
                },
                {
                    name: "Title",
                    element: "h2",
                    classes: ["document-title"],
                },
                {
                    name: "Subtitle",
                    element: "h3",
                    classes: ["document-subtitle"],
                },
                {
                    name: "Info box",
                    element: "p",
                    classes: ["info-box"],
                },
                {
                    name: "Side quote",
                    element: "blockquote",
                    classes: ["side-quote"],
                },
                {
                    name: "Marker",
                    element: "span",
                    classes: ["marker"],
                },
                {
                    name: "Spoiler",
                    element: "span",
                    classes: ["spoiler"],
                },
                {
                    name: "Code (dark)",
                    element: "pre",
                    classes: ["fancy-code", "fancy-code-dark"],
                },
                {
                    name: "Code (bright)",
                    element: "pre",
                    classes: ["fancy-code", "fancy-code-bright"],
                },
            ],
        },
        table: {
            contentToolbar: [
                "tableColumn",
                "tableRow",
                "mergeTableCells",
                "tableProperties",
                "tableCellProperties",
            ],
        },
    };

    return (
        <div>
            <div className="ml-5 main-container">
                <div
                    className="editor-container editor-container_classic-editor editor-container_include-style editor-container_include-block-toolbar"
                    ref={editorContainerRef}
                >
                    <div className="editor-container__editor">
                        <div ref={editorRef} id="post-content">
                            {isLayoutReady && (
                                <CKEditor
                                    key={editorKey}
                                    editor={ClassicEditor}
                                    config={editorConfig}
                                    data={data}
                                    onReady={(editor) => {
                                        console.info("Editor is ready to use!");
                                        onChange(editor.getData());
                                    }}
                                    onError={(error) => {
                                        console.error("CKEditor error:", error);
                                    }}
                                    onChange={handleChangeContent}
                                    onBlur={handleChangeContent}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WYSWYG;
