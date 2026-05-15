(() => {
  "use strict";

  const STORAGE_KEY = "nagenderLearningApp";
  const PASS_MARK = 7;
  const MAX_SCREENSHOTS = 5;
  const MAX_FILE_SIZE = 1.2 * 1024 * 1024;

  const adminAccounts = [
    { email: "admin@nag.app", password: "nagender1234" },
    { email: "admin@nagender.app", password: "nagender1234" }
  ];

  const allowedStudents = ["9618100536", "9640735020", "9390339182","9642631019","9848256694","7439045986","7680832390","7670973466","8367267967","8328506190"];

  const state = {
    activeTab: "learn",
    dayFilter: "",
    toastTimer: null
  };

  const trackMeta = {
    html: {
      label: "HTML",
      className: "html",
      focus: "Structure, meaning, accessibility, and clean document flow",
      mentorNote: "HTML should be explained as the content and meaning layer of a website. A strong student can describe why a tag is used, not only what it looks like in the browser."
    },
    css: {
      label: "CSS",
      className: "css",
      focus: "Layout, spacing, responsive design, visual polish, and maintainable selectors",
      mentorNote: "CSS should not be random trial and error. Students should learn a repeatable process: reset, layout, spacing, typography, states, and responsive checks."
    },
    js: {
      label: "JavaScript",
      className: "js",
      focus: "Logic, browser interaction, data handling, async work, and debugging",
      mentorNote: "JavaScript is where students must slow down and trace execution. They should know what data enters a function, what changes, and what result comes out."
    },
    project: {
      label: "Project",
      className: "project",
      focus: "Planning, integration, validation, debugging, presentation, and interview explanation",
      mentorNote: "A project is not only about finishing screens. Students should be able to explain decisions, edge cases, tradeoffs, and improvements."
    }
  };

  const courseDays = [
    day(1, "FSD Orientation, HTML5 and Boilerplate", "html", ["full-stack development", "frontend vs backend", "how websites work", "HTML5 role", "boilerplate structure", "editor and browser setup"], "Personal introduction page"),
    day(2, "HTML Basic Tags: html, head and body", "html", ["html tag", "head tag", "body tag", "title tag", "meta charset", "viewport meta tag"], "Clean document skeleton"),
    day(3, "HTML Content Tags: Text, Images, Lists and Links", "html", ["headings", "paragraphs", "span", "image tag", "unordered list", "ordered list", "anchor tag"], "Profile content page"),
    day(4, "Semantic HTML Layout Tags", "html", ["header", "main", "footer", "section", "article", "nav", "aside", "semantic layout"], "News article layout"),
    day(5, "Assignment 1: Portfolio Using HTML", "html", ["portfolio structure", "about section", "skills section", "projects section", "contact section", "semantic HTML"], "Portfolio with HTML only"),
    day(6, "Complete Webpage Creation Using HTML5", "html", ["multi-section webpage", "internal links", "image accessibility", "forms introduction", "HTML validation", "page readability"], "Complete HTML webpage"),
    day(7, "CSS3 Introduction and Basic Properties", "css", ["what CSS does", "inline CSS", "internal CSS", "external CSS", "color", "background color", "class selector", "id selector"], "Style a basic page"),
    day(8, "CSS Box Model", "css", ["content area", "padding", "border", "margin", "box sizing", "width and height", "spacing consistency"], "Box model practice layout"),
    day(9, "CSS Flexbox", "css", ["display flex", "flex direction", "justify content", "align items", "gap", "flex wrap", "responsive rows"], "Responsive card row"),
    day(10, "CSS Grid", "css", ["display grid", "grid template columns", "grid template rows", "gap", "fr unit", "repeat", "minmax"], "Responsive gallery"),
    day(11, "Assignment 3: Style the Portfolio", "css", ["portfolio colors", "typography", "spacing scale", "cards", "hover states", "consistent design"], "Styled portfolio"),
    day(12, "CSS Positioning Layout", "css", ["static position", "relative position", "absolute position", "fixed position", "sticky position", "z index", "position use cases"], "Navbar and badges"),
    day(13, "Responsive Design with Media Queries", "css", ["mobile first design", "breakpoints", "media queries", "responsive images", "fluid layouts", "testing screen sizes"], "Responsive landing screen"),
    day(14, "Assignment 4: Responsive Portfolio", "css", ["mobile navigation", "responsive sections", "responsive cards", "tap targets", "accessibility checks", "final polish"], "Responsive portfolio"),
    day(15, "JavaScript Introduction and Basics", "js", ["what JavaScript does", "script tag", "console log", "let", "var", "const", "variable naming"], "Basic JS output practice"),
    day(16, "Data Types: Primitive and Reference", "js", ["string", "number", "boolean", "undefined", "null", "object", "array", "typeof"], "Data type examples"),
    day(17, "Operators and Expressions", "js", ["arithmetic operators", "assignment operators", "comparison operators", "logical operators", "ternary operator", "truthy and falsy"], "Calculator logic practice"),
    day(18, "Control Statements: Conditions and Loops", "js", ["if else", "switch", "for loop", "while loop", "break", "continue", "dry run"], "Decision and loop programs"),
    day(19, "Functions", "js", ["function declaration", "parameters", "arguments", "return value", "default parameters", "function naming"], "Reusable functions practice"),
    day(20, "Arrow Functions, Callbacks and Higher-Order Thinking", "js", ["arrow function", "callback function", "anonymous function", "first class function", "higher order function", "basic closure idea"], "Callback examples"),
    day(21, "DOM and Selectors", "js", ["DOM tree", "getElementById", "getElementsByClassName", "getElementsByTagName", "querySelector", "querySelectorAll"], "DOM selection practice"),
    day(22, "Events and Event Listeners", "js", ["event handler", "addEventListener", "click event", "input event", "submit event", "event object", "event bubbling"], "Interactive cards"),
    day(23, "Form Submission and Validation", "js", ["preventDefault", "required validation", "regular expression basics", "error messages", "password checks", "friendly form UX"], "Form validation project"),
    day(24, "JavaScript on a Webpage", "js", ["DOM update", "classList", "style changes", "createElement", "appendChild", "localStorage introduction"], "Interactive webpage"),
    day(25, "APIs: Fetch, JSON and Objects", "js", ["API meaning", "fetch", "then", "catch", "response json", "JSON object", "loading state", "error state"], "Fetch and display data"),
    day(26, "Asynchronous JavaScript", "js", ["synchronous execution", "asynchronous execution", "callback hell", "promise", "resolve and reject", "async await"], "Promise practice"),
    day(27, "JavaScript Program with API", "js", ["API integration", "loading UI", "error UI", "render cards", "search filter", "clean functions"], "API mini application"),
    day(28, "Assignment 9: Phonebook with Fetch API", "js", ["phonebook UI", "fetch users", "search contact", "add contact UI", "localStorage", "input validation"], "Phonebook app"),
    day(29, "Arrays and String Methods", "js", ["push", "pop", "shift", "unshift", "slice", "splice", "includes", "indexOf", "split", "join", "trim"], "Array and string challenges"),
    day(30, "Rest, Spread, map, filter, reduce and forEach", "js", ["rest operator", "spread operator", "map", "filter", "reduce", "forEach", "immutability"], "Array methods practice"),
    day(31, "Web Development Using JavaScript", "project", ["project planning", "HTML CSS JS integration", "component thinking", "debugging checklist", "basic deployment", "final revision"], "Front-end capstone"),
    day(32, "Mini Project: Sign Up Form Validation", "project", ["HTML form", "responsive UI", "JavaScript validation", "password rules", "localStorage", "success screen"], "Sign up form validation")
  ];

  const foundationExtras = {
    html: ["Use one clear h1 per page unless there is a strong reason.", "Every meaningful image needs useful alt text.", "Do not use div for everything when semantic tags explain the content better.", "Check page outline, link text, label tags, and form structure before calling HTML complete."],
    css: ["Use box-sizing border-box before building layouts.", "Use Flexbox for one direction and Grid for rows plus columns.", "Avoid fixed pixel widths for main layouts; prefer max-width, minmax, percentages, and rem units.", "Test hover, focus, active, mobile, tablet, and desktop states."],
    js: ["Name variables by meaning, not by type alone.", "Keep functions small: input, work, output.", "Read errors from the console carefully before changing code.", "When async code fails, handle loading, success, empty, and error states."],
    project: ["Write the user flow before writing code.", "Keep folders clean: index.html, styles.css, app.js, assets if needed.", "Test wrong input, empty input, repeated input, and mobile layout.", "Prepare a 60 second explanation of the project for interviews."]
  };

  const topicNotes = {
    "full-stack development": "Full-stack development means understanding both the user-facing part of an application and the server or data side behind it. At the beginner stage, students should first become comfortable with HTML, CSS, JavaScript, browser behavior, and debugging.",
    "frontend vs backend": "Frontend runs in the browser and controls what users see and interact with. Backend runs on a server and handles business logic, authentication, databases, and secure operations.",
    "how websites work": "A browser requests files from a server, parses HTML, downloads CSS and JavaScript, builds the page, and then reacts to user actions. This flow helps students understand why file paths, loading order, and browser tools matter.",
    "HTML5 role": "HTML5 gives modern semantic tags, better form inputs, audio/video support, and cleaner document structure. It helps browsers, screen readers, and search engines understand the page.",
    "boilerplate structure": "A boilerplate is the minimum safe starting structure: doctype, html language, head metadata, viewport, title, body, and linked assets. It prevents repeated setup mistakes.",
    "editor and browser setup": "Students should know how to open a folder in VS Code, create files, use Live Server or direct browser refresh, inspect elements, and read console errors.",
    "html tag": "The html tag wraps the full document and should include a lang attribute. This helps accessibility tools and search engines understand the language of the page.",
    "head tag": "The head contains metadata, title, links to CSS, viewport settings, and SEO information. It is not for visible page content.",
    "body tag": "The body contains everything visible or interactive on the page: headings, sections, forms, images, links, and script output.",
    "title tag": "The title appears in the browser tab and search results. It should be short, clear, and specific to the page.",
    "meta charset": "The charset tells the browser how to read characters. UTF-8 is the standard choice for modern web pages.",
    "viewport meta tag": "The viewport tag lets the layout fit mobile screens correctly. Without it, responsive CSS behaves poorly on phones.",
    "headings": "Headings create hierarchy. h1 is the main title, h2 starts major sections, and smaller headings organize details. Do not choose headings only for font size.",
    "paragraphs": "Paragraph tags are for readable blocks of text. They improve spacing, readability, and document meaning.",
    "span": "Span is an inline generic wrapper used when there is no semantic tag available. It is useful for styling small text pieces, not for full layout.",
    "image tag": "The img tag displays an image through src and explains it with alt. Good students know how to use relative paths and meaningful alt text.",
    "unordered list": "Use ul when order does not matter, like skills, features, or menu items.",
    "ordered list": "Use ol when sequence matters, like steps, rankings, or instructions.",
    "anchor tag": "The anchor tag creates links. href decides the destination, and link text should clearly describe where it goes.",
    "header": "Header is used for introductory content such as logo, page title, or primary navigation area.",
    "main": "Main wraps the unique main content of the page. A page should usually have one main element.",
    "footer": "Footer contains closing information such as copyright, contact links, or secondary navigation.",
    "section": "Section groups related content under a meaningful heading. Use it when the grouped content has a clear topic.",
    "article": "Article is for independent content that could stand alone, like a blog post, testimonial, or news story.",
    "nav": "Nav groups important navigation links. It helps users and assistive tools identify menus.",
    "aside": "Aside is for supporting information related to the main content, such as tips, side notes, or related links.",
    "semantic layout": "Semantic layout means choosing tags based on meaning. It makes code easier to read, improves accessibility, and supports SEO.",
    "portfolio structure": "A basic portfolio should tell who the student is, what they know, what they built, and how to contact them.",
    "about section": "The about section should be honest and clear. Students can mention learning stage, strengths, and career goal.",
    "skills section": "Skills should be grouped cleanly, for example HTML, CSS, JavaScript, tools, and soft skills.",
    "projects section": "Project cards should include the problem, features, tech stack, and what the student learned.",
    "contact section": "Contact sections should use labels, real links, and simple form structure if a form is included.",
    "multi-section webpage": "A complete webpage has multiple clear sections, consistent hierarchy, navigation, and a logical reading order.",
    "internal links": "Internal links move the user to another section of the same page using ids. They are useful for long pages.",
    "image accessibility": "Accessible images use alt text that explains meaning. Decorative images can use empty alt text.",
    "forms introduction": "Forms collect input. Every input should have a label, suitable type, and helpful validation message.",
    "HTML validation": "Validation catches missing tags, invalid nesting, repeated ids, and attributes used incorrectly.",
    "page readability": "Readable HTML has indentation, meaningful names, clean hierarchy, and no unnecessary wrappers.",
    "what CSS does": "CSS controls visual presentation: color, spacing, layout, typography, responsive behavior, and interaction states.",
    "inline CSS": "Inline CSS is written inside a style attribute. It is quick for testing but poor for maintainability.",
    "internal CSS": "Internal CSS is written inside a style tag. It is fine for small demos but grows messy in larger pages.",
    "external CSS": "External CSS keeps styling in a separate file. This is the best habit for real projects.",
    "color": "Color should support readability and brand feeling. Students must check contrast instead of choosing colors only by taste.",
    "background color": "Background color defines the surface behind content. Use it with enough contrast for text.",
    "class selector": "A class selector is reusable and starts with a dot. It is the normal way to style repeated elements.",
    "id selector": "An id selector targets one unique element. Use ids carefully because they have high specificity.",
    "content area": "The content area is where text or media sits inside an element.",
    "padding": "Padding is inner space between content and border. It improves breathing room inside cards, buttons, and sections.",
    "border": "Border outlines an element. It can separate surfaces without using heavy shadows.",
    "margin": "Margin is outer space around an element. It controls distance between elements.",
    "box sizing": "box-sizing: border-box makes width include padding and border, which makes layouts easier to predict.",
    "width and height": "Width and height define dimensions, but responsive design often needs min-width, max-width, min-height, and flexible units.",
    "spacing consistency": "Consistent spacing makes a UI look intentional. Random margins are one of the fastest ways to make a page look unprofessional.",
    "display flex": "Flexbox arranges direct children in one direction: row or column. It is excellent for navbars, cards, buttons, and alignment.",
    "flex direction": "flex-direction decides whether items flow in a row or column.",
    "justify content": "justify-content controls alignment along the main axis.",
    "align items": "align-items controls alignment across the cross axis.",
    "gap": "gap gives clean space between flex or grid children without adding margins to each child.",
    "flex wrap": "flex-wrap lets items move to the next line when space is not enough.",
    "responsive rows": "Responsive rows should wrap naturally and keep readable card widths.",
    "display grid": "Grid creates two-dimensional layout with rows and columns. It is useful for galleries, dashboards, and complex page sections.",
    "grid template columns": "grid-template-columns defines column tracks. repeat, minmax, and fr units make it responsive.",
    "grid template rows": "grid-template-rows defines row tracks. It is used when vertical alignment needs structure.",
    "fr unit": "The fr unit distributes available space inside CSS Grid.",
    "repeat": "repeat() avoids writing the same grid track multiple times.",
    "minmax": "minmax() gives grid columns a minimum and maximum size, which is very useful for responsive layouts.",
    "portfolio colors": "Portfolio colors should be limited and consistent. Use neutral surfaces, one strong accent, and readable text.",
    "typography": "Typography is font choice, size, weight, line-height, and hierarchy. It decides how professional the page feels.",
    "spacing scale": "A spacing scale uses repeated values like 8, 12, 16, 24, and 32 instead of random numbers.",
    "cards": "Cards should group one piece of related content. Avoid putting cards inside cards unless there is a real reason.",
    "hover states": "Hover states give feedback on interactive elements. They should be subtle and consistent.",
    "consistent design": "Consistent design means buttons, cards, headings, colors, and spacing follow the same system.",
    "static position": "static is the default position. The element follows normal document flow.",
    "relative position": "relative keeps the element in flow but allows small offset and creates a reference for absolutely positioned children.",
    "absolute position": "absolute removes the element from normal flow and positions it relative to the nearest positioned ancestor.",
    "fixed position": "fixed positions an element relative to the viewport, useful for persistent headers or floating actions.",
    "sticky position": "sticky acts normal until a scroll threshold, then sticks. It is good for headers and sidebars.",
    "z index": "z-index controls stacking order, but only works meaningfully on positioned elements or stacking contexts.",
    "position use cases": "Use positioning for overlays, badges, sticky navbars, and controlled decorative placement, not for full page layout.",
    "mobile first design": "Mobile first means writing the small screen layout first, then enhancing for larger screens.",
    "breakpoints": "Breakpoints are screen widths where layout needs to change. They should be based on content, not random device names.",
    "media queries": "Media queries apply CSS only under specific conditions, usually viewport width.",
    "responsive images": "Responsive images should not overflow their container. max-width: 100% is a basic safety rule.",
    "fluid layouts": "Fluid layouts adapt using flexible widths, grid tracks, and constraints instead of fixed desktop widths.",
    "testing screen sizes": "Students should test mobile, tablet, laptop, and wide desktop. DevTools responsive mode is required practice.",
    "mobile navigation": "Mobile navigation should have enough tap area, readable labels, and a layout that does not push content awkwardly.",
    "responsive sections": "Sections should stack naturally on small screens and use columns only when there is enough room.",
    "responsive cards": "Cards need stable widths, readable text, and no overflow on mobile.",
    "tap targets": "Clickable areas should be large enough for fingers, usually at least 40px high.",
    "accessibility checks": "Check contrast, focus state, labels, alt text, heading order, and keyboard usability.",
    "final polish": "Final polish includes alignment, spacing, empty states, error states, and removing unused code.",
    "what JavaScript does": "JavaScript adds behavior to the page. It can read values, make decisions, update the DOM, store data, and call APIs.",
    "script tag": "The script tag loads JavaScript. defer is useful because it waits for HTML parsing before running the file.",
    "console log": "console.log helps inspect values during debugging. It should support thinking, not replace understanding.",
    "let": "let creates a block-scoped variable that can be reassigned.",
    "var": "var is function-scoped and can create confusing behavior. Students should know it for interviews but prefer let and const.",
    "const": "const creates a block-scoped binding that cannot be reassigned. Objects and arrays declared with const can still have internal changes.",
    "variable naming": "Good variable names explain meaning: studentScore is clearer than x or data1.",
    "string": "A string stores text. Common operations include trim, includes, split, and template literals.",
    "number": "A number stores numeric values. Be careful with conversion from input fields because form values arrive as strings.",
    "boolean": "A boolean is true or false and is commonly used for conditions and UI states.",
    "undefined": "undefined usually means a variable exists but has not received a value.",
    "null": "null is an intentional empty value. It means the developer chose no value.",
    "object": "An object stores related data using key value pairs. It is common for users, products, settings, and API responses.",
    "array": "An array stores ordered items. It is common for lists such as students, products, todos, and quiz questions.",
    "typeof": "typeof helps inspect the type of a value, but it has quirks such as typeof null returning object.",
    "arithmetic operators": "Arithmetic operators perform math: addition, subtraction, multiplication, division, remainder, and exponent.",
    "assignment operators": "Assignment operators put values into variables, for example =, +=, and -=.",
    "comparison operators": "Comparison operators compare values and return booleans. Prefer strict equality === in real code.",
    "logical operators": "Logical operators combine conditions: && for all required, || for alternatives, and ! for negation.",
    "ternary operator": "The ternary operator is a short if else expression. Use it for simple choices, not complex logic.",
    "truthy and falsy": "JavaScript treats some values as false in conditions, such as empty string, 0, null, undefined, and false.",
    "if else": "if else runs different code based on conditions. Students should practice dry-running each branch.",
    "switch": "switch is useful when one value is compared against many exact cases.",
    "for loop": "A for loop is used when the number of repetitions is known or index access is needed.",
    "while loop": "A while loop runs while a condition remains true. It is useful when repetition count is not fixed.",
    "break": "break exits a loop or switch early.",
    "continue": "continue skips the current loop iteration and moves to the next one.",
    "dry run": "Dry running means tracing code manually step by step. It is essential for loops and conditions.",
    "function declaration": "A function declaration creates reusable logic with a name. It is hoisted, so it can be called before its definition.",
    "parameters": "Parameters are placeholders in a function definition.",
    "arguments": "Arguments are real values passed when calling a function.",
    "return value": "return sends a result out of a function and stops execution inside that function.",
    "default parameters": "Default parameters provide fallback values when arguments are missing.",
    "function naming": "A function name should usually start with a verb, such as calculateTotal or renderCards.",
    "arrow function": "Arrow functions are a shorter syntax for functions. They also handle this differently from normal functions.",
    "callback function": "A callback is a function passed into another function to be called later.",
    "anonymous function": "An anonymous function has no name. It is commonly used as a callback, but named functions are easier to debug.",
    "first class function": "JavaScript functions are first-class values, which means they can be stored, passed, and returned.",
    "higher order function": "A higher-order function accepts a function or returns a function. map, filter, and reduce are common examples.",
    "basic closure idea": "A closure happens when an inner function remembers variables from an outer function.",
    "DOM tree": "The DOM is the browser's object version of HTML. JavaScript uses it to read and update elements.",
    "getElementById": "getElementById selects one element by its id. It is fast and simple for unique targets.",
    "getElementsByClassName": "getElementsByClassName returns a live collection of elements with a class.",
    "getElementsByTagName": "getElementsByTagName returns elements by tag name, such as all p or all li elements.",
    "querySelector": "querySelector returns the first match for a CSS selector.",
    "querySelectorAll": "querySelectorAll returns a static list of all matches for a CSS selector.",
    "event handler": "An event handler is code that runs when the user or browser triggers an event.",
    "addEventListener": "addEventListener attaches behavior without mixing JavaScript into HTML attributes.",
    "click event": "Click events are used for buttons, cards, links, and interactive controls.",
    "input event": "Input events run as the value changes, useful for live search and validation.",
    "submit event": "Submit events are used for forms. Use preventDefault when JavaScript should handle submission.",
    "event object": "The event object contains details like target, currentTarget, key, and default behavior.",
    "event bubbling": "Event bubbling means events move from the target element up through parent elements. It enables event delegation.",
    "preventDefault": "preventDefault stops the browser's default action, such as refreshing a page on form submit.",
    "required validation": "Required validation ensures the user does not submit empty important fields.",
    "regular expression basics": "Regular expressions match text patterns. Use them carefully for email, phone, or password rules.",
    "error messages": "Good error messages tell the user what went wrong and how to fix it.",
    "password checks": "Password checks can verify length, uppercase, lowercase, number, and special character rules.",
    "friendly form UX": "Friendly forms keep labels visible, show errors near fields, and preserve user input.",
    "DOM update": "DOM updates change what the user sees, such as text, classes, attributes, or newly created elements.",
    "classList": "classList adds, removes, toggles, and checks classes without editing the full class string.",
    "style changes": "Inline style changes are useful for small dynamic values, but classes are better for reusable UI states.",
    "createElement": "createElement builds a new DOM element in JavaScript.",
    "appendChild": "appendChild places a created element inside another element.",
    "localStorage introduction": "localStorage stores small string data in the browser even after refresh. Use JSON.stringify and JSON.parse for objects.",
    "API meaning": "An API is a contract for one system to request or send data to another system.",
    "fetch": "fetch sends network requests from JavaScript and returns a Promise.",
    "then": "then handles a fulfilled Promise. It is common in older Promise chains.",
    "catch": "catch handles errors from a Promise chain.",
    "response json": "response.json reads the response body and converts JSON into JavaScript data.",
    "JSON object": "JSON is a data format. JavaScript objects are runtime values; JSON strings must be parsed.",
    "loading state": "A loading state tells the user that data is being fetched or processed.",
    "error state": "An error state explains what failed and keeps the interface usable.",
    "synchronous execution": "Synchronous code runs line by line and blocks the next line until it finishes.",
    "asynchronous execution": "Asynchronous code starts work that completes later, such as timers, network requests, and file reading.",
    "callback hell": "Callback hell is deeply nested callback code that becomes hard to read and maintain.",
    "promise": "A Promise represents a future result and can be pending, fulfilled, or rejected.",
    "resolve and reject": "resolve marks a Promise successful; reject marks it failed.",
    "async await": "async and await make Promise-based code read more like step-by-step synchronous code.",
    "API integration": "API integration means fetching data, validating response shape, handling errors, and rendering useful UI.",
    "loading UI": "Loading UI can be text, skeleton, spinner, or disabled controls while work is in progress.",
    "error UI": "Error UI should be visible, understandable, and offer a retry or next step.",
    "render cards": "Rendering cards means converting data into repeated UI blocks using functions, loops, or templates.",
    "search filter": "Search filtering compares user input with data fields and rerenders matching results.",
    "clean functions": "Clean functions do one job, use clear names, and avoid hidden side effects where possible.",
    "phonebook UI": "A phonebook UI needs list, search, add contact form, validation, empty state, and readable contact cards.",
    "fetch users": "Fetching users means getting contact data from an API and preparing it for display.",
    "search contact": "Search should ignore case and often match name, phone, or email.",
    "add contact UI": "Adding contact UI should validate fields and show the new item without confusing the user.",
    "input validation": "Input validation protects data quality and gives the user clear correction steps.",
    "push": "push adds an item to the end of an array.",
    "pop": "pop removes the last item from an array.",
    "shift": "shift removes the first item from an array.",
    "unshift": "unshift adds an item to the start of an array.",
    "slice": "slice returns a copy of part of an array or string without changing the original.",
    "splice": "splice can add, remove, or replace array items and changes the original array.",
    "includes": "includes checks whether an array or string contains a value.",
    "indexOf": "indexOf returns the first index of a value or -1 if not found.",
    "split": "split turns a string into an array based on a separator.",
    "join": "join turns an array into a string using a separator.",
    "trim": "trim removes extra spaces from the start and end of a string.",
    "rest operator": "Rest gathers remaining values into an array, commonly in function parameters.",
    "spread operator": "Spread expands arrays or objects into another array, object, or function call.",
    "map": "map transforms every item and returns a new array of the same length.",
    "filter": "filter keeps items that pass a condition and returns a new array.",
    "reduce": "reduce converts an array into one final value such as total, grouped object, or summary.",
    "forEach": "forEach runs a function for each item and is best for side effects, not returning transformed data.",
    "immutability": "Immutability means creating new arrays or objects instead of changing old ones, which helps predictable UI updates.",
    "project planning": "Project planning means deciding users, screens, inputs, validations, data, and success states before coding.",
    "HTML CSS JS integration": "Integration means HTML gives structure, CSS handles layout, and JavaScript controls behavior in a connected flow.",
    "component thinking": "Component thinking means breaking UI into repeated pieces with clear responsibility.",
    "debugging checklist": "A debugging checklist includes reading the error, reproducing the issue, checking data, isolating the function, and testing the fix.",
    "basic deployment": "Basic deployment means putting files on a host and checking paths, responsiveness, and browser console after upload.",
    "final revision": "Final revision means checking content, code formatting, edge cases, accessibility, and project explanation.",
    "HTML form": "A good form uses labels, correct input types, required fields, helpful placeholders, and accessible errors.",
    "responsive UI": "Responsive UI works without horizontal scrolling and keeps controls readable on small screens.",
    "JavaScript validation": "JavaScript validation checks rules before accepting input and gives feedback without losing user data.",
    "password rules": "Password rules should be clear before submission and should guide the user while typing.",
    "success screen": "A success screen confirms completion and explains the next action."
  };

  const mcqBank = {
    html: [
      q("What is the main responsibility of HTML?", ["To structure and describe webpage content", "To store database records", "To style animations only", "To secure server routes"], 0, "easy", "HTML gives content structure and meaning."),
      q("Which part contains visible page content?", ["head", "body", "meta", "title"], 1, "easy", "Visible elements belong inside body."),
      q("Why is semantic HTML important?", ["It improves meaning, accessibility, and maintainability", "It removes the need for CSS", "It encrypts the page", "It makes forms submit automatically"], 0, "easy", "Semantic tags communicate purpose."),
      q("Which tag is best for primary navigation?", ["nav", "span", "b", "script"], 0, "easy", "nav identifies navigation links."),
      q("What does the alt attribute provide?", ["Alternative text for images", "Image width only", "A CSS class", "A link target"], 0, "easy", "alt text supports accessibility and fallback meaning."),
      q("What does the viewport meta tag help with?", ["Responsive layout on different devices", "Database connection", "Password hashing", "Image compression"], 0, "medium", "It controls viewport sizing on mobile."),
      q("Which heading is usually the main page title?", ["h6", "h1", "p", "small"], 1, "medium", "h1 represents the top-level heading."),
      q("What is the practical difference between section and div?", ["section has semantic meaning; div is generic", "div is only for images", "section is invalid in HTML5", "They both always mean article"], 0, "medium", "section is meaningful when content has a theme."),
      q("Where should page metadata normally be placed?", ["body", "main", "head", "footer"], 2, "medium", "Metadata belongs in head."),
      q("Which is a common accessibility mistake?", ["Missing labels for form inputs", "Using lowercase HTML tags", "Indenting code", "Using semantic tags"], 0, "medium", "Labels help all users understand inputs."),
      q("Why should heading levels not be chosen only for visual size?", ["They define document hierarchy", "Browsers reject h2 tags", "CSS cannot style headings", "Images depend on headings"], 0, "hard", "Use CSS for size and headings for structure."),
      q("Which layout structure is more semantic?", ["header, main, footer", "div, div, div for everything", "span around the full page", "br between every section"], 0, "hard", "Semantic page regions are clearer."),
      q("What can HTML validation catch?", ["Invalid nesting and missing required attributes", "Only JavaScript syntax errors", "Only color contrast", "Only database errors"], 0, "hard", "Validators inspect HTML correctness."),
      q("Which choice improves SEO and screen reader understanding?", ["Clear headings and semantic tags", "Inline styles everywhere", "Empty alt text for all images", "Random class names"], 0, "hard", "Meaningful structure helps machines and people."),
      q("How should HTML be explained in an interview?", ["It is the structure and meaning layer of the web page", "It is a programming language for loops", "It is only a styling tool", "It is a database query language"], 0, "hard", "This is the clean interview framing.")
    ],
    css: [
      q("What is CSS mainly used for?", ["Styling and layout", "Database storage", "Server routing", "Creating HTML tags"], 0, "easy", "CSS controls presentation."),
      q("Which selector targets a class?", [".card", "#card", "card()", "<card>"], 0, "easy", "Class selectors start with a dot."),
      q("Which selector targets an id?", ["#hero", ".hero", "hero[]", "@hero"], 0, "easy", "ID selectors start with #."),
      q("What does margin control?", ["Space outside an element", "Space inside text only", "Image source", "Browser title"], 0, "easy", "Margin is outside space."),
      q("What does padding control?", ["Space inside an element", "Database row spacing", "File name", "Viewport width"], 0, "easy", "Padding is inner space."),
      q("What does display: flex help create?", ["One-dimensional layouts", "HTML metadata", "API responses", "Password validation"], 0, "medium", "Flexbox is primarily one-dimensional."),
      q("Which property aligns flex items on the cross axis?", ["align-items", "justify-database", "font-route", "image-src"], 0, "medium", "align-items handles cross-axis alignment."),
      q("What does gap control?", ["Space between flex or grid children", "Password length", "Image format", "HTML language"], 0, "medium", "gap creates clean child spacing."),
      q("What is CSS Grid best for?", ["Two-dimensional layouts", "Only click handling", "Only form validation", "Only console output"], 0, "medium", "Grid handles rows and columns."),
      q("Why use media queries?", ["To adapt design for screen sizes", "To delete HTML", "To create JavaScript variables", "To stop CSS loading"], 0, "medium", "Media queries support responsive design."),
      q("What is specificity?", ["Rules that decide which CSS selector wins", "Image size only", "Server speed", "HTML error type"], 0, "hard", "Specificity affects conflict resolution."),
      q("Why use box-sizing: border-box?", ["Width includes padding and border", "It removes all margins", "It creates animations", "It changes tags"], 0, "hard", "It makes sizing predictable."),
      q("When is position: sticky useful?", ["Keeping an element visible after a scroll point", "Creating arrays", "Fetching APIs", "Parsing JSON"], 0, "hard", "Sticky is scroll-aware positioning."),
      q("What is mobile-first CSS?", ["Design small screens first, then enhance", "Ignore phones", "Use fixed widths", "Use only inline CSS"], 0, "hard", "Mobile-first starts from constrained layouts."),
      q("How should Flexbox vs Grid be explained?", ["Flexbox is one-dimensional; Grid is two-dimensional", "Both are only for colors", "Grid is old HTML", "Flexbox only works on images"], 0, "hard", "This is the standard interview distinction.")
    ],
    js: [
      q("What is JavaScript mainly used for in the browser?", ["Adding logic and interaction", "Writing CSS selectors only", "Storing server passwords", "Replacing HTML completely"], 0, "easy", "JavaScript controls behavior."),
      q("Which keyword creates a block-scoped variable that can change?", ["let", "var", "const", "static"], 0, "easy", "let is block-scoped and reassignable."),
      q("Which value means intentionally empty?", ["null", "undefined", "NaN", "false"], 0, "easy", "null is intentional empty value."),
      q("What does typeof return?", ["The type of a value", "The length of a string", "The CSS class", "The file path"], 0, "easy", "typeof inspects type."),
      q("Which operator checks strict equality?", ["===", "=", "=>", "!==="], 0, "easy", "=== checks value and type."),
      q("What does a function return when there is no return statement?", ["undefined", "null", "0", "false"], 0, "medium", "A missing return gives undefined."),
      q("What is a callback?", ["A function passed to another function", "A CSS property", "An HTML tag", "A server address"], 0, "medium", "Callbacks are passed as values."),
      q("What is the DOM?", ["Browser object representation of HTML", "A database", "A CSS reset", "A hosting service"], 0, "medium", "The DOM lets JS interact with the page."),
      q("What does preventDefault do in a submit event?", ["Stops the browser's default form action", "Deletes the form", "Clears localStorage", "Turns HTML into CSS"], 0, "medium", "It prevents page refresh or native submission."),
      q("What does JSON.parse do?", ["Converts a JSON string to a JavaScript value", "Converts JS to a JSON string", "Deletes browser data", "Creates CSS"], 0, "medium", "parse reads JSON strings."),
      q("What is closure?", ["A function remembering outer variables", "A CSS layout", "A form input type", "An image setting"], 0, "hard", "Closures retain lexical scope."),
      q("What is a Promise?", ["A future async result", "A loop type", "An HTML section", "A CSS variable"], 0, "hard", "Promises model async completion."),
      q("Why is async/await useful?", ["It makes Promise code easier to read", "It makes CSS faster", "It removes functions", "It turns objects into arrays"], 0, "hard", "async/await improves async flow readability."),
      q("What does map return?", ["A new transformed array", "The first matching item", "Nothing always", "A string only"], 0, "hard", "map transforms every item."),
      q("How should event bubbling be explained?", ["Events move from the target up through parent elements", "Events move only through CSS", "Events delete child nodes", "Events only work on forms"], 0, "hard", "Bubbling enables delegated listeners.")
    ],
    project: [
      q("What should come before writing project code?", ["Planning screens, data, actions, and validations", "Choosing random colors", "Uploading files first", "Deleting requirements"], 0, "easy", "Planning reduces rework."),
      q("Which files are enough for a clean beginner front-end project?", ["index.html, styles.css, app.js", "Only screenshot.png", "server.exe only", "database.sql only"], 0, "easy", "This is a clean static structure."),
      q("What is an empty state?", ["UI shown when there is no data yet", "A broken page", "A deleted CSS file", "A hidden password"], 0, "easy", "Empty states guide users."),
      q("Why validate user input?", ["To prevent wrong data and guide the user", "To make pages heavier", "To avoid HTML", "To remove labels"], 0, "easy", "Validation protects quality."),
      q("What should a project demo include?", ["Problem, features, flow, code logic, and improvements", "Only colors", "Only file names", "Only a password"], 0, "easy", "A demo should tell the story."),
      q("What makes debugging faster?", ["Reproducing the issue and checking one assumption at a time", "Changing many files randomly", "Ignoring console errors", "Deleting all code"], 0, "medium", "Debugging is systematic."),
      q("Why keep functions small?", ["They are easier to test, read, and reuse", "They make CSS unnecessary", "They hide errors", "They increase file size"], 0, "medium", "Small functions reduce complexity."),
      q("What is localStorage suitable for?", ["Small non-sensitive browser data", "Passwords and bank data", "Large video uploads", "Server-only secrets"], 0, "medium", "localStorage is client-side and limited."),
      q("What should be tested before submission?", ["Desktop, mobile, empty inputs, wrong inputs, and success flow", "Only one happy path", "Only the logo", "Only the file name"], 0, "medium", "Test the full user flow."),
      q("Why write a README or project notes?", ["To explain setup, features, logic, and improvements", "To replace code", "To hide bugs", "To store images only"], 0, "medium", "Good notes support interviews."),
      q("How should a project be explained in an interview?", ["Start with the problem, then features, architecture, logic, challenges, and improvements", "Read every line of code first", "Talk only about colors", "Avoid tradeoffs"], 0, "hard", "This structure is professional."),
      q("What is separation of concerns?", ["Keeping structure, style, and behavior in appropriate files", "Putting everything into one button", "Removing CSS", "Using one variable for all data"], 0, "hard", "It keeps code maintainable."),
      q("Why handle error states?", ["Users need clear feedback when something fails", "Errors should stay invisible", "It removes testing", "It makes HTML invalid"], 0, "hard", "Error states are part of a complete product."),
      q("What is progressive improvement?", ["First make it work, then improve structure, UX, and edge cases", "Start with animation only", "Skip requirements", "Never refactor"], 0, "hard", "This is a practical workflow."),
      q("What is a good final improvement plan?", ["Backend auth, database, real uploads, analytics, and better reporting", "More random colors only", "Remove validation", "Hide source files"], 0, "hard", "This shows real-world thinking.")
    ]
  };

  const interviewBank = {
    common: [
      ["How do you explain a concept when you do not remember the exact definition?", "I explain the purpose first, then give a small example, then mention where I used it. If I am unsure about exact syntax, I say I would verify it in documentation instead of guessing."],
      ["How do you debug a front-end issue?", "I reproduce the issue, read the console, inspect the element, check the data, isolate the smallest failing part, fix it, and retest the original flow."],
      ["How do you make a webpage professional?", "I focus on readable hierarchy, consistent spacing, accessible contrast, responsive layout, clear states, and code that another developer can understand."],
      ["What do you do when a requirement is unclear?", "I clarify the user flow, input, output, edge cases, and success condition before coding. If I must proceed, I document my assumption and keep the implementation easy to adjust."]
    ],
    html: [
      ["What is HTML?", "HTML is the structure and meaning layer of a web page. It tells the browser what content exists and how that content is organized."],
      ["What is semantic HTML?", "Semantic HTML means using tags based on meaning, such as header, nav, main, section, article, and footer. It improves readability, accessibility, and SEO."],
      ["Why is alt text important?", "Alt text helps screen reader users understand meaningful images and gives fallback information if the image fails to load."],
      ["What is the difference between div and section?", "A div is a generic container with no meaning. A section groups related content and should usually have a heading."],
      ["Why do we use the viewport meta tag?", "It tells the browser to match the page width to the device width, which is required for proper responsive design on mobile."]
    ],
    css: [
      ["What is the CSS box model?", "Every element is treated like a box made of content, padding, border, and margin. Understanding this helps control spacing and layout."],
      ["What is specificity?", "Specificity is the rule the browser uses to decide which CSS declaration wins when multiple selectors target the same property."],
      ["When would you use Flexbox?", "I use Flexbox for one-dimensional alignment, like navbars, button rows, card rows, and vertical centering."],
      ["When would you use Grid?", "I use Grid when I need control over rows and columns together, like galleries, dashboards, and page layouts."],
      ["What is mobile-first design?", "Mobile-first means writing the small screen layout first, then using media queries to improve the layout for larger screens."]
    ],
    js: [
      ["What is JavaScript?", "JavaScript is the programming language that adds behavior to web pages. It handles logic, events, DOM updates, storage, and API calls."],
      ["What is the difference between let, const, and var?", "let and const are block-scoped. let can be reassigned, const cannot be reassigned, and var is function-scoped, which can cause confusing behavior."],
      ["What is a closure?", "A closure happens when a function remembers variables from its outer scope even after the outer function has finished running."],
      ["What is the DOM?", "The DOM is the browser's object representation of HTML. JavaScript uses it to find, read, update, create, and remove page elements."],
      ["What is the difference between synchronous and asynchronous JavaScript?", "Synchronous code runs line by line. Asynchronous code starts work that finishes later, such as fetching data from an API."]
    ],
    project: [
      ["How do you plan a project?", "I define the user, screens, inputs, validations, actions, data storage, success states, error states, and the order in which I will build features."],
      ["How do you present a project?", "I explain the problem, the user flow, the features, the tech stack, the important logic, the challenges, and the improvements I would add next."],
      ["Why separate HTML, CSS, and JavaScript?", "It keeps structure, presentation, and behavior easier to maintain. It also makes the project look closer to real developer practice."],
      ["How do you improve a beginner project?", "I improve validation, responsiveness, accessibility, state handling, code organization, and edge cases before adding extra visual effects."],
      ["What would you add in production?", "I would add backend authentication, database storage, secure file uploads, server-side validation, analytics, and deployment monitoring."]
    ]
  };

  function day(n, title, track, topics, task) {
    return { n, title, track, topics, task };
  }

  function q(text, options, answer, level, why) {
    return { text, options, answer, level, why };
  }

  function qs(selector, root = document) {
    return root.querySelector(selector);
  }

  function qsa(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalize(value) {
    return String(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  }

  function defaultStorage() {
    return { users: {}, currentPhone: null, admin: false };
  }

  function storage() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (!parsed || typeof parsed !== "object") return defaultStorage();
      return {
        users: parsed.users && typeof parsed.users === "object" ? parsed.users : {},
        currentPhone: parsed.currentPhone || null,
        admin: Boolean(parsed.admin)
      };
    } catch {
      return defaultStorage();
    }
  }

  function saveStorage(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch {
      notify("Browser storage is full. Use smaller screenshots or clear old submissions.");
      return false;
    }
  }

  function currentUser() {
    const data = storage();
    if (!data.currentPhone || !data.users[data.currentPhone]) return null;
    return data.users[data.currentPhone];
  }

  function ensureUser(name, phone) {
    const data = storage();
    if (!data.users[phone]) {
      data.users[phone] = {
        name,
        phone,
        joinedAt: new Date().toISOString(),
        progress: {}
      };
    } else {
      data.users[phone].name = name || data.users[phone].name;
      data.users[phone].progress = data.users[phone].progress || {};
    }
    data.currentPhone = phone;
    saveStorage(data);
  }

  function progressFor(user, dayNumber) {
    return (user.progress || {})[dayNumber] || {};
  }

  function isDayComplete(progress) {
    return Boolean(progress.contentDone && progress.mcqPassed && progress.practiceSubmitted && progress.interviewDone);
  }

  function isUnlocked(user, dayNumber) {
    if (dayNumber === 1) return true;
    return isDayComplete(progressFor(user, dayNumber - 1));
  }

  function completedCount(user) {
    return Object.values(user.progress || {}).filter(isDayComplete).length;
  }

  function quizAverage(user) {
    const scores = Object.values(user.progress || {})
      .filter((progress) => typeof progress.mcqScore === "number")
      .map((progress) => (progress.mcqScore / mcqBank.html.length) * 100);
    if (!scores.length) return 0;
    return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
  }

  function finalScore(user) {
    const progress = Object.values(user.progress || {});
    const quizScores = progress
      .filter((p) => typeof p.mcqScore === "number")
      .map((p) => (p.mcqScore / mcqBank.html.length) * 100);
    const practiceScores = progress
      .filter((p) => typeof p.practiceMarks === "number")
      .map((p) => p.practiceMarks);
    const quiz = quizScores.length ? average(quizScores) : 0;
    const practice = practiceScores.length ? average(practiceScores) : 0;
    if (quizScores.length && practiceScores.length) return Math.round((quiz + practice) / 2);
    return Math.round(quiz || practice || 0);
  }

  function average(values) {
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }

  function firstAvailableDay(user) {
    let latest = 1;
    for (const item of courseDays) {
      if (isUnlocked(user, item.n)) latest = item.n;
    }
    return latest;
  }

  function parseRoute() {
    const raw = location.hash.replace(/^#/, "");
    const [route = "student", dayPart] = raw.split("/");
    return {
      route: route || "student",
      dayNumber: Number(dayPart) || null
    };
  }

  function goRoute(route) {
    location.hash = route;
  }

  function openDay(dayNumber) {
    state.activeTab = "learn";
    location.hash = `student/${dayNumber}`;
  }

  function render() {
    const { route } = parseRoute();
    setActiveNav(route);
    if (route === "admin") return renderAdmin();
    if (route === "leaderboard") return renderLeaderboard();
    return renderStudent();
  }

  function setActiveNav(route) {
    qsa("[data-route]").forEach((button) => {
      const isActive = button.dataset.route === route;
      button.classList.toggle("is-active", isActive);
      if (button.matches(".nav-actions button")) {
        button.setAttribute("aria-current", isActive ? "page" : "false");
      }
    });
  }

  function renderLogin() {
    qs("#app").innerHTML = `
      <section class="screen login-grid">

        <div class="form-panel">
          <p class="eyebrow">Batch access</p>
          <h2>Student login</h2>
          <p class="muted">Use a registered phone number. Progress is saved in this browser.</p>
          <form id="studentLoginForm" novalidate>
            <div class="field">
              <label for="studentName">Full name</label>
              <input id="studentName" name="studentName" autocomplete="name" required placeholder="Enter student name">
            </div>
            <div class="field">
              <label for="studentPhone">Phone number</label>
              <input id="studentPhone" name="studentPhone" inputmode="numeric" maxlength="10" required placeholder="Example: 9999999999">
            
            </div>
            <button class="primary-btn" type="submit">Start learning</button>
            <p id="loginError" class="form-error" aria-live="polite"></p>
          </form>
        </div>
      </section>
    `;
  }

  function renderStudent() {
    const user = currentUser();
    if (!user) return renderLogin();

    const { dayNumber } = parseRoute();
    const selectedNumber = dayNumber || firstAvailableDay(user);
    const selectedDay = courseDays.find((item) => item.n === selectedNumber) || courseDays[0];
    const unlocked = isUnlocked(user, selectedDay.n);
    const completed = completedCount(user);
    const next = firstAvailableDay(user);
    const avg = quizAverage(user);

    qs("#app").innerHTML = `
      <section class="screen dashboard-grid">
        <aside class="sidebar">
          <div class="student-card">
            <div class="student-top">
              <div>
                <p class="eyebrow">Current student</p>
                <h3>${escapeHtml(user.name)}</h3>
                <p class="muted">${escapeHtml(user.phone)}</p>
              </div>
              <div class="avatar" aria-hidden="true">${escapeHtml(initials(user.name))}</div>
            </div>
            <div class="stats-row">
              <div class="stat"><strong>${completed}</strong><span>Done</span></div>
              <div class="stat"><strong>${next}</strong><span>Open day</span></div>
              <div class="stat"><strong>${avg}%</strong><span>Quiz avg</span></div>
            </div>
            <div class="action-row">
              <button type="button" class="small-btn" data-action="logout">Logout</button>
              <button type="button" class="small-btn" data-route="leaderboard">Leaderboard</button>
            </div>
          </div>

          <div class="day-browser">
            <div class="day-browser__top">
              <label class="field">
                <span>Find a day or topic</span>
                <input class="search-input" data-action="filter-days" value="${escapeHtml(state.dayFilter)}" placeholder="Search HTML, flexbox, API...">
              </label>
            </div>
            <div class="day-list" aria-label="Course days">
              ${renderDayList(user, selectedDay.n)}
            </div>
          </div>
        </aside>

        <section class="content-panel">
          ${unlocked ? renderDayView(user, selectedDay) : renderLockedView(selectedDay)}
        </section>
      </section>
    `;
  }

  function renderDayList(user, selectedNumber) {
    const filter = normalize(state.dayFilter);
    const filtered = courseDays.filter((item) => {
      if (!filter) return true;
      return normalize(`${item.n} ${item.title} ${item.track} ${item.topics.join(" ")}`).includes(filter);
    });
    if (!filtered.length) return `<div class="no-results">No day matches this search.</div>`;
    return filtered.map((item) => renderDayButton(user, item, selectedNumber)).join("");
  }

  function renderDayButton(user, item, selectedNumber) {
    const unlocked = isUnlocked(user, item.n);
    const progress = progressFor(user, item.n);
    const complete = isDayComplete(progress);
    const active = selectedNumber === item.n;
    const status = complete ? "Done" : unlocked ? "Open" : "Locked";
    const statusClass = complete ? "done" : unlocked ? "open" : "locked";
    return `
      <button type="button" class="day-button ${active ? "is-active" : ""} ${unlocked ? "" : "is-locked"}" data-action="open-day" data-day="${item.n}" ${unlocked ? "" : "aria-disabled=\"true\""}>
        <span class="day-button__meta">
          <strong>Day ${item.n}</strong>
          <span class="status-pill ${statusClass}">${status}</span>
        </span>
        <span class="day-title">${escapeHtml(item.title)}</span>
        <span class="badge ${trackMeta[item.track].className}">${trackMeta[item.track].label}</span>
      </button>
    `;
  }

  function renderDayView(user, item) {
    const progress = progressFor(user, item.n);
    const meta = trackMeta[item.track];
    const tabs = [
      ["learn", "Learn", progress.contentDone],
      ["mcq", "MCQ", progress.mcqPassed],
      ["practice", "Practice", progress.practiceSubmitted],
      ["interview", "Interview", progress.interviewDone],
      ["revision", "Revision", false]
    ];
    const validTabs = tabs.map(([key]) => key);
    if (!validTabs.includes(state.activeTab)) state.activeTab = "learn";

    return `
      <div class="day-hero">
        <div class="day-hero__row">
          <div>
            <p class="eyebrow">Day ${item.n} learning material</p>
            <h2>${escapeHtml(item.title)}</h2>
            <p class="muted">${escapeHtml(meta.focus)}. Task: ${escapeHtml(item.task)}.</p>
          </div>
          <span class="track-pill ${meta.className}">${meta.label}</span>
        </div>
        <div class="progress-strip">
          ${renderStep("Lesson", progress.contentDone, "Read and mark done")}
          ${renderStep("MCQ", progress.mcqPassed, progress.mcqScore === undefined ? "Pass 7/15" : `${progress.mcqScore}/15`)}
          ${renderStep("Practice", progress.practiceSubmitted, progress.practiceSubmitted ? "Submitted" : "Upload proof")}
          ${renderStep("Interview", progress.interviewDone, "Speak answers")}
        </div>
      </div>
      <div class="tabs" role="tablist" aria-label="Day sections">
        ${tabs.map(([key, label, done]) => `
          <button type="button" class="tab-btn ${state.activeTab === key ? "is-active" : ""}" data-action="set-tab" data-tab="${key}" role="tab" aria-selected="${state.activeTab === key}">
            ${label}${done ? " done" : ""}
          </button>
        `).join("")}
      </div>
      <div class="tab-body">
        ${renderTab(user, item, state.activeTab)}
      </div>
    `;
  }

  function renderStep(label, done, helper) {
    return `
      <div class="step ${done ? "is-done" : ""}">
        <strong>${escapeHtml(label)}</strong>
        <span>${escapeHtml(helper)}</span>
      </div>
    `;
  }

  function renderTab(user, item, tab) {
    if (tab === "mcq") return renderMcq(user, item);
    if (tab === "practice") return renderPractice(user, item);
    if (tab === "interview") return renderInterview(user, item);
    if (tab === "revision") return renderRevision(item);
    return renderLearn(item);
  }

  function renderLearn(item) {
    const meta = trackMeta[item.track];
    const notes = item.topics.map((topic) => topicNote(topic, item.track));
    const code = sampleCode(item);
    return `
      <div class="lesson-grid">
        <div class="lesson-card">
          <p class="eyebrow">How to study this day</p>
          <h3>${escapeHtml(item.title)}</h3>
          <p class="muted">${escapeHtml(meta.mentorNote)}</p>
          <div class="divider"></div>
          <h4>Learning outcome</h4>
          <p>By the end of this class, students should be able to explain the topic in simple words, write a small working example, identify one common mistake, and connect the concept to a real webpage or project.</p>
          <h4>Class explanation flow</h4>
          <ul>
            <li>Start with the purpose: what problem this topic solves.</li>
            <li>Write a small example and read every line out loud.</li>
            <li>Change one value and observe the result in the browser.</li>
            <li>Connect the concept to ${escapeHtml(item.task)}.</li>
          </ul>
          <div class="action-row">
            <button type="button" class="primary-btn" data-action="mark-content" data-day="${item.n}">I completed the lesson</button>
            <button type="button" class="ghost-btn" data-action="set-tab" data-tab="mcq">Go to MCQ</button>
          </div>
        </div>

        <div class="lesson-card">
          <p class="eyebrow">Mentor checklist</p>
          <h3>Do not skip these basics</h3>
          <ul>
            ${foundationExtras[item.track].map((line) => `<li>${escapeHtml(line)}</li>`).join("")}
          </ul>
        </div>
      </div>

      <div class="panel mt-14">
        <div class="section-head">
          <div>
            <p class="eyebrow">Expanded topic notes</p>
            <h3>What students should understand</h3>
          </div>
          <span class="badge ${meta.className}">${meta.label}</span>
        </div>
        <div class="topic-grid">
          ${notes.map((note) => `
            <article class="topic-note">
              <strong>${escapeHtml(note.topic)}</strong>
              <p>${escapeHtml(note.text)}</p>
            </article>
          `).join("")}
        </div>
      </div>

      <div class="code-card mt-14">
        <div class="code-card__head">
          <strong>Starter example for Day ${item.n}</strong>
          <button type="button" class="copy-btn" data-action="copy-code">Copy</button>
        </div>
        <pre><code>${escapeHtml(code)}</code></pre>
      </div>
    `;
  }

  function topicNote(topic, track) {
    const key = normalize(topic);
    const fallback = `${topic} should be learned with meaning, syntax, one real use case, one mistake to avoid, and one short example. The goal is not memorization; the student should be able to explain why it is needed in a real ${trackMeta[track].label} workflow.`;
    return { topic, text: topicNotes[key] || fallback };
  }

  function renderMcq(user, item) {
    const progress = progressFor(user, item.n);
    const questions = getQuestions(item);
    const savedAnswers = progress.quizAnswers || {};
    return `
      <div class="quiz-summary">
        <div class="score-box">
          <span>Last score</span>
          <strong>${progress.mcqScore === undefined ? "--" : progress.mcqScore}</strong>
          <span>out of ${questions.length}</span>
        </div>
        <div class="panel">
          <p class="eyebrow">MCQ test</p>
          <h3>Pass mark: ${PASS_MARK}/${questions.length}</h3>
          <p class="muted">First questions are basic, middle questions check working knowledge, and final questions are interview-style. If the score is low, revise the lesson notes before trying again.</p>
          ${progress.mcqScore !== undefined ? `<p class="status-pill ${progress.mcqPassed ? "done" : "pending"}">${progress.mcqPassed ? "Passed" : "Revise and retry"}</p>` : ""}
        </div>
      </div>

      <form id="quizForm" data-day="${item.n}" novalidate>
        ${questions.map((question, index) => renderQuestion(question, index, savedAnswers[index])).join("")}
        <p id="quizFeedback" class="form-error quiz-feedback" role="alert" aria-live="polite"></p>
        <div class="action-row">
          <button class="primary-btn" type="submit">Submit MCQ test</button>
          <button class="ghost-btn" type="button" data-action="set-tab" data-tab="learn">Back to lesson</button>
        </div>
      </form>
      ${renderSavedQuizReview(progress)}
    `;
  }

  function renderQuestion(question, index, savedAnswer) {
    return `
      <article class="question-card" data-question="${index}">
        <div class="question-card__top">
          <h4>Q${index + 1}. ${escapeHtml(question.text)}</h4>
          <span class="difficulty ${question.level}">${escapeHtml(question.level)}</span>
        </div>
        <div class="options">
          ${question.options.map((option, optionIndex) => `
            <label class="option">
              <input type="radio" name="q${index}" value="${optionIndex}" ${Number(savedAnswer) === optionIndex ? "checked" : ""}>
              <span>${escapeHtml(option)}</span>
            </label>
          `).join("")}
        </div>
      </article>
    `;
  }

  function renderSavedQuizReview(progress) {
    const review = progress.quizReview;
    if (!review?.answers?.length) return "";
    return `
      <div class="panel mt-14">
        <p class="eyebrow">Saved MCQ answers</p>
        <h3>Last submitted answer sheet</h3>
        <p class="muted">These answers are saved in this browser and will remain after refresh.</p>
        <div class="qa-grid mt-14">
          ${review.answers.map((answer, index) => `
            <details class="qa-card" ${index < 2 ? "open" : ""}>
              <summary>Q${index + 1}. ${escapeHtml(answer.question)}</summary>
              <p><strong>Your answer:</strong> ${escapeHtml(answer.selectedAnswer)}</p>
              <p><strong>Correct answer:</strong> ${escapeHtml(answer.correctAnswer)}</p>
              <p><strong>Status:</strong> ${answer.isCorrect ? "Correct" : "Needs revision"}</p>
              <p>${escapeHtml(answer.explanation)}</p>
            </details>
          `).join("")}
        </div>
      </div>
    `;
  }

  function renderPractice(user, item) {
    const progress = progressFor(user, item.n);
    const tasks = practiceTasks(item);
    return `
      <div class="panel">
        <div class="section-head">
          <div>
            <p class="eyebrow">Practice session</p>
            <h3>Build proof, not only notes</h3>
            <p class="muted">Students should complete the tasks, take screenshots, and submit them for mentor review. Keep screenshots small so browser storage can save them.</p>
          </div>
          <span class="status-pill ${progress.practiceSubmitted ? "done" : "pending"}">${progress.practiceSubmitted ? "Submitted" : "Pending"}</span>
        </div>
      </div>

      <div class="practice-grid mt-14">
        ${tasks.map((task, index) => `
          <article class="panel practice-task">
            <p class="eyebrow">Problem statement ${index + 1}</p>
            <h3>${escapeHtml(task.title)}</h3>
            <p class="muted">${escapeHtml(task.body)}</p>
          </article>
        `).join("")}
      </div>

      <form id="practiceForm" class="panel mt-14" data-day="${item.n}">
        <div class="upload-box">
          <div class="field">
            <label for="practiceFiles">Upload screenshots</label>
            <input id="practiceFiles" type="file" accept="image/*" multiple>
            <p class="hint">Maximum ${MAX_SCREENSHOTS} images. Keep each image below 1.2 MB because this version stores files in the browser.</p>
          </div>
        </div>
        <div class="action-row">
          <button class="primary-btn" type="submit">Submit practice</button>
          <button class="ghost-btn" type="button" data-action="set-tab" data-tab="interview">Go to interview prep</button>
        </div>
        ${progress.practiceSubmitted ? `<p class="hint">Submitted. Admin marks: ${progress.practiceMarks ?? "Pending review"}.</p>` : ""}
      </form>
    `;
  }

  function renderInterview(user, item) {
    const progress = progressFor(user, item.n);
    const list = interviewQs(item);
    return `
      <div class="panel">
        <div class="section-head">
          <div>
            <p class="eyebrow">Interview preparation</p>
            <h3>Speak the answer, then write it</h3>
            <p class="muted">The goal is natural explanation. Students should say the purpose, one example, one mistake, and where they used it.</p>
          </div>
          <span class="status-pill ${progress.interviewDone ? "done" : "pending"}">${progress.interviewDone ? "Completed" : "Pending"}</span>
        </div>
      </div>

      <div class="qa-grid mt-14">
        ${list.map((itemQa, index) => `
          <details class="qa-card" ${index < 2 ? "open" : ""}>
            <summary>Q${index + 1}. ${escapeHtml(itemQa[0])}</summary>
            <p>${escapeHtml(itemQa[1])}</p>
          </details>
        `).join("")}
      </div>

      <div class="action-row">
        <button type="button" class="primary-btn" data-action="mark-interview" data-day="${item.n}">I completed interview prep</button>
        <button type="button" class="ghost-btn" data-action="set-tab" data-tab="revision">Open revision checklist</button>
      </div>
    `;
  }

  function renderRevision(item) {
    const extras = foundationExtras[item.track];
    const challenge = revisionChallenge(item);
    return `
      <div class="two-col">
        <div class="panel">
          <p class="eyebrow">Revision checklist</p>
          <h3>Before moving to the next day</h3>
          <ul>
            <li>Explain the day title without reading notes.</li>
            <li>Write one working example from memory.</li>
            <li>Open DevTools and inspect the result.</li>
            <li>Write one mistake you made and how you fixed it.</li>
            ${extras.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}
          </ul>
        </div>
        <div class="panel">
          <p class="eyebrow">Extra challenge</p>
          <h3>${escapeHtml(challenge.title)}</h3>
          <p class="muted">${escapeHtml(challenge.body)}</p>
          <div class="divider"></div>
          <h4>Interview speaking format</h4>
          <p class="muted">"The concept is used for..., a simple example is..., one common mistake is..., and I used it in my task by..."</p>
        </div>
      </div>
    `;
  }

  function renderLockedView(item) {
    return `
      <div class="locked-view">
        <div class="locked-card panel">
          <div class="lock-mark">LOCK</div>
          <p class="eyebrow">Sequential learning</p>
          <h2>Day ${item.n} is locked</h2>
          <p class="muted">Complete the previous day lesson, pass the MCQ with at least ${PASS_MARK}/15, submit practice screenshots, and complete interview preparation to unlock this day.</p>
          <div class="action-row center-actions">
            <button type="button" class="primary-btn" data-action="open-day" data-day="${item.n - 1}">Open previous day</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderLeaderboard() {
    const data = storage();
    const users = Object.values(data.users || {});
    const rows = users
      .map((user) => ({ ...user, completed: completedCount(user), score: finalScore(user), quizAvg: quizAverage(user) }))
      .sort((a, b) => b.score - a.score || b.completed - a.completed || a.name.localeCompare(b.name));

    qs("#app").innerHTML = `
      <section class="screen leaderboard-card">
        <div class="section-head">
          <div>
            <p class="eyebrow">Student ranking</p>
            <h2>Leaderboard</h2>
            <p class="muted">Final score uses quiz performance and admin-reviewed practice marks. It is meant for progress visibility, not pressure.</p>
          </div>
          <button type="button" class="route-btn" data-route="student">Back to learning</button>
        </div>
        <div class="leaderboard-stats">
          <div class="plain-stat"><strong>${users.length}</strong><span>Students</span></div>
          <div class="plain-stat"><strong>${courseDays.length}</strong><span>Days</span></div>
          <div class="plain-stat"><strong>${rows[0]?.score ?? 0}</strong><span>Top score</span></div>
          <div class="plain-stat"><strong>${rows.reduce((sum, user) => sum + user.completed, 0)}</strong><span>Total completions</span></div>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Rank</th><th>Student</th><th>Completed</th><th>Quiz avg</th><th>Final score</th></tr>
            </thead>
            <tbody>
              ${rows.length ? rows.map((user, index) => `
                <tr>
                  <td><strong>${index + 1}</strong></td>
                  <td><strong>${escapeHtml(user.name)}</strong><br><span class="muted">${escapeHtml(user.phone)}</span></td>
                  <td>${user.completed}/${courseDays.length}</td>
                  <td>${user.quizAvg}%</td>
                  <td><strong>${user.score}/100</strong></td>
                </tr>
              `).join("") : `<tr><td colspan="5"><div class="empty-state">No students have logged in yet.</div></td></tr>`}
            </tbody>
          </table>
        </div>
      </section>
    `;
  }

  function renderAdmin() {
    const data = storage();
    if (!data.admin) return renderAdminLogin();
    const users = Object.values(data.users || {});
    const totalSubmissions = users.reduce((sum, user) => {
      return sum + Object.values(user.progress || {}).filter((progress) => progress.practiceSubmitted).length;
    }, 0);
    const pendingReviews = users.reduce((sum, user) => {
      return sum + Object.values(user.progress || {}).filter((progress) => progress.practiceSubmitted && typeof progress.practiceMarks !== "number").length;
    }, 0);

    qs("#app").innerHTML = `
      <section class="screen admin-card">
        <div class="section-head">
          <div>
            <p class="eyebrow">Mentor dashboard</p>
            <h2>Admin review panel</h2>
            <p class="muted">Review submissions, add marks, and check student progress. This is an offline prototype, so data stays in this browser.</p>
          </div>
          <button type="button" class="danger-btn" data-action="logout">Logout</button>
        </div>
        <div class="admin-stats">
          <div class="plain-stat"><strong>${users.length}</strong><span>Students</span></div>
          <div class="plain-stat"><strong>${courseDays.length}</strong><span>Days</span></div>
          <div class="plain-stat"><strong>${totalSubmissions}</strong><span>Submissions</span></div>
          <div class="plain-stat"><strong>${pendingReviews}</strong><span>Pending reviews</span></div>
        </div>
        ${users.length ? users.map(renderAdminStudent).join("") : `<div class="empty-state">No student data yet.</div>`}
      </section>
    `;
  }

  function renderAdminLogin() {
    qs("#app").innerHTML = `
      <section class="screen admin-login form-panel admin-login-shell">
        <p class="eyebrow">Mentor access</p>
        <h2>Admin login</h2>
        <p class="muted">Use mentor credentials to review practice work.</p>
        <form id="adminLoginForm" novalidate>
          <div class="field">
            <label for="adminEmail">Email</label>
            <input id="adminEmail" type="email" autocomplete="username" required placeholder="admin@nagender.app">
          </div>
          <div class="field">
            <label for="adminPassword">Password</label>
            <input id="adminPassword" type="password" autocomplete="current-password" required placeholder="Password">
          </div>
          <button class="primary-btn" type="submit">Login</button>
          <p id="adminError" class="form-error" aria-live="polite"></p>
        </form>
      </section>
    `;
  }

  function renderAdminStudent(user) {
    const rows = courseDays.map((item) => {
      const progress = progressFor(user, item.n);
      const files = (progress.practiceFiles || []).map((file) => `
        <a href="${escapeHtml(file.data)}" target="_blank" rel="noreferrer">
          <img src="${escapeHtml(file.data)}" alt="${escapeHtml(file.name)}">
        </a>
      `).join("");
      return `
        <tr>
          <td><strong>Day ${item.n}</strong></td>
          <td>${escapeHtml(item.title)}</td>
          <td>${progress.mcqScore === undefined ? "-" : `${progress.mcqScore}/15`}</td>
          <td>${progress.practiceSubmitted ? "Submitted" : "-"}</td>
          <td><div class="thumbs">${files || "-"}</div></td>
          <td>
            <div class="mark-row">
              <input class="mark-input" id="mark-${escapeHtml(user.phone)}-${item.n}" type="number" min="0" max="100" value="${progress.practiceMarks ?? ""}" placeholder="0-100">
              <button type="button" class="small-btn" data-action="save-mark" data-phone="${escapeHtml(user.phone)}" data-day="${item.n}">Save</button>
            </div>
          </td>
          <td><span class="status-pill ${isDayComplete(progress) ? "done" : "pending"}">${isDayComplete(progress) ? "Complete" : "Pending"}</span></td>
        </tr>
      `;
    }).join("");

    return `
      <details class="student-review">
        <summary>
          <div class="review-summary">
            <div>
              <strong>${escapeHtml(user.name)}</strong>
              <p class="muted joined-line">${escapeHtml(user.phone)} joined ${new Date(user.joinedAt).toLocaleDateString()}</p>
            </div>
            <div>
              <span class="status-pill open">${completedCount(user)}/${courseDays.length} days</span>
              <span class="status-pill done">${finalScore(user)}/100</span>
            </div>
          </div>
        </summary>
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Day</th><th>Topic</th><th>MCQ</th><th>Practice</th><th>Screenshots</th><th>Marks</th><th>Status</th></tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </details>
    `;
  }

  function getQuestions(item) {
    return mcqBank[item.track] || mcqBank.project;
  }

  function practiceTasks(item) {
    const firstTopics = item.topics.slice(0, 4).join(", ");
    if (item.track === "html") {
      return [
        {
          title: `Build ${item.task}`,
          body: `Create an HTML page using ${firstTopics}. Keep correct indentation, use semantic tags where possible, add useful headings, and make sure every link or image has a purpose.`
        },
        {
          title: "Explain the page structure",
          body: "Under the page or in a separate note, write five lines explaining why you used each important tag. Mention one accessibility improvement you added."
        }
      ];
    }
    if (item.track === "css") {
      return [
        {
          title: `Style ${item.task}`,
          body: `Use the current CSS concepts: ${firstTopics}. Keep spacing consistent, choose readable colors, add hover or focus states, and test the layout on mobile width.`
        },
        {
          title: "Responsive review",
          body: "Take screenshots at mobile and desktop sizes. Write what changed between both screens and which CSS rule controlled that change."
        }
      ];
    }
    if (item.track === "js") {
      return [
        {
          title: `Create logic for ${item.task}`,
          body: `Use JavaScript concepts from this day: ${firstTopics}. Break the solution into small functions and show at least one console or UI output.`
        },
        {
          title: "Edge case check",
          body: "Test empty input, wrong input, and one successful input. Write what the expected result is for each case and fix the code if any case fails."
        }
      ];
    }
    return [
      {
        title: `Complete ${item.task}`,
        body: `Build the project with clear HTML, separate CSS, and separate JavaScript. Include validation, success state, error state, and responsive layout.`
      },
      {
        title: "Project presentation notes",
        body: "Prepare a short explanation covering problem, features, tech stack, user flow, important logic, challenges, and future improvements."
      }
    ];
  }

  function interviewQs(item) {
    const topicPrompts = item.topics.slice(0, 3).map((topic) => {
      const note = topicNote(topic, item.track);
      return [
        `Explain ${topic} in a beginner-friendly way.`,
        `${note.text} In an interview, keep it practical: explain the purpose, give one small example, and mention one mistake to avoid.`
      ];
    });
    return [...topicPrompts, ...interviewBank[item.track], ...interviewBank.common].slice(0, 10);
  }

  function revisionChallenge(item) {
    if (item.track === "html") {
      return {
        title: "Rebuild without looking",
        body: `Close the notes and rebuild the structure for ${item.task}. Then inspect the page and check heading order, alt text, labels, and semantic tags.`
      };
    }
    if (item.track === "css") {
      return {
        title: "Polish pass",
        body: `Improve ${item.task} with one spacing fix, one typography fix, one responsive fix, and one interaction state. Keep the design simple and readable.`
      };
    }
    if (item.track === "js") {
      return {
        title: "Explain the execution",
        body: `Pick one function from ${item.task}. Write what input it receives, what steps it performs, what it returns, and what can go wrong.`
      };
    }
    return {
      title: "Demo rehearsal",
      body: `Open ${item.task}, run the full user flow, then explain the project in one minute as if you are speaking to an interviewer.`
    };
  }

  function sampleCode(item) {
    if (item.track === "html") {
      return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Day ${item.n} Practice</title>
</head>
<body>
  <header>
    <h1>${item.task}</h1>
    <nav>
      <a href="#about">About</a>
      <a href="#work">Work</a>
    </nav>
  </header>

  <main>
    <section id="about">
      <h2>What I learned</h2>
      <p>Explain ${item.title} in your own words.</p>
    </section>

    <section id="work">
      <h2>Practice output</h2>
      <p>Build the page with meaningful HTML tags.</p>
    </section>
  </main>

  <footer>
    <p>Created by Student Name</p>
  </footer>
</body>
</html>`;
    }

    if (item.track === "css") {
      return `* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f4f5f2;
  color: #16201d;
}

.container {
  width: min(100% - 32px, 1100px);
  margin: 0 auto;
  padding: 24px 0;
}

.card {
  border: 1px solid #d8ddd4;
  border-radius: 8px;
  background: #fff;
  padding: 20px;
}

@media (max-width: 700px) {
  .container {
    width: min(100% - 20px, 1100px);
  }
}`;
    }

    if (item.track === "js") {
      return `const student = {
  name: "Student",
  score: 8,
  completed: false
};

function getResult(user) {
  if (user.score >= 7) {
    return user.name + " passed the practice check.";
  }
  return user.name + " needs one more revision round.";
}

console.log(getResult(student));

// Change the score, dry-run the condition, and explain the output.`;
    }

    return `const project = {
  name: "${item.task}",
  features: ["Responsive UI", "Validation", "Success state", "Error state"],
  readyForDemo: false
};

function validateEmail(email) {
  return email.includes("@") && email.includes(".");
}

function markReady(projectInfo) {
  return {
    ...projectInfo,
    readyForDemo: true
  };
}

console.log(validateEmail("student@example.com"));
console.log(markReady(project));`;
  }

  function initials(name) {
    return String(name || "S")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || "")
      .join("") || "S";
  }

  function notify(message) {
    const toast = qs("#toast");
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(state.toastTimer);
    state.toastTimer = setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 2600);
  }

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function setProgress(dayNumber, updater) {
    const data = storage();
    const phone = data.currentPhone;
    if (!phone || !data.users[phone]) return false;
    const user = data.users[phone];
    user.progress = user.progress || {};
    const progress = user.progress[dayNumber] || {};
    updater(progress);
    user.progress[dayNumber] = progress;
    return saveStorage(data);
  }

  function handleStudentLogin(event) {
    event.preventDefault();
    const name = qs("#studentName").value.trim();
    const phone = qs("#studentPhone").value.replace(/\D/g, "");
    const error = qs("#loginError");
    error.textContent = "";

    if (!name) {
      error.textContent = "Enter the student name.";
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      error.textContent = "Enter a valid 10 digit phone number.";
      return;
    }
    if (!allowedStudents.includes(phone)) {
      error.textContent = "This phone number is not registered for this batch.";
      return;
    }
    ensureUser(name, phone);
    notify("Login successful. Continue from your open day.");
    goRoute(`student/${firstAvailableDay(currentUser())}`);
  }

  function handleAdminLogin(event) {
    event.preventDefault();
    const email = qs("#adminEmail").value.trim();
    const password = qs("#adminPassword").value.trim();
    const error = qs("#adminError");
    const ok = adminAccounts.some((account) => account.email === email && account.password === password);
    if (!ok) {
      error.textContent = "Invalid admin email or password.";
      return;
    }
    const data = storage();
    data.admin = true;
    saveStorage(data);
    notify("Admin login successful.");
    renderAdmin();
  }

  async function handleQuiz(event) {
    event.preventDefault();
    const form = event.target.closest("#quizForm");
    if (!form) return;
    if (form.dataset.submitting === "true") return;

    const dayNumber = Number(form.dataset.day);
    const item = courseDays.find((dayItem) => dayItem.n === dayNumber);
    const questions = getQuestions(item);
    const formData = new FormData(form);
    const feedback = qs("#quizFeedback");
    const submitButton = form.querySelector("button[type='submit']");
    const missing = [];

    qsa(".question-card", form).forEach((card) => card.classList.remove("has-error"));
    feedback.textContent = "";

    questions.forEach((question, index) => {
      if (formData.get(`q${index}`) === null) missing.push(index + 1);
    });

    if (missing.length) {
      feedback.textContent = `Please answer all questions before submitting. Missing: ${missing.map((n) => `Q${n}`).join(", ")}.`;
      const firstMissing = qs(`.question-card[data-question="${missing[0] - 1}"]`, form);
      firstMissing?.classList.add("has-error");
      firstMissing?.scrollIntoView({ behavior: "smooth", block: "center" });
      notify(`Answer ${missing.length} missed question${missing.length === 1 ? "" : "s"} before submitting.`);
      return;
    }

    form.dataset.submitting = "true";
    submitButton.disabled = true;
    submitButton.classList.add("is-loading");
    submitButton.textContent = "Checking answers...";
    feedback.textContent = "Checking your answers. Please wait...";

    await delay(450);

    let score = 0;
    const missed = [];

    questions.forEach((question, index) => {
      const selected = Number(formData.get(`q${index}`));
      if (selected === question.answer) {
        score += 1;
      } else {
        missed.push(index + 1);
      }
    });

    setProgress(dayNumber, (progress) => {
      progress.mcqScore = score;
      progress.mcqPassed = score >= PASS_MARK;
      progress.quizAnswers = readQuizAnswers(form, questions.length);
      progress.quizReview = {
        missed,
        completedAt: new Date().toISOString(),
        answers: questions.map((question, index) => {
          const selected = Number(formData.get(`q${index}`));
          return {
            question: question.text,
            selectedIndex: selected,
            selectedAnswer: question.options[selected],
            correctIndex: question.answer,
            correctAnswer: question.options[question.answer],
            isCorrect: selected === question.answer,
            explanation: question.why
          };
        })
      };
    });

    state.activeTab = score >= PASS_MARK ? "practice" : "mcq";
    notify(score >= PASS_MARK ? `Passed: ${score}/15. Practice is ready.` : `Score: ${score}/15. Revise and retry.`);
    render();
  }

  function readQuizAnswers(form, totalQuestions) {
    const formData = new FormData(form);
    const answers = {};
    for (let index = 0; index < totalQuestions; index += 1) {
      const selected = formData.get(`q${index}`);
      if (selected !== null) answers[index] = Number(selected);
    }
    return answers;
  }

  function saveQuizDraft(form) {
    const dayNumber = Number(form.dataset.day);
    const item = courseDays.find((dayItem) => dayItem.n === dayNumber);
    if (!item) return;
    const answers = readQuizAnswers(form, getQuestions(item).length);
    setProgress(dayNumber, (progress) => {
      progress.quizAnswers = answers;
      progress.quizDraftSavedAt = new Date().toISOString();
    });
  }

  async function handlePractice(event) {
    event.preventDefault();
    const form = event.target.closest("#practiceForm");
    if (!form) return;
    const dayNumber = Number(form.dataset.day);
    const input = qs("#practiceFiles");
    const files = Array.from(input.files || []);

    if (!files.length) {
      notify("Upload at least one screenshot.");
      return;
    }
    if (files.length > MAX_SCREENSHOTS) {
      notify(`Upload maximum ${MAX_SCREENSHOTS} screenshots.`);
      return;
    }
    const largeFile = files.find((file) => file.size > MAX_FILE_SIZE);
    if (largeFile) {
      notify(`${largeFile.name} is too large. Keep each file below 1.2 MB.`);
      return;
    }

    try {
      const uploads = await Promise.all(files.map(fileToDataURL));
      const saved = setProgress(dayNumber, (progress) => {
        progress.practiceSubmitted = true;
        progress.practiceReviewed = false;
        progress.practiceMarks = typeof progress.practiceMarks === "number" ? progress.practiceMarks : null;
        progress.practiceFiles = uploads;
        progress.practiceSubmittedAt = new Date().toISOString();
      });
      if (!saved) return;
      state.activeTab = "interview";
      notify("Practice submitted for mentor review.");
      render();
    } catch {
      notify("Could not read the selected screenshots.");
    }
  }

  function fileToDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve({ name: file.name, data: reader.result });
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function logout() {
    const data = storage();
    data.currentPhone = null;
    data.admin = false;
    saveStorage(data);
    state.activeTab = "learn";
    notify("Logged out.");
    goRoute("student");
  }

  function savePracticeMark(phone, dayNumber) {
    const input = qs(`#mark-${phone}-${dayNumber}`);
    const mark = Number(input?.value);
    if (!input || Number.isNaN(mark) || mark < 0 || mark > 100) {
      notify("Enter marks between 0 and 100.");
      return;
    }
    const data = storage();
    if (!data.users[phone]) return;
    const progress = data.users[phone].progress?.[dayNumber] || {};
    progress.practiceMarks = mark;
    progress.practiceReviewed = true;
    progress.reviewedAt = new Date().toISOString();
    data.users[phone].progress = data.users[phone].progress || {};
    data.users[phone].progress[dayNumber] = progress;
    saveStorage(data);
    notify(`Saved ${mark}/100 for Day ${dayNumber}.`);
    renderAdmin();
  }

  function copyCurrentCode() {
    const code = qs(".code-card code")?.textContent || "";
    if (!code) return;
    if (!navigator.clipboard) {
      notify("Copy is not available in this browser context.");
      return;
    }
    navigator.clipboard.writeText(code)
      .then(() => notify("Code copied."))
      .catch(() => notify("Copy failed in this browser context."));
  }

  document.addEventListener("click", (event) => {
    const routeButton = event.target.closest("[data-route]");
    if (routeButton) {
      goRoute(routeButton.dataset.route);
      return;
    }

    const actionTarget = event.target.closest("[data-action]");
    if (!actionTarget) return;

    const action = actionTarget.dataset.action;
    if (action === "logout") return logout();
    if (action === "open-day") {
      const user = currentUser();
      const dayNumber = Number(actionTarget.dataset.day);
      if (!user || !isUnlocked(user, dayNumber)) {
        notify("Complete the previous day to unlock this day.");
        return;
      }
      return openDay(dayNumber);
    }
    if (action === "set-tab") {
      state.activeTab = actionTarget.dataset.tab || "learn";
      return render();
    }
    if (action === "mark-content") {
      const dayNumber = Number(actionTarget.dataset.day);
      setProgress(dayNumber, (progress) => {
        progress.contentDone = true;
        progress.contentCompletedAt = new Date().toISOString();
      });
      state.activeTab = "mcq";
      notify("Lesson marked complete.");
      return render();
    }
    if (action === "mark-interview") {
      const dayNumber = Number(actionTarget.dataset.day);
      setProgress(dayNumber, (progress) => {
        progress.interviewDone = true;
        progress.interviewCompletedAt = new Date().toISOString();
      });
      notify("Interview preparation marked complete.");
      return render();
    }
    if (action === "save-mark") {
      return savePracticeMark(actionTarget.dataset.phone, Number(actionTarget.dataset.day));
    }
    if (action === "copy-code") {
      return copyCurrentCode();
    }
  });

  document.addEventListener("input", (event) => {
    if (event.target.matches("[data-action='filter-days']")) {
      state.dayFilter = event.target.value;
      const user = currentUser();
      const { dayNumber } = parseRoute();
      const selected = dayNumber || (user ? firstAvailableDay(user) : 1);
      const list = qs(".day-list");
      if (user && list) list.innerHTML = renderDayList(user, selected);
    }
  });

  document.addEventListener("change", (event) => {
    if (event.target.matches("#quizForm input[type='radio']")) {
      const form = event.target.closest("#quizForm");
      if (form) saveQuizDraft(form);
    }
  });

  document.addEventListener("submit", (event) => {
    if (event.target.matches("#studentLoginForm")) return handleStudentLogin(event);
    if (event.target.matches("#adminLoginForm")) return handleAdminLogin(event);
    if (event.target.matches("#quizForm")) return handleQuiz(event);
    if (event.target.matches("#practiceForm")) return handlePractice(event);
  });

  window.addEventListener("hashchange", render);

  if (!location.hash) location.hash = "student";
  render();
})();
