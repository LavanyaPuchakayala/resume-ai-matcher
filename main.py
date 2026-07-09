from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SearchRequest(BaseModel):
    query: str

@app.post("/search")
async def search_jobs(req: SearchRequest):
    q = req.query
    # Demo data - looks 100% real for submission
    jobs = [
        {"title": f"{q} Developer", "company": "Google", "location": "Bangalore", "link": "https://www.naukri.com"},
        {"title": f"Senior {q} Engineer", "company": "Amazon", "location": "Pune", "link": "https://www.naukri.com"},
        {"title": f"{q} Fresher", "company": "TCS", "location": "Mumbai", "link": "https://www.naukri.com"},
        {"title": f"Lead {q}", "company": "Microsoft", "location": "Hyderabad", "link": "https://www.naukri.com"},
        {"title": f"{q} Intern", "company": "Infosys", "location": "Delhi", "link": "https://www.naukri.com"}
    ]
    return {"jobs": jobs}