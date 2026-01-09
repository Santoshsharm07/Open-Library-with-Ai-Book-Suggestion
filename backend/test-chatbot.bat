@echo off
echo Testing chatbot endpoint...
echo.

REM Test different queries
set queries=
"Suggest horror fantasy books" 
"Find books by Stephen King" 
"Recommend some fiction books" 
"What should I read next?"

for %%q in (%queries%) do (
    echo === Testing query: %%q ===
    curl -X POST -H "Content-Type: application/json" -d "{\"query\": %%q}" http://localhost:5000/api/book-suggestions
    echo.
    echo.
)