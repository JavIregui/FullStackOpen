```mermaid
    sequenceDiagram
        participant browser
        participant server

        Note right of browser: The user inputs data and clicks "Save"

        browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
        activate server
        Note left of server: Saves payload (Request body data -> "note": <your note>)
        server-->>browser: Redirects to https://studies.cs.helsinki.fi/exampleapp/notes
        deactivate server

        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
        activate server
        server-->>browser: HTML document
        deactivate server
    
        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
        activate server
        server-->>browser: the css file
        deactivate server
    
        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
        activate server
        server-->>browser: the JavaScript file
        deactivate server
    
        Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server
    
        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
        activate server
        Note left of server: The JSON now contains our new note
        server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
        deactivate server
    
        Note right of browser: The browser executes the callback function that renders the notes
```
