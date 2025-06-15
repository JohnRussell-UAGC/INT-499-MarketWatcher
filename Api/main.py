from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/Auth/callback")
async def google_auth_callback(request: Request):
    data = await request.json()
    credential = data.get("credential")
    if not credential:
        return {"error": "No credential provided"}, 400

    # Here you would validate the credential with Google
    # For now, we'll just return a success response
    return {
        "success": True,
        "message": "Authentication successful"
    }

# Optional: Add a test endpoint
@app.get("/")
async def root():
    return {"message": "API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=7123, reload=True)

# Test This Comments